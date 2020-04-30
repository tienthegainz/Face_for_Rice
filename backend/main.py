import sys
sys.path.append('./backend')  # nopep8
from face_detector import FaceDetector, pil_loader
from face_searcher import FaceSearcher
from utils import *
import numpy as np
import config as cfg
import flask
from flask import Flask, jsonify, request
import io
from PIL import Image
from torchvision.transforms import ToTensor, ToPILImage
import random
import string
import base64

# initialize our Flask application
app = Flask(__name__)
fd = None
fs = None
today_dir = None
index = 0
img_path_map = list()


def init():
    # Init all variable
    global fs, fd, today_dir, index, img_path_map

    fs = FaceSearcher(**cfg.search_config)
    fd = FaceDetector(**cfg.detect_config)
    # Make folder
    today_dir = init_folder(cfg.data_path, cfg.wards)
    # If data exist ==> add them to graph
    w_paths = [os.path.join(today_dir, w, 'true') for w in cfg.wards]
    features = []
    for w_path in w_paths:
        for image_name in os.listdir(w_path):
            image_path = os.path.join(w_path, image_name)
            # Add path to path map
            img_path_map.append(image_path)
            # convert image to pytorch tensor
            image = pil_loader(image_path)
            image = ToTensor()(image)

            # extract all
            tensor = fd.extract_feature(image)
            # print(tensor.shape)

            features.append(tensor)
            index += 1
    # Add to graph
    print('Getting {} images'.format(index))
    if index > 0:
        features = np.array(features)
        # print(features.shape)
        fs.add_faces(features, np.arange(index))


def random_string(stringLength=5):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


@app.route("/face", methods=["POST"])
def analyze_face():
    global index, img_path_map
    data = {"success": False}
    if request.form and request.files:
        ward = request.form.get('ward')
        image_data = request.files['image'].read()
        # REformat image
        image = Image.open(io.BytesIO(image_data)).convert('RGB')

        # Set image path
        false_path = os.path.join(
            today_dir, ward, 'false', random_string())+'.jpg'

        face = fd.extract_face(image, false_path)
        s_idx = fs.query_faces(face)

        print('\nQuery result: {}\n')

        if s_idx is None:
            data['permission'] = True
            data['success'] = True
            face = np.expand_dims(face, axis=0)
            fs.add_faces(face, np.array([index]))
            # TODO: Save them
            true_path = os.path.join(
                today_dir, ward, 'true', str(index))+'.jpg'
            os.rename(false_path, true_path)
            index += 1
            img_path_map.append(true_path)
            print('Saved ', true_path)

        else:
            data['permission'] = False
            data['success'] = True
            print('Saved ', false_path)

    return jsonify(data)


@app.route("/wards", methods=["GET"])
def get_wards():
    return jsonify({'wards': cfg.wards})


@app.route("/district", methods=["GET"])
def get_district():
    return jsonify({'district': cfg.district})


if __name__ == "__main__":
    init()
    app.run(debug=True, port=3500)
