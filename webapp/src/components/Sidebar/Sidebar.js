import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }

        this.handleClick = this.handleClick.bind(this);
        this.activeRoute = this.activeRoute.bind(this);
        this.hideMobile = this.hideMobile.bind(this);
    }

    componentDidMount() {
        // fetch("http://localhost:8080/api/role",{
        //     method:"GET",
        // })
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/role',
            withCredentials: true,
            headers: {
                Cookies: document.cookie
            }


        })
            .then(response => {
                //console.log("slide barrrrr",response.data)
                this.setState({roles: response.data});



                if (this.state.roles === '[ROLE_EXECUTIVE]') {
                    this.state.items = nav.items1;

                    return true;
                }
                else if (this.state.roles === '[ROLE_MANAGER]') {
                    this.state.items = nav.items2;

                    return true;
                }
                else if (this.state.roles === '[ROLE_WORKER]') {
                    this.state.items = nav.items3;

                    return true;
                }
                else return false;
            })


            .catch(error => console.log(error));


    }

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName, props) {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

    }

    hideMobile() {
        if (document.body.classList.contains('sidebar-mobile-show')) {
            document.body.classList.toggle('sidebar-mobile-show')
        }
    }

    // todo Sidebar nav secondLevel
    // secondLevelActive(routeName) {
    //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    // }


    render() {

        const props = this.props;

        // badge addon to NavItem
        const badge = (badge) => {
            if (badge) {
                const classes = classNames(badge.class);
                return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
            }
        };

        // simple wrapper for nav-title item
        const wrapper = item => {
            return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name)
        };

        // nav list section title
        const title = (title, key) => {
            const classes = classNames('nav-title', title.class);
            return (<li key={key} className={classes}>{wrapper(title)} </li>);
        };

        // nav list divider
        const divider = (divider, key) => {
            const classes = classNames('divider', divider.class);
            return (<li key={key} className={classes}></li>);
        };

        // nav item with nav link
        const navItem = (item, key) => {
            const classes = {
                item: classNames(item.class),
                link: classNames('nav-link', item.variant ? `nav-link-${item.variant}` : ''),
                icon: classNames(item.icon)
            };
            return (
                navLink(item, key, classes)
            )
        };

        // nav link
        const navLink = (item, key, classes) => {
            const url = item.url ? item.url : '';
            return (
                <NavItem key={key} className={classes.item}>
                    {isExternal(url) ?
                        <RsNavLink href={url} className={classes.link} active>
                            <i className={classes.icon}></i>{item.name}{badge(item.badge)}
                        </RsNavLink>
                        :
                        <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                            <i className={classes.icon}></i>{item.name}{badge(item.badge)}
                        </NavLink>
                    }
                </NavItem>
            )
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li key={key} className={this.activeRoute(item.url, props)}>
                    <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i
                        className={item.icon}></i>{item.name}</a>
                    <ul className="nav-dropdown-items">
                        {navList(item.children)}
                    </ul>
                </li>)
        };

        // nav type
        const navType = (item, idx) =>
            item.title ? title(item, idx) :
                item.divider ? divider(item, idx) :
                    item.children ? navDropdown(item, idx)
                        : navItem(item, idx);

        // nav list
        const navList = (items) => {
            return items.map((item, index) => navType(item, index));
        };

        const isExternal = (url) => {
            const link = url ? url.substring(0, 4) : '';
            return link === 'http';
        };

        // sidebar-nav root
        return (
            <div className="sidebar">
                <SidebarHeader/>
                <SidebarForm/>
                <nav className="sidebar-nav">
                    <Nav>
                        {navList(this.state.items)}
                    </Nav>
                </nav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </div>
        )
    }
}

export default Sidebar;
