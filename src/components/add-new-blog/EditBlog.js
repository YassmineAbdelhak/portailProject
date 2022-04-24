import React from 'react';
import {Form} from 'reactstrap';
import Editor from "./Editor.js";
import { Container, Row, Col } from "shards-react";

class EditBlog extends React.Component {

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row>
      {/* Editor */}
      <Col lg="12" md="10">
        <Editor />
      </Col>

    </Row>
  </Container>
      </Form>
    );
  }
}

export default EditBlog;
