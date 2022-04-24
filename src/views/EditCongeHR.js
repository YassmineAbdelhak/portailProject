import axios from 'axios';
import React from "react";
import { Link } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  CustomInput,
  Form,
  Input,
  Row,
  Col,
  Label
 
} from "reactstrap";
import NotificationAlert from 'react-notification-alert';

class EditCongeHR extends React.Component {
  notify = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Request for Leave Updated Successfully
          </div>
        </div>
      ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  notifyError = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {this.state.errorMessage}
          </div>
        </div>
      ),
      type: "danger",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  constructor(props) {
    super(props);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDate_deb = this.onChangeDate_deb.bind(this);
    this.onChangeDate_fin = this.onChangeDate_fin.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      type:'',
      date_deb: '',
      date_fin: '',
      reason: '',
      position: '',
    }
  }
  componentDidMount() {
      axios.get('http://localhost:3000/ManageConge/'+this.props.match.params.id)
      .then(response => {
          this.setState({
              type: response.data.type,
              date_deb: response.data.date_deb,
              date_fin: response.data.date_fin,
              reason: response.data.reason,
          })
          console.log("============",response);

      })
      .catch(function (error) {
          console.log(error);
      })
  }

  onChangeType(e) {
    this.setState({
    type: e.target.value
    });
  }
  onChangeDate_deb(e) {
    this.setState({
      date_deb: e.target.value
    });
  }
  onChangeDate_fin(e) {
    this.setState({
      date_fin: e.target.value
    });
  }
  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }
  onChangeReason(e) {
    this.setState({
      reason: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const conge = {
      type: this.state.type,
      date_deb: this.state.date_deb,
      date_fin: this.state.date_fin,
      position: this.state.position,
      reason: this.state.reason,
    }
    console.log(conge);

    axios.patch('http://localhost:3000/ManageConge/bossPart/'+ this.props.match.params.id, conge)
      .then(res => {
        console.log(res.data)
        this.notify("tc")
      }).catch((error)=> {
        this.setState({errorMessage: error.response.data.msg})
        this.notifyError('tc')
      })
      window.location = '/admin/listcongenottreated/';
  }

    render(){
        return(
          <> {/*form*/}
          <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
             <Row>
                <Col lg="12" md="10">
                  <Card>
                    <CardHeader>
                      <h5 className="title">Edit Request for Leave</h5>
                    </CardHeader>
                    <Form onSubmit={this.onSubmit}>
                    <CardBody>
                    <Row>
                          <Col md="8">
                            <label>Type:</label>
                            <FormGroup>
                              <Input
                                type="select"
                                id="type"
                                name="type"
                                required
                                disabled
                                value={this.state.type}
                              >
                                <option>Type</option>
                                <option>Wedding</option>
                                <option>Sickness</option>
                                <option>Annual</option>
                                <option>Specific</option>
                              </Input>
                            </FormGroup>
                          </Col>
                    </Row>
                    <Row>
                          <Col className="pr-md-1" md="4">
                            <label>Start Date: </label>
                            <FormGroup>
                              <Input
                                type="date"
                                name="date_deb"
                                id="date_deb"
                                required
                                disabled
                                value={this.state.date_deb}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pr-md-1" md="4">
                            <label>End Date: </label>
                            <FormGroup>
                                <Input
                                type="date"
                                name="date_fin"
                                id="date_fin"
                                required
                                disabled
                                value={this.state.date_fin}
                                 />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="8">
                            <label>Reason: </label>
                            <FormGroup>
                                <Input 
                                placeholder="Reason"
                                type="textarea" 
                                name="reason" 
                                id="reason"
                                required
                                disabled
                                value={this.state.reason}
                                 />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="8">
                            <label>Position:</label>
                            <FormGroup>
                              <Input
                                type="select"
                                id="type"
                                name="type"
                                required
                                value={this.state.position}
                                onChange={(event) => { this.onChangePosition(event); }}
                              >
                                <option>Position</option>
                                <option>Accept</option>
                                <option>Refuse</option>
                              </Input>
                            </FormGroup>
                          </Col>
                    </Row>
                    </CardBody>
                    <CardFooter>
                    <Button className="btn-fill" color="info" type="submit">
                        Save
                      </Button>
                      <Link to="addconge"><Button className="btn-fill" color="secondary" type="submit">
                          Discard
                        </Button></Link>
                      
                    </CardFooter>
                    </Form>
                  </Card>
                </Col>
                </Row>
                
                </div>
                </>
                )
              }
              }

export default EditCongeHR;