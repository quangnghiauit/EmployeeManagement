import React, {Component} from 'react';
import axios from 'axios';
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
import moment from 'moment';


class Information extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: "",
            user: {},


            collapse: true
        };
        this.updateWorker = this.updateWorker.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);

    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }


    updateWorker() {

        axios({
            method: 'PUT',
            url: 'http://localhost:8080/updateworker/' + this.state.userID,
            data: JSON.stringify(this.state.user),
            withCredentials:true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then((response) => {

                alert('Update information successfully.');
                console.log('YEAHHHHH');



            })
            .catch((error) => {
                console.log(error);

            });


    }

    handleUserChange(event) {
        const {user} = this.state;
        user[event.target.name] = event.target.value;
        this.setState({user});
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/getID',
            withCredentials:true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then(response => {
                this.setState({
                    userID: response.data.userID
                }, () => this.getUserInfo());

            })
            .catch(error => console.log(error));

    }

    getUserInfo() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/worker/' + this.state.userID,
            withCredentials:true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then(response => {

                this.setState({
                    user: response.data

                });
            })
            .catch(error => console.log(error));
    }

    render() {
        const {user} = this.state;
        if (!user) return null;
        const formatDate = new moment(user.birthDate).format('YYYY-MM-DD');
        const formatStartHire = new moment(user.startHire).format('YYYY-MM-DD');

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong>Worker Information Dashboard</strong>

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
                                                           value={user.fullname}
                                                           required/>
                                                </FormGroup>
                                            </Col>

                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="birthDate">Birthday</Label>
                                                    <Input type="date"
                                                           name="birthDate"
                                                           id="birthDate"
                                                           placeholder="YYYY-DD-MM"

                                                           onChange={this.handleUserChange}
                                                           value={formatDate}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="gender">Gender</Label>
                                                    <Input type="text"
                                                           name="gender"
                                                           id="gender"
                                                           placeholder="Male"
                                                           onChange={this.handleUserChange}
                                                           value={user.gender}
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
                                                    <Label htmlFor="address">Address</Label>
                                                    <Input type="text"
                                                           name="address"
                                                           id="address"
                                                           placeholder="176 Trinh Dinh Trong,Tan Phu"
                                                           onChange={this.handleUserChange}
                                                           value={user.address}
                                                           required/>
                                                </FormGroup>
                                            </Col>

                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="phoneNumber">Phone</Label>
                                                    <Input type="text"
                                                           name="phoneNumber"
                                                           id="name"
                                                           placeholder="0976565715"
                                                           onChange={this.handleUserChange}
                                                           value={user.phoneNumber}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input type="email"
                                                           name="email"
                                                           id="email"
                                                           placeholder="quangnghiauit@gmail.com"
                                                           onChange={this.handleUserChange}
                                                           value={user.email}
                                                           required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <strong>Working History</strong>

                                    </CardHeader>
                                    <CardBody>


                                        <Row>
                                            <Col xs="4">
                                                <FormGroup>
                                                    <Label htmlFor="startHire">Start Date</Label>
                                                    <Input type="date"
                                                           name="startHire"
                                                           id="startHire"
                                                           placeholder="YYYY-DD-MM"
                                                           onChange={this.handleUserChange}
                                                           value={formatStartHire}
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
                                                           value={user.department}
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
                                                           value={user.title}
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

                                        <Button type="submit" color="primary" onClick={this.updateWorker} >Save changes</Button>
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

export default Information;
