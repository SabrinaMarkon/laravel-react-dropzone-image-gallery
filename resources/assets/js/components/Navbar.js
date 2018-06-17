import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="navbar-nav mr-auto">
                    <Link to={'/'} className={`nav-link ${this.props.location.pathname === '/' ? 'active' : ''}`} >GALLERY</Link>
                    <Link to={'/upload'} className={`nav-link ${this.props.location.pathname === '/upload' ? 'active' : ''}`} >UPLOADER</Link>         <Link to={'/manage'} className={`nav-link ${this.props.location.pathname === '/manage' ? 'active' : ''}`} >MANAGE</Link>
                </div>
                <div className="navbar-nav ml-auto">
                    <a className="nav-link" href="/logout">LOGOUT</a>
                </div>
            </nav>
        );
    }

}
