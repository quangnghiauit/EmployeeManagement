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

class ListWorker extends Component {
    constructor(props) {
        super(props);


        this.state = {
            userID: "",
            user: {},
            collapse: true
        };
        this.getListWorker = this.getListWorker.bind(this);


    }



    componentDidMount() {
        axios.get('http://localhost:9001/api/getID')
            .then(response => {
                this.setState({
                    userID: response.data.userID
                }, () => this.getListWorker());

            })
            .catch(error => console.log(error));

    }

    getListWorker() {
        axios.get('http://localhost:9001/listworker/' + this.state.userID)
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
                                <strong>List Worker</strong>


                            </CardHeader>
                            <CardBody>

                                <Table responsive>


                                    <thead>
                                    <tr>
                                        <th>Full name</th>
                                        <th>Email</th>
                                        <th>Title</th>
                                        <th>Department</th>
                                        <th>Status</th>

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
                                                    {list[element].statusUser==1
                                                        ?
                                                        <Badge color="success">Active</Badge>
                                                        :
                                                        <Badge color="danger">Inactive</Badge>
                                                    }
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

export default ListWorker;
