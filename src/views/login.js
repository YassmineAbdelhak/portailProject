import React from 'react';
import axios from 'axios';
import {
    FormGroup,
    Input,
    Row,
    Col,
    Form
  } from "reactstrap";
import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import NotificationAlert from 'react-notification-alert';
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

class Login extends React.Component {
  notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{this.state.error}</div>
        </div>
      ),
      type: 'warning',
      icon: 'tim-icons icon-bell-55',
      autoDismiss: 7,
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          password: '',
          errorMessage: '',
          isPasswordShown : false,
          admin:null
        }
      }
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }
      onChangePassword(e) {
        this.setState({
          password:  e.target.value
        })
      }
      
  togglePasswordVisibility = () =>{
    const {isPasswordShown} = this.state;
    this.setState({ isPasswordShown: !isPasswordShown});
  }

  onSubmit(e) {
    e.preventDefault();
    const user={
      username: this.state.username,
      password: this.state.password
    }
    axios.post('http://localhost:3000/ManageEmployee/loginemployee',user)
      .then(res => {
        //console.log(res.data);
        localStorage.setItem("token",res.data.token)
        let token = localStorage.getItem("token")
        if(token){
          let decoded = jwt.decode(token,{complete: true})
          console.log(decoded.payload.employee.position)
          if (decoded){
            if(decoded.payload.employee.position === "HR"){
              this.setState({admin: true});
            } else if(decoded.payload.employee.position === "Employee"){
              this.setState({admin: false});
            }

          }
        }
        {this.state.admin===true?(window.location = '/admin/listemployee'):(window.location = '/admin/listconge')}   
      })
        .catch((error) => {
          this.notify('tc');
          console.log(error);
        });
        
  }
    
     /* onSubmit(e) {
        e.preventDefault();

        const user={
          username: this.state.username,
          password: this.state.password
        }

        axios.post('http://localhost:3000/ManageEmployee/loginemployee',user)
          .then(res => {
            console.log(res.data);
            localStorage.setItem("token",res.data.token)
            let token = localStorage.getItem("token")
            if(token){
              let decoded = jwt.decode(token)
              console.log(decoded)
              if(decoded){
                console.log(decoded.data.position)
                if(decoded.data.position === "HR" || decoded.data.position === "CEO" || decoded.data.position === "Supervisor"){
                  this.setState({admin: true});
                } else if(decoded.data.position === "Employee"){
                  this.setState({admin: false});
                }

              }
            }
            {this.state.admin===true?(window.location = '/admin/listemployee'):(window.location = '/admin/listConge')}   
          })
            .catch((error) => {
              //this.setState({errorMessage: error.response.data.message});
              this.notify('tc');
              console.log(error);
            });
            
      }*/
    render () {
      const {isPasswordShown} = this.state;
        return(
          
            <Aux>
                
                <div className="auth-wrapper">
                <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <Form onSubmit={this.onSubmit}>
                        <div className="card">
                            <div className="card-body text-center">
                                <h3 className="mb-4">Login</h3>
                                <Row>
                                    <Col md="12"> 
                                        <FormGroup>
                                            <Input type="text" className="form-control" placeholder="Username" required value={this.state.username}
                                            onChange={this.onChangeUsername}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12"> 
                                        <FormGroup>
                                            <Input  type={(isPasswordShown) ? "text":"password"} className="form-control" placeholder="password" required value={this.state.password}
                                             onChange={this.onChangePassword}/>
                                             <i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"}`} style={{position: 'absolute', top: '13px',right:'10px', cursor:'pointer'}} onClick={this.togglePasswordVisibility}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <button className="btn btn-primary shadow-2 mb-4" type="submit">Login</button>
                            </div>
                        </div>
                        </Form>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Login;