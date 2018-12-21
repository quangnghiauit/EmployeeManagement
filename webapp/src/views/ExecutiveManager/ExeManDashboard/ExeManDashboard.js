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

import {Route} from "react-router-dom";
import axios from 'axios';

class ExeManDashboard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            userID: "",
            user: {},
            collapse: true
        };
        this.addManager = this.addManager.bind(this);
        this.getListManager = this.getListManager.bind(this);
        this.deleteManager = this.deleteManager.bind(this);
        this.updateManager= this.updateManager.bind(this);

    }

    addManager() {
        window.open("/#/executivemanager/addmanager");

    }
    updateManager(managerID) {
        window.open("/#/executivemanager/updatemanager/" + managerID);

    }

    deleteManager(id) {
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/deletemanager/' + id,
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then((response) => {
                alert('Delete manager successfully.');
                //console.log("deleted");


            })
            .catch(error => console.log(error));
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
                // console.log("idddddd",response)
                // console.log("hjfhgdhjdjfdfs",response.data.userID)
                // console.log(response)
                this.setState({
                    userID: response.data.userID
                }, () => this.getListManager());

            })
            .catch(error => console.log(error));

    }

    getListManager() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/getListManager/' + this.state.userID,
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })

            .then(response => {

                //console.log("hgdhdhdhjdhjdhj",response.data)
                this.setState({
                    user: response.data
                }, () => console.log(this.state.user));
            })
            .catch(error => console.log(error));
    }

    render() {
        //console.log("blaaaaaaaa")
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


            )

        })


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Executive Manager Dashboard</strong>


                            </CardHeader>
                            <CardBody>

                                <Label> Add new manager </Label>
                                <Button color="primary" size="sm"
                                        onClick={() => this.addManager()}>Add</Button>
                                <Table responsive>


                                    <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Gender</th>
                                        <th>Title</th>
                                        <th>Department</th>

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


                                                    <Button color="secondary" size="sm"
                                                            onClick={() => this.deleteManager(list[element].userID)}>Delete</Button>
                                                    <Button color="danger" size="sm"
                                                            onClick={() => this.updateManager(list[element].userID)}>Update</Button>
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

export default ExeManDashboard;
