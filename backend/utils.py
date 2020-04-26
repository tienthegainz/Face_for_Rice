import sys
sys.path.append('./backend')  # nopep8
import os
import csv
from datetime import date
import config as cfg


def init_folder(root, wards):
    today = date.today()
    # dd/mm/YY
    d1 = today.strftime("%d-%m-%Y")
    new_root = os.path.join(root, d1)
    os.makedirs(new_root, exist_ok=True)
    ward_path = [os.path.join(new_root, ward) for ward in wards]
    for wp in ward_path:
        os.makedirs(wp, exist_ok=True)
        os.makedirs(wp+'/false', exist_ok=True)
        os.makedirs(wp+'/true', exist_ok=True)
    return new_root


# def make_report(path, name):
    # field_names = list(object.keys())
    # file_exists = os.path.isfile(path)
    # # Open file in append mode
    # with open(path, 'w', newline='') as writer:
    #     # Create a writer object from csv module
    #     dict_writer = csv.DictWriter(writer, fieldnames=field_names)
    #     if not file_exists:
    #         dict_writer.writeheader()

    #     # Add dictionary as wor in the csv
    #     dict_writer.writerow(object)
