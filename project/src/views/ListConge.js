import React, { Component, useState }from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, FormGroup,Modal, CardHeader, Col, Row, Input, Table, Form, Button, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import jwt from "jsonwebtoken";

const Congers = (props) => {
  const [info, setInfo] = useState(false);
  return(
  <tr>
    <td>{props.emp.type}</td>
    <td>{props.emp.date_deb}</td>
    <td>{props.emp.date_fin}</td>
    <td>{props.emp.position}</td>
    <td> <Link to={"editconge/"+props.id}> <FontAwesomeIcon icon={faEdit} /> </Link> </td>
    <td> <a  style={{cursor:'pointer', color:'#6E9DBA'}} onClick={()=> setInfo(!info)} >
      
      <Modal isOpen={info} toggle={()=> setInfo(!info)}
      className='modal-info'>
        <ModalHeader toggle={()=> setInfo(!info)}></ModalHeader>
        <ModalBody style={{color:'black'}}>
          Are you sure you want to delete this?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { props.deleteConge(props.emp._id) }} href="/admin/listconge" > Delete </Button>
          <Button color="secondary" onClick={() => setInfo(!info)} > Cancel </Button>
        </ModalFooter>
      </Modal>
      <FontAwesomeIcon icon={faTrashAlt} /> 
    </a> </td>

  </tr>
  )
  }

export default class ListConge extends Component {
  notifyDelete = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Request For Leave deleted Successfully
          </div>
        </div>
      ),
      type: "warning",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  constructor(props) {
    super(props);
    this.deleteConge = this.deleteConge.bind(this)
    this.state = {
      conges:[],
      searchText: '',
      originalList: [],
      addModalShow: false
    }
  }

  componentDidMount() {
    let token = localStorage.getItem("token")
    let decoded = jwt.decode(token,{complete: true})
      console.log(decoded.payload.employee)
      this.setState({employee : decoded.payload.employee.id})
      console.log(this.state.employee)
      this.setState({emp_departement : decoded.payload.employee.departement._id})
      console.log(this.state.emp_departement)
    axios.get('http://localhost:3000/ManageConge/')
      .then(response => {
        this.setState({ conges: response.data, originalList: response.data })
        console.log("====>",response.data)
      })
      .catch((error) => {
        console.log(error);
        
      })
      
  }

  deleteConge(id) {
    axios.delete('http://localhost:3000/ManageConge/' + id)
      .then(response => { 
        console.log(response.data)
        this.notifyDelete("tc")
      });

    this.setState({
      conges: this.state.conges.filter(el => el._id !== id)
    })
  }
  
  CongeList() {
    
    return this.state.conges.map(currentemp => {
     if( (currentemp.employee._id == this.state.employee)){
      return <Congers emp={currentemp} id={currentemp._id} deleteConge={this.deleteConge} key={currentemp._id} />;
      
    }
  })
  }
  inputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  search = () => {
    if (this.state.searchText.length > 0) {
      let list = this.state.originalList.filter((l) => {
        return l.type
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
      this.setState({ conges: list });
    } else {
      this.setState({ conges: this.state.originalList });
    }
  };
  render() {
    return (
      <>
      <div className="content">
        <Row>
          <Col xl={30} lg={12} md={12} >
            <Form>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="search_conge"
                    placeholder="Seach for Request For Leave..."
                    size="lg"
                    onChange={this.inputChange}
                  />
                </Col>
                <Col>
                  <Button color="secondary" size="lg"
                  onClick={this.search}>
                    Search
                </Button>
                </Col>
              </FormGroup>
              <Card className="mb-3">
                <CardHeader>Request For Leave List</CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Position</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.CongeList() }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
        </div>
        </>
    )
  }

}

