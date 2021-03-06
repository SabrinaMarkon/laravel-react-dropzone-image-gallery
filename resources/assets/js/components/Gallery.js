import React, { Component } from 'react';
import {get} from 'axios';
import ReactGallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            currentImage: 0,
            lightboxIsOpen: false
        };
    }

    componentDidMount() {
        if (this.state.images.length > 0) {
            get('/photos')
                .then(response => {
                    const images = response.data;
                    this.setState({
                        images: images
                    });
                }).catch(error => {
                    console.log(error.response)
                });
        }
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    render() {
        let photos = this.state.images.map(image => {
          return {
              src: '/storage/' + image.url,
              width: image.width,
              height: image.height,
              id: image.id
          }
        });
        return(
            <div className="gallery">
                {this.state.images.length ?
                <ReactGallery
                    photos={photos}
                    onClick={this.openLightbox.bind(this)}
                />
                :
                <div className="no-images">
                    <h5 className="text-center">
<<<<<<< HEAD
<<<<<<< HEAD
                        There are currently no images in the gallery.
=======
                        There are no images in the photo gallery yet.
>>>>>>> 712bf532fecd84040eecca123795bdfe591706a0
=======
                        There are currently no images in the gallery.
>>>>>>> 86430bd8283ebfab8ba02fb0808c7c75759634bb
                    </h5>
                </div>
                }

                {/* <Lightbox
                    images={this.state.images}
                    onClose={this.closeLightbox.bind(this)}
                    onClickPrev={this.gotoPrevious.bind(this)}
                    onClickNext={this.gotoNext.bind(this)}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                    /> */}
            </div>
        );
    }

}
