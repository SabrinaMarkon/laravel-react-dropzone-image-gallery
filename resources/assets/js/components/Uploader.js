import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';
import {post} from 'axios';

export default class Uploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            progress: 0,
            uploading: true,
            supported_mime: [
                'image/jpeg',
                'image/png'
            ]
        }
        this.onDrop = this.onDrop.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.removeDroppedFile = this.removeDroppedFile.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.calculateProgress = this.calculateProgress.bind(this);
    }

    onDrop(images) {
        //console.log(images);
        this.setState({
            images: this.state.images.concat([...images])
        });
        //console.log(this.state.images);
    }

    onDropRejected(images) {
        if (images.length) {
            toastr.options.timeOut = 5000;
            toastr.options.positionClass = 'toast-top-center';
            toastr.error('Please upload valid image files. Supported extension JPEG and PNG', 'Invalid MIME type');
        }
    }

    removeDroppedFile(preview, e = null){
        this.setState({
            images : this.state.images.filter((image) => {
                return image.preview !== preview
            })
        })
    }

    calculateProgress(total, uploaded){
        let percentage = (uploaded / total) * 100;
        this.setState({
            progress : percentage,
            uploading : percentage !== 100
        });

        if(percentage === 100){
            toastr.options.timeOut = 5000;
            toastr.options.positionClass = 'toast-top-center';
            toastr.success('Images uploaded to gallery');
        }
    }

    uploadFiles() {
        // console.log('wtf - ' + this.state.images);
        let images = this.state.images,
        config = { headers: { 'Content-Type': 'multipart/form-data'} },
        total_files = this.state.images.length,
        uploaded = 0;

        this.setState({
            uploading: true
        });

        /* Separately upload every separate file, then if the upload succeeds, remove that file from the state and update progress bar. */
        images.map((image) => {
            let formData = new FormData();
            formData.append("file", image);

             post("/photos", formData, config).then(response => {
                const done = response.data;
                if(done){
                    this.removeDroppedFile(image.preview);
                    this.calculateProgress(total_files, ++uploaded);
                }
            }).catch(error => {
                console.log(error.response)
            });
        });
    }

    render() {
        return (
            <div className="uploader" style={{marginTop: 20}}>
                <div className="text-center" style={{marginBottom: 20}}>
                {/* We have two function callback as props to dropzone which will be called after selected images are accepted or rejected: onDrop and onDropRejected */}
                    <Dropzone
                        onDropAccepted={this.onDrop}
                        onDropRejected={this.onDropRejected}
                        className="btn btn-dark"
                        style={{marginRight: 10}}
                        accept={this.state.supported_mime}>
                        Select Images
                    </Dropzone>

                    {this.state.images.length > 0 &&
                        <button
                            className="btn btn-dark uploadBtn"
                            onClick={this.uploadFiles}
                        >
                            Upload
                        </button>
                    }

                </div>

                {this.state.images.length ?
                    <Fragment>
                        {this.state.uploading &&
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width : this.state.progress }}
                                    aria-valuenow={this.state.progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"/>
                            </div>
                        }

                        <div className="images" style={{ marginTop: '20px' }}>
                            {
                                this.state.images.map((file) =>
                                    <div key={file.preview} className="image" style={{ maxWidth: '600px' }}>
                                        <span
                                            className="close"
                                            onClick={this.removeDroppedFile.bind(this, file.preview)}
                                        >X</span>
                                        <img src={file.preview} alt="" style={{ marginBottom: '20px', width: '100%' }}/>
                                    </div>
                                )
                            }
                        </div>
                    </Fragment>
                    :
                    <div className="no-images">
                        <div><h5 className="text-center">Selected images will appear here</h5></div>
                    </div>
                    }
            </div>
        );
    }
}
