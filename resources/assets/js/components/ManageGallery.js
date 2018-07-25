import React, { Component } from 'react';
import axios,{get} from 'axios';
import ReactGallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';
import toastr from 'toastr';

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
            }).catch(error => {
                console.log(error.response)
            });
    }

    /* Mark the image as selected on click event. If there are marked images, we’ll display a delete button */
    selectImage(event, obj) {
        let images = this.state.images;
        images[obj.index].selected = !images[obj.index.selected];
        this.setState({
            images: images,
        }, () => {
            this.verifyMarked();
        });
    }

    /* Calculate the total number of marked images and update selected and state on our component */
    verifyMarked() {
        let marked = false,
              mark_count = 0;
        this.state.images.map(image => {
            if (image.selected) {
                marked = true;
                mark_count += 1;
            }
        });
        this.setState({
            selected: marked,
            selected_count: mark_count
        });
    }

    /* handle the delete button for an image */
    deleteImages(e) {
        e.preventDefault();
        let marked = this.state.images.filter(image => {
            return image.selected;
        });
        marked.map(image => {
            axios.delete('/photos/' + image.id, {
                params: {
                    id: image.id,
                    _method: 'delete'
                }
            }).then(response => {
                if (response.data.deleted) {
                    this.setState({
                        images: this.state.images.filter(img => {
                            return img.id !== image.id
                        })
                    });
                    toastr.options.timeOut = 5000;
                    toastr.options.positionClass = 'toast-top-center';
                    toastr.success('Images were deleted from the gallery');
                }
            }).catch(error => {
                console.log(error.response)
            });
        });
    }

    render() {
        return(
            <div className="gallery">
                {this.state.selected > 0 &&
                <button
                    className="btn btn-danger deleteBtn"
                    onClick={this.deleteImages.bind(this)}
                >   Delete {this.state.selected_count} Selected Photos
                </button>
                }
                {this.state.images.length ?
                <ReactGallery
                    photos={this.state.images}
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
