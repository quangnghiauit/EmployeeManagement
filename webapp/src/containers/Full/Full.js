import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import axios from 'axios';

//Worker
import Information from '../../views/Worker/Information/';
import Reviews from '../../views/Worker/Reviews/';
import Account from '../../views/Worker/Account/';
import ListWorker from '../../views/Worker/ListWorker';


//Manager

import ManagerAdd from '../../views/Manager/ManagerAdd/';
import ManagerDashboard from '../../views/Manager/ManagerDashboard/';
import ManagerReviews from '../../views/Manager/ManagerReviews/';


//Executive Manager
import ExeManDashboard from '../../views/ExecutiveManager/ExeManDashboard';
import ExeManAdd from '../../views/ExecutiveManager/ExeManAdd';
import ExeManUpdate from '../../views/ExecutiveManager/ExeManUpdate';
import ReviewManager from '../../views/ExecutiveManager/ReviewsManager';
import CheckTickets from '../../views/ExecutiveManager/CheckTickets';




class Full extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            auth:[],
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/role',
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }


        })
            .then(response => {

                //console.log("Fullllllljsss",response.data);
                this.setState({ roles: response.data });

                })
            .catch(error => console.log(error));
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/auth',
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }
        })
            .then(response => {

                //console.log("fullll auth",response.data)
                this.setState({
                        auth: response.data

                    })
            })
            .catch(error => console.log(error));



    }
    render() {
        //console.log("render role",this.state.roles)
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <Switch>
                                {
                                    this.state.roles === '[ROLE_MANAGER]' && [

                                        <Route path="/manager/addworker" name="ManagerAdd" component={ManagerAdd}/>,
                                        <Route path="/manager/managerdashboard" name="ManagerDashboard"
                                            component={ManagerDashboard}/>,
                                        <Route path="/manager/managerreviews" name="ManagerReviews" component={ManagerReviews}/>,
                                        <Redirect from="/" to="/manager/managerdashboard"/>
                                    ]
                                }
                                {
                                    this.state.roles === '[ROLE_WORKER]' && [

                                        <Route path="/worker/information" name="Information" component={Information}/>,
                                        <Route path="/worker/reviews" name="Reviews" component={Reviews}/>,
                                        <Route path="/worker/account" name="Account" component={Account}/>,
                                        <Route path="/worker/listworker" name="ListWorker" component={ListWorker}/>,
                                        <Redirect from="/" to="/worker/information"/>,


                                    ]
                                }
                                {
                                    this.state.roles === '[ROLE_EXECUTIVE]' && [

                                        <Route path="/executivemanager/dashboard" name="ExeManDashboard"
                                               component={ExeManDashboard}/>,
                                        <Route path="/executivemanager/addmanager" name="ExeManAdd"
                                        component={ExeManAdd}/>,
                                        <Route path="/executivemanager/updatemanager/:id" name="ExeManUpdate"
                                               component={ExeManUpdate}/>,
                                        <Route path="/executivemanager/reviewmanager" name="ReviewManager"
                                               component={ReviewManager}/>,
                                        <Route path="/executivemanager/checktickets" name="CheckTickets"
                                               component={CheckTickets}/>,
                                        <Redirect from="/" to="/executivemanager/dashboard"/>
                                    ]
                                }
                                {
                                    this.state.roles === '[ROLE_ANONYMOUS]' && [

                                        <Redirect from="/" to="/login"/>
                                    ]
                                }



                            </Switch>
                        </Container>
                    </main>
                    <Aside/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Full;
