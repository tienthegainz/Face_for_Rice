import React from "react";
import {
  Form,
  Select,
  Button,
} from 'antd';
import { UploadOutlined, InboxOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "./ImageUpload.css";

const axios = require('axios');

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    this.state = {
      image: {
        url: null,
        file: null,
      },
      wards: [],
    };
  }

  componentDidMount() {
    axios.get("/wards")
      .then((response) => response.data)
      .then((json_data) => this.setState({ wards: json_data.wards }));
  }

  renderWardOpt() {
    const { Option } = Select;
    let data = this.state.wards;
    let wards = data.map((item, idx) => (
      <Option value={item}>
        {item}
      </Option>
    ));
    return wards;
  }

  onFinish = values => {
    let image = this.state.image.file;
    let ward = values.ward;
    const config = {
      headers: { "content-type": "multipart/form-data" }
    }
    var formData = new FormData();
    formData.append("ward", ward);
    formData.append("image", image);
    axios
      .post("/face", formData, config)
      .then(res => {
        this.props.returnResult(res);
      })
      .catch(err => console.warn(err));
  };

  handleImage = (event) => {
    this.setState({
      image: {
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      }
    });
    // console.log("URL: ", URL.createObjectURL(event.target.files[0]));
  }


  render() {
    const wards = this.renderWardOpt();
    return (
      <Form
        name="validate_other"
        {...this.formItemLayout}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="ward"
          label="Phường"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xin hãy chọn phường của công dân",
            },
          ]}
        >
          <Select placeholder="Chọn phường">
            {/* TODO: make gen function */}
            {wards}
          </Select>
        </Form.Item>
        <Form.Item
          name="image"
          label="Ảnh"
        >
          <input type="file" onChange={this.handleImage} /> <br />
          <img className="Image" src={this.state.image.url} height="400" width="400" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        > <br />
          <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ImageUpload;
