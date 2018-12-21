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


class ExeManAdd extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: "",
            newUser: {},
            collapse: true
        };
        this.handleUserChange= this.handleUserChange.bind(this);
        this.addManager= this.addManager.bind(this);
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
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/getID',
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
        // axios.get('http://localhost:8080/api/getID')
            .then(response => {
                this.setState({
                    userID: response.data.userID
                });

            })
            .catch(error => console.log(error));

    }

    addManager() {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/addmanager/' + this.state.userID,
            data: JSON.stringify(this.state.newUser),
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then((response) => {
                //console.log('YEAHHHHH');
                alert('Add manager successfully.');
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
                                <strong>Executive Manager Dashboard</strong>
                                <small> Add manager</small>

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

                                        <Button type="submit" color="primary" onClick={this.addManager} >Save changes</Button>
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

export default ExeManAdd;
