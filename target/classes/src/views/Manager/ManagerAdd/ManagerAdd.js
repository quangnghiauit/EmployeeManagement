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
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from 'reactstrap';
import axios from 'axios';

class ManagerAdd extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: "",
            newUser: {},
            collapse: true
        };
        this.handleUserChange= this.handleUserChange.bind(this);
        this.addWorker= this.addWorker.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleUserChange(event) {
        const {newUser} = this.state;
        newUser[event.target.name] = event.target.value;
        this.setState({newUser});
    }
    componentDidMount() {
        axios.get('http://localhost:9001/api/getID')
            .then(response => {
                this.setState({
                    userID: response.data.userID
                });

            })
            .catch(error => console.log(error));

    }

    addWorker() {

        console.log(this.state.userID)
        console.log(this.state.newUser)
        axios({
            method: 'POST',
            url: 'http://localhost:9001/addworker/' + this.state.userID,
            data: JSON.stringify(this.state.newUser),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then((response) => {
                alert('Sent ticket successfully.');
                console.log('YEAHHHHH');
            })
            .catch((error) => {
                console.log(error);

            });


    }
    render() {
        const {newUser} = this.state;
        if (!newUser) return null;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Manager Dashboard</strong>
                                <small> Add worker</small>

                            </CardHeader>
                            <CardBody>
                                <Card>
                                    <CardHeader>
                                        <strong>Personal Detail</strong>

                                    </CardHeader>
                                    <CardBody>


                                        <Row>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="fullname">Name</Label>
                                                    <Input type="text"
                                                           name="fullname"
                                                           id="fullname"
                                                           placeholder="Full Name"
                                                           onChange={this.handleUserChange}
                                                           value={newUser.fullname}
                                                           required/>
                                                </FormGroup>
                                            </Col>

                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="userName">User Name</Label>
                                                    <Input type="text"
                                                           name="userName"
                                                           id="userName"
                                                           placeholder="User Name"
                                                           onChange={this.handleUserChange}
                                                           value={newUser.userName}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input type="text"
                                                           name="password"
                                                           id="password"
                                                           placeholder="Password"
                                                           onChange={this.handleUserChange}
                                                           value={newUser.password}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <strong>Contact Information</strong>

                                    </CardHeader>
                                    <CardBody>


                                        <Row>

                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input type="email"
                                                           name="email"
                                                           id="email"
                                                           placeholder="Email"
                                                           onChange={this.handleUserChange}
                                                           value={newUser.email}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="department">Department</Label>
                                                    <Input type="text"
                                                           name="department"
                                                           id="department"
                                                           placeholder="ZaloPay"
                                                           onChange={this.handleUserChange}
                                                           value={newUser.department}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="title">Title</Label>
                                                    <Input type="text"
                                                           name="title"
                                                           id="title"
                                                           placeholder="Software Developer"
                                                           onChange={this.handleUserChange}
                                                           value={newUser.title}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                    </CardBody>
                                </Card>



                                <FormGroup row>
                                    <Col md="3">

                                    </Col>
                                    <Col xs="12" md="9">

                                        <Button type="submit" color="primary" onClick={this.addWorker} >Save changes</Button>
                                        <Button color="secondary">Cancel</Button>

                                    </Col>
                                </FormGroup>


                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default ManagerAdd;
