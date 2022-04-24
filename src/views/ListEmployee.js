import React, { Component, useState }from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, FormGroup,Modal, CardHeader, Col, Row, Input, Table, Form, Button, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const Employers = (props) => {
  const [info, setInfo] = useState(false);
  return(
  <tr>
    <td>{props.emp.f_name}</td>
    <td>{props.emp.l_name}</td>
    <td>{props.emp.position}</td>
    <td>{props.emp.email}</td>
    <td>{props.departement}</td>
    <td>{props.emp.role}</td>
    <td> <Link to={"editemployee/"+props.id}> <FontAwesomeIcon icon={faEdit} /> </Link> </td>
    <td> <a  style={{cursor:'pointer', color:'#6E9DBA'}} onClick={()=> setInfo(!info)} >
      
      <Modal isOpen={info} toggle={()=> setInfo(!info)}
      className='modal-info'>
        <ModalHeader toggle={()=> setInfo(!info)}></ModalHeader>
        <ModalBody style={{color:'black'}}>
          Are you sure you want to delete this?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { props.deleteEmployee(props.emp._id) }} href="/admin/listemployee" > Delete </Button>
          <Button color="secondary" onClick={() => setInfo(!info)} > Cancel </Button>
        </ModalFooter>
      </Modal>
      <FontAwesomeIcon icon={faTrashAlt} /> 
    </a> </td>

  </tr>
  )
  }

export default class Listemployee extends Component {
  notifyDelete = place => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Employee deleted Successfully
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
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.state = {
      employees: [],
      departements:[],
      searchText: '',
      originalList: [],
      addModalShow: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/ManageEmployee/')
      .then(response => {
        this.setState({ employees: response.data, originalList: response.data })
        console.log("====>",response.data)
      })
      .catch((error) => {
        console.log(error);
        
      })
      
  }

  deleteEmployee(id) {
    axios.delete('http://localhost:3000/ManageEmployee/' + id)
      .then(response => { 
        console.log(response.data)
        this.notifyDelete("tc")
      });

    this.setState({
      employees: this.state.employees.filter(el => el._id !== id)
    })
  }
  
  employeeList() {
    
    return this.state.employees.map(currentemp => {
      return <Employers emp={currentemp} departement={currentemp.departement.departement_name} id={currentemp._id} deleteEmployee={this.deleteEmployee} key={currentemp._id} />;
      
    })
  }
  inputChange = (e) => {
    this.setState({ searchText: e.target.value });
  };
  search = () => {
    if (this.state.searchText.length > 0) {
      let list = this.state.originalList.filter((l) => {
        return l.username
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase());
      });
      this.setState({ employees: list });
    } else {
      this.setState({ employees: this.state.originalList });
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
                    name="search_employee"
                    placeholder="Seach for employee..."
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
                <CardHeader>Employees List</CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Departement</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    { this.employeeList() }
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

