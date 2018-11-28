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

class Account extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="8">
                        <Card>
                            <CardHeader>
                                <strong>Password</strong>
                                <small> Change password</small>
                            </CardHeader>
                            <CardBody>

                                <FormGroup row >
                                    <Col md ="3">
                                        <Label htmlFor="name">Current Password</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="name" placeholder="Current Password" required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md ="3">
                                        <Label htmlFor="name">New Password</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="name" placeholder="New Password" required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md ="3">
                                        <Label htmlFor="name">Confirm Password</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="name" placeholder="Confirm Password" required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md ="3">
                                        {/*<Label htmlFor="select">Rating</Label>*/}
                                    </Col>
                                    <Col xs="12" md = "9">

                                        <Button type="submit" color="primary">Save changes</Button>
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

export default Account;
