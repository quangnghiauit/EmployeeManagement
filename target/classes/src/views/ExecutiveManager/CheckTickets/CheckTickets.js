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

class CheckTickets extends Component {
    constructor(props) {
        super(props);


        this.state = {
            userID: "",
            user: {},
            collapse: true
        };

        this.getWorkerInactive = this.getWorkerInactive.bind(this);
        this.deleteWorker = this.deleteWorker.bind(this);
        this.approveWorker = this.approveWorker.bind(this);

    }


    approveWorker(workerID) {
        axios({
            method: 'PUT',
            url: 'http://localhost:9001/updatestatusworker/' + workerID,

            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then((response) => {

                alert('Update status worker successfully.');
                console.log('YEAHHHHH');


            })
            .catch((error) => {
                console.log(error);

            });


    }

    deleteWorker(id) {
        axios.delete('http://localhost:9001/deletemanager/' + id)
            .then((response) => {
                alert('Delete worker successfully.');
                console.log("deleted");


            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        axios.get('http://localhost:9001/api/getID')
            .then(response => {
                this.setState({
                    userID: response.data.userID
                }, () => this.getWorkerInactive());

            })
            .catch(error => console.log(error));

    }

    getWorkerInactive() {
        axios.get('http://localhost:9001/getWorkerInactive')
            .then(response => {

                this.setState({
                    user: response.data
                }, () => console.log('workerinactive:', this.state.user));
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
                <td>{list[element].title}</td>,
                <td>{list[element].department}</td>,
                <td>{list[element].statusUser}</td>,
                <td>{list[element].statusAction}</td>,
            )

        })


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Executive Check Tickets</strong>


                            </CardHeader>
                            <CardBody>
                                <Table responsive>


                                    <thead>
                                    <tr>
                                        <th>Full name</th>
                                        <th>Email</th>
                                        <th>Title</th>
                                        <th>Department</th>
                                        <th>Status User</th>
                                        <th>Status Action</th>

                                        <th>Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(list).map(element => {
                                        return (
                                            <tr>
                                                <td>{list[element].fullname}</td>
                                                <td>{list[element].email}</td>
                                                <td>{list[element].title}</td>
                                                <td>{list[element].department}</td>
                                                <td>
                                                    {list[element].statusUser == 1
                                                        ?
                                                        <Badge color="success">Active</Badge>
                                                        :
                                                        <Badge color="danger">Inactive</Badge>
                                                    }
                                                </td>
                                                <td>
                                                    {list[element].statusAction == 0
                                                        ?
                                                        <Badge color="secondary">Add</Badge>
                                                        :
                                                        <Badge color="warning">Delete</Badge>
                                                    }
                                                </td>

                                                <td>


                                                    <Button color="secondary" size="sm"
                                                            onClick={() => this.deleteWorker(list[element].userID)}>Delete</Button>
                                                    <Button color="danger" size="sm"
                                                            onClick={() => this.approveWorker(list[element].userID)}>Approve</Button>
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

export default CheckTickets;
