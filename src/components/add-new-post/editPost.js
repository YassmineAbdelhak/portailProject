import React from 'react';
import {Form,Card, CardBody,CustomInput} from 'reactstrap';
import ReactQuill from "react-quill";
import { Container, Row, Col,FormInput } from "shards-react";

class editPost extends React.Component {

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row>
      {/* Editor */}
      <Col lg="12" md="10">
      <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-2" placeholder=" Your Post Title" />
        <FormInput size="lg" className="mb-2" placeholder=" Post URL" />
        <CustomInput type="file" id="picture" size="lg" className="mb-2" name="blogImg"/>
        <ReactQuill className="add-new-post__editor mb-3" />

        
      </Form>
    </CardBody>
  </Card>
      </Col>

    </Row>
  </Container>
      </Form>
    );
  }
}

export default editPost;
