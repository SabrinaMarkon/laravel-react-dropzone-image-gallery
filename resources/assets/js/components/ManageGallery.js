import React, { Component } from 'react';
import {get} from 'axios'; // use get method and connect to url.
import ReactGallery from 'react-photo-gallery';

export default class ManageGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            selectAll: false,
            selected: false,
            selected_count: true
        }
    }

    componentDidMount() {
        get('/photos')
            .then(response => {
                let images = response.data.map(image => {
                    return {
                        src: '/storage/' + image.uri,
                        width: image.width,
                        height: image.height,
                        id: image.id
                    }
                });
                this.setState({
                    images: images
                });
            });
    }

    render() {
        return(
            <div className="gallery">
                {this.state.selected > 0 &&
                <button
                    className="btn btn-danger deleteBtn"
                    onClick={this.deleteIMages.bind(this)}
                >   Delete {this.state.selected_count} Selected Photos
                </button>
                }
                {this.state.images.length ?
                <ReactGallery
                    photos={photos}
                    onClick={this.selectImage.bind(this)}
                    ImageComponent={SelectedImage}
                />
                :
                <div className="no-images">
                    <h5 className="text-center">
                        You currenty have no images in your photos gallery
                    </h5>
                </div>
                }
            </div>
        );
    }

}
