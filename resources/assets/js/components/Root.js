import {Route} from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import Navbar from './Navbar';
import Gallery from './Gallery';
import Uploader from './Uploader';
import ManageGallery from './ManageGallery';

export default class Root extends Component {
    render() {
        return (
            <Fragment>
                <Route path="/" render={(props) => (
                    <Navbar {...props}/>
                )}/>

                <div className="container">
                     <Route exact path="/" component={this.Gallery}/>
                     <Route exact path="/manage" component={this.ManageGallery}/>
                    <Route exact path="/upload" component={this.Uploader}/>
                </div>
            </Fragment>
        );
    }
}
