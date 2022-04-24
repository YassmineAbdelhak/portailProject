import React, { Component } from 'react';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import { useParams } from 'react-router-dom';

export default class EditDepartement extends Component {
    
    notify = place => {
        var options = {};
        options = {
          place: place,
          message: (
            <div>
              <div>
                Department Updated Successfully
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
        this.onChangeDepartement_name = this.onChangeDepartement_name.bind(this);
        this.onChangeBoss = this.onChangeBoss.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            departement_name: '',
            boss: '',
            departements: [],
            employees: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/ManageDepartement/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    departement_name: response.data.departement_name
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:3000/ManageEmployee/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        employees: response.data
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    onChangeBoss = async (event) => {
        this.setState({
            boss: event.target.value
        });
    }


    onChangeDepartement_name(e) {
        this.setState({
            departement_name: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const department = {
            departement_name: this.state.departement_name,
            boss: this.state.boss
        }
        console.log(department);

        axios.patch('http://localhost:3000/ManageDepartement/' + this.props.match.params.id, department)
            .then(res => {
                console.log(res.data)
                this.notify("tc")
                window.location = '/addDepartement';
            }).catch((error)=> {
                this.setState({errorMessage: error.response.data.msg})
                this.notifyError('tc')
              })
        window.location = '/admin/listdepartement';

    }
    render() {
        return (  
          <> {/*form*/}
          <div className="content">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <Col xl={30} lg={12} md={12}>
                    <Card>
                        <CardHeader>Manage Departement</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup row>
                                    <Label for="departement_name" sm={2} bssize="lg">
                                        Departement-Name
                  </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            required
                                            value={this.state.departement_name}
                                            onChange={this.onChangeDepartement_name}
                                            placeholder="Write Departement's name"
                                            bssize="lg"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="boss" sm={2} size="lg">
                                        supervisor
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="select" name="boss" bssize="lg"
                                            id="boss"
                                            required
                                            value={this.state.boss}
                                            onChange={(event) => { this.onChangeBoss(event); }}>
                                            {
                                                this.state.employees.map((boss) => {
                                                    return (
                                                        <option
                                                            key={boss._id}
                                                            value={boss._id} >{boss.username}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{ bssize: 10, offset: 2 }}>
                                        <Button type="submit" bssize="lg">Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
            </>
        )
    }
}


