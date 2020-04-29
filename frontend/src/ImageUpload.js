import React from "react";
import { Menu, Select, Button, Upload, message } from "antd";
import {
  DownOutlined,
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const { Option } = Select;

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        loading: false,
      },
      ward: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          image: { imageUrl, loading: false },
        })
      );
    }
  };

  handleUpload() {
    // const formData = new FormData();
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );
    console.log("Upload file to server");
  }

  changeWard(cward) {
    console.log("Change to: " + cward);
    this.setState({ ward: cward });
  }

  renderWard() {
    let data = [
      "Bưởi",
      "Nhật Tân",
      "Phú Thượng",
      "Quảng An",
      "Thụy Khuê",
      "Tú Liên",
      "Xuân La",
      "Yên Phụ",
    ];
    let wards = data.map((item, idx) => (
      <Option value={idx} onClick={() => this.changeWard(item)}>
        {item}
      </Option>
    ));
    return wards;
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.image.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state.image;
    const wards = this.renderWard();
    return (
      <div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
        {/* <img src={this.state.url} /> <br />
        <input type="file" onChange={this.handleChange} /> <br /> */}
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn phường"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {wards}
        </Select>
        <br />
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined />}
          size="large"
          onClick={this.handleUpload}
        >
          Tải lên
        </Button>
      </div>
    );
  }
}

export default ImageUpload;
