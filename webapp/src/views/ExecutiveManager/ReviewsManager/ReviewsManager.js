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
    InputGroupButton,
    Table
} from 'reactstrap';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';



class ReviewsManager extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: "",
            user: [],
            listWorkerReview:[],
            fullname: "",
            userReceivedID: "",
            value: '',
            suggestions: [],
            managerID:"",

            collapse: true
        };
        this.getListWorker = this.getListWorker.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);

        this.handleSelectChange=this.handleSelectChange.bind(this);
        this.getListManager= this.getListManager.bind(this);
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    componentDidMount() {
        axios.get('http://localhost:9001/api/getID')
            .then(response => {
                this.setState({
                    userID: response.data.userID
                }, () => this.getListManager());

            })
            .catch(error => console.log(error));
    }

    getListManager() {
        axios.get('http://localhost:9001/getListManager/' + this.state.userID)
            .then(response => {
                this.setState({
                    user: response.data
                }, () => console.log(this.state.user));
            })
            .catch(error => console.log(error));
    }
    getListWorker() {
        axios.get('http://localhost:9001/getListWorkerReview/' + this.state.managerID)
            .then(response => {
                this.setState({
                    listWorkerReview: response.data
                }, () => console.log(this.state.listWorkerReview));
            })
            .catch(error => console.log(error));
    }


    onChange(event, value) {
        console.log('value', value)
        this.setState({
            value: value.newValue
        });
    };

    onSuggestionsFetchRequested({value}) {
        let list = this.state.user;
        list = list.filter((task) => {


            let regex = new RegExp(value, 'gi');
            if (task.fullname.match(regex))
                return task;


        })
        this.setState({
            suggestions: list
        })
    };

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        })
    };

    getSuggestionValue(suggestion) {

        let temp= this.state.managerID;
        temp= suggestion.userID
        this.setState({
            managerID : temp
        },()=> this.getListWorker())


        console.log('get value', suggestion.userID)
        console.log('managerID',this.state.managerID)


        return suggestion.fullname;
    }


    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.fullname}
            </div>
        );
    }

    handleSelectChange(event){
        let temp={...this.state.newReview}
        temp.rating=event.target.value;
        this.setState({
            newReview: temp
        },()=>console.log('temp',temp))

    }


    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: "Type a name manager",
            value,
            onChange: this.onChange
        };

        const list = this.state.listWorkerReview;
        const options = [];
        Object.keys(list).map(element => {
            options.push(
                <td>{list[element].userReceivedID}</td>,
                <td>{list[element].rating}</td>,
                <td>{list[element].note}</td>,

            )

        })
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="8">
                        <Card>
                            <CardHeader>
                                <strong>Check Reviews </strong>

                            </CardHeader>
                            <CardBody>

                                <FormGroup row>

                                    <Col md="3">
                                        <Label htmlFor="select">Find worker</Label>
                                    </Col>

                                    <Col xs="8" md="9">

                                        <InputGroup>

                                            <Autosuggest
                                                suggestions={suggestions}
                                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                getSuggestionValue={this.getSuggestionValue}
                                                renderSuggestion={this.renderSuggestion}
                                                inputProps={inputProps}

                                            />
                                        </InputGroup>
                                    </Col>

                                </FormGroup>
                                <Table responsive>


                                    <thead>
                                    <tr>
                                        <th>Worker Name</th>
                                        <th>Rating</th>
                                        <th>Comment</th>

                                        <th>Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(list).map(element => {
                                        return (
                                            <tr>
                                                <td>{list[element].userReceivedID}</td>
                                                <td>{list[element].rating}</td>
                                                <td>{list[element].note}</td>

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

export default ReviewsManager;
