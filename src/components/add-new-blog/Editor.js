import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form,CustomInput } from "reactstrap";
import {FormInput} from "shards-react";


import "react-quill/dist/quill.snow.css";
import "../../assets/css/quill.css";

const Editor = () => (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-2" placeholder=" Your Blog-Post Title" />
        <FormInput size="lg" className="mb-2" placeholder=" Date Of Blog-Post" />
        <CustomInput type="file" id="picture" size="lg" className="mb-2" name="blogImg"/>
        <ReactQuill className="add-new-post__editor mb-3" />
        
        
      </Form>
    </CardBody>
  </Card>
);

export default Editor;
