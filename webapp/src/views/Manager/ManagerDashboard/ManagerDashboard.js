import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Badge,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Table
} from 'reactstrap';


import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ManagerAdd from "../ManagerAdd";
import {Route} from "react-router-dom";
import axios from 'axios';

class ManagerDashboard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            userID: "",
            user: {},
            collapse: true
        };
        this.addworker = this.addworker.bind(this);
        this.getListWorker = this.getListWorker.bind(this);
        this.deleteWorker = this.deleteWorker.bind(this);


    }

    addworker() {
        window.open("/#/manager/addworker");

    }

    deleteWorker(workerID) {
        axios({
            method: 'PUT',
            url: 'http://localhost:8080/updatestatusworkeraction/' + workerID,
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then((response) => {

                alert('Sent ticket successfully.');



            })
            .catch((error) => {
                console.log(error);

            });


    }


    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/getID',
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then(response => {
                this.setState({
                    userID: response.data.userID
                }, () => this.getListWorker());

            })
            .catch(error => console.log(error));

    }

    getListWorker() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/getListWorker/' + this.state.userID,
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then(response => {

                this.setState({
                    user: response.data


                }, () => console.log(this.state.user));
            })
            .catch(error => console.log(error));
    }

    render() {
        const list = this.state.user;
        const options = [];
        Object.keys(list).map(element => {
            options.push(
                <td>{list[element].fullname}</td>,
                <td>{list[element].email}</td>,
                <td>{list[element].phoneNumber}</td>,
                <td>{list[element].gender}</td>,
                <td>{list[element].title}</td>,
                <td>{list[element].department}</td>,
                <td>{list[element].statusUser}</td>,
            )

        })


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Manager Dashboard</strong>


                            </CardHeader>
                            <CardBody>


                                <Label> Add new worker </Label>
                                <Button color="primary" size="sm" onClick={() => this.addworker()}>Add</Button>


                                <Table responsive>


                                    <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Gender</th>
                                        <th>Title</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(list).map(element => {
                                        return (
                                            <tr>
                                                <td>{list[element].fullname}</td>
                                                <td>{list[element].email}</td>
                                                <td>{list[element].phoneNumber}</td>
                                                <td>{list[element].gender}</td>
                                                <td>{list[element].title}</td>
                                                <td>{list[element].department}</td>
                                                <td>
                                                    {list[element].statusUser==1
                                                        ?
                                                        <Badge color="success">Active</Badge>
                                                        :
                                                        <Badge color="danger">Inactive</Badge>
                                                    }
                                                </td>
                                                <td>

                                                    <Button color="secondary" size="sm"
                                                            onClick={() => this.deleteWorker(list[element].userID)}>Delete</Button>
                                                </td>
                                            </tr>

                                        )
                                    })}

                                    </tbody>
                                </Table>


                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default ManagerDashboard;
