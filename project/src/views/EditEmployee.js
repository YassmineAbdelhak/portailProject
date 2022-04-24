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

class EditEmployee extends React.Component {
  notify = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Employee Updated Successfully
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
    this.onChangeF_name = this.onChangeF_name.bind(this);
    this.onChangeL_name = this.onChangeL_name.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDepartement = this.onChangeDepartement.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      position:'Employee',
      f_name: '',
      l_name: '',
      username: '',
      email: '',
      password: '',
      departement: '',
      role: '',
      boss: '',
      gender: '',
      departements: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/ManageDepartement/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            departements: response.data,
            departement: response.data[0]._id
          })
        }
      })
      axios.get('http://localhost:3000/ManageEmployee/'+this.props.match.params.id)
      .then(response => {
          this.setState({
              f_name: response.data.f_name,
              l_name: response.data.l_name,
              username: response.data.username,
              position: response.data.position,
              email: response.data.email,
              departement: response.data.departement,
              role: response.data.role,
              gender: response.data.gender,
          })
          console.log("============",response);

      })
      .catch(function (error) {
          console.log(error);
      })
  }
  
  onChangeF_name(e) {
    this.setState({
      f_name: e.target.value
    });
  }
  onChangeL_name(e) {
    this.setState({
      l_name: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }
  onChangeDepartement = async (event) => {
    this.setState({
      departement: event.target.value
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const employee = {
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      username: this.state.username,
      position: this.state.position,
      email: this.state.email,
      departement: this.state.departement,
      role: this.state.role,
      gender: this.state.gender,
    }
    console.log(this.props.match.params._id);

    axios.patch('http://localhost:3000/ManageEmployee/'+ this.props.match.params.id, employee)
      .then(res => {
        console.log(res.data)
        this.notify("tc")
      }).catch((error)=> {
        this.setState({errorMessage: error.response.data.msg})
        this.notifyError('tc')
      })

      window.location = '/admin/listemployee/';
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
                      <h5 className="title">Edit Employee</h5>
                    </CardHeader>
                    <Form onSubmit={this.onSubmit}>
                    <CardBody>
                    <Row>
                          <Col className="pr-md-1" md="4">
                            <FormGroup>
                              <Input
                                placeholder="First Name"
                                type="text"
                                required
                                value={this.state.f_name}
                                onChange={this.onChangeF_name}
                              />
                            </FormGroup>
                          </Col>
                          <Col className="pr-md-1" md="4">
                            <FormGroup>
                              <Input
                                placeholder="Last Name"
                                type="text"
                                required
                                value={this.state.l_name}
                                onChange={this.onChangeL_name}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Col className="pr-md-1" md="8">
                        <label>Gender</label>
                        <FormGroup check>
                        <Label check bssize="lg">
                          <Input type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.onChangeGender} /> Female
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check bssize="lg">
                          <Input type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.onChangeGender} /> Male
                        </Label>
                      </FormGroup>
                          </Col>
                    
                        <Row>
                          <Col md="8">
                            <FormGroup>
                                <Input 
                                placeholder="Username"
                                type="text" 
                                name="Username" 
                                id="Username"
                                required
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                 />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="8">
                            <FormGroup>
                                <Input 
                                placeholder="Email"
                                type="email" 
                                name="email" 
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                 />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Col className="pr-md-1" md="8">
                            <Label>Departement</Label>
                            <FormGroup>
                            <Input
                              type="select" name="departement" bssize="lg"
                              required
                              id="departement"
                              value={this.state.departement}
                              onChange={(event) => { this.onChangeDepartement(event); }}> 
                              {
                              this.state.departements.map((departement) => {
                              return <option
                              key={departement._id}
                              value={departement._id} >{departement.departement_name}</option>;})
                        }
                      </Input>
                                   
                            </FormGroup>
                          </Col>
                      
                          <Row>
                          <Col className="pr-md-1" md="8">
                            <FormGroup>
                              <Input
                                placeholder="Role"
                                type="text"
                                required
                                value={this.state.role}
                                onChange={this.onChangeRole}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                          <Col className="pr-md-1" md="8">
                            <FormGroup>
                              <Input 
                              type="select" 
                              id="position" 
                              name="position"
                              required
                              bssize="lg"
                              value={this.state.position}
                              onChange={(e) => {this.onChangePosition(e)}}
                           >
                               <option>Employee</option>
                               <option>HR</option>
                           </Input>
                                   
                            </FormGroup>
                          </Col>
                        
                    </CardBody>
                    <CardFooter>
                    <Button className="btn-fill" color="info" type="submit">
                        Save
                      </Button>
                      <Link to="listemployee"><Button className="btn-fill" color="secondary" type="submit">
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

export default EditEmployee;