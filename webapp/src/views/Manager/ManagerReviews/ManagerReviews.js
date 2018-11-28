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
import Autosuggest from 'react-autosuggest';


class ManagerReviews extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: "",
            user: [],
            fullname: "",
            userReceivedID: "",
            value: '',
            suggestions: [],
            newReview: {
                userReviewID :"",
                userReceivedID :"",
                rating :"",
                note :""
            },

            collapse: true
        };
        this.getListWorker = this.getListWorker.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.addReview= this.addReview.bind(this);
        this.handleSelectChange=this.handleSelectChange.bind(this);
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
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
        axios.get('http://localhost:9001/getListWorker/' + this.state.userID)
            .then(response => {
                this.setState({
                    user: response.data
                }, () => console.log(this.state.user));
            })
            .catch(error => console.log(error));
    }

    addReview() {

        console.log(JSON.stringify(this.state.newReview))
        console.log('user id',this.state.userID)
        axios({
            method: 'POST',
            url: 'http://localhost:9001/reviewWorkerM/' + this.state.userID,
            data: JSON.stringify(this.state.newReview),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then((response) => {
                alert('Add review successfully.');
                console.log('YEAHHHHH');
            })
            .catch((error) => {
                console.log(error);

            });


    }
    handleUserChange(event) {
        const {newReview} = this.state;
        newReview[event.target.name] = event.target.value;
        this.setState({newReview});
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

        let temp= this.state.newReview
        temp.userReceivedID = suggestion.userID
        this.setState({
            newReview : temp
        })


        console.log('get value', suggestion.userID)
        console.log('get userReceivedID', this.state.newReview)

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
        const {value, suggestions, newReview} = this.state;
        const inputProps = {
            placeholder: "Type a name worker",
            value,
            onChange: this.onChange
        };
        console.log('new reveiw',newReview)
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="8">
                        <Card>
                            <CardHeader>
                                <strong>Reviews </strong>
                                <small> Review worker</small>
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
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="rating">Rating</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <select onClick={this.handleSelectChange}>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Bad">Bad</option>
                                        </select>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="note">Comment</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="note" id="note" rows="9"
                                               placeholder="Your comment..." value={newReview.note}
                                               onChange = {this.handleUserChange}/>
                                    </Col>
                                </FormGroup>


                                <FormGroup row>
                                    <Col md="3">
                                        {/*<Label htmlFor="select">Rating</Label>*/}
                                    </Col>
                                    <Col xs="12" md="9">

                                        <Button type="submit" color="primary" onClick={this.addReview}>Save changes</Button>
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

export default ManagerReviews;
