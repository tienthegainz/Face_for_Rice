import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined, UploadOutlined } from "@ant-design/icons";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      file: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  }

  handleUpload() {
    // const formData = new FormData();
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );
    console.log("Upload file to server");
  }

  changeWard(ward) {
    console.log("Change to: " + ward);
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
      <Menu.Item onClick={() => this.changeWard(item)}>{item}</Menu.Item>
    ));
    wards = <Menu>{wards}</Menu>;
    return wards;
  }

  render() {
    return (
      <div>
        <img src={this.state.url} /> <br />
        <input type="file" onChange={this.handleChange} /> <br />
        <Dropdown overlay={this.renderWard()}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Chọn phường <DownOutlined />
          </a>
        </Dropdown>{" "}
        <br />
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined />}
          size="large"
        >
          Tải lên
        </Button>
      </div>
    );
  }
}

export default Upload;
