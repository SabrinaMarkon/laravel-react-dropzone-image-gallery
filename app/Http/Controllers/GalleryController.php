<?php

namespace App\Http\Controllers;

use App\Photos;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index() {
        return view('app');
    }

    public function getPhotos() {
        /* We are returning a JSON response with all images uploaded by the user. After getting a response, we are updating images state on Gallery component. */
        return response()->json(Auth::user()->photos->toArray());
    }

    public function uploadPhotos(Request $request) {
        // get the uploaded file
        $file = $request->file('file');
        // get the file's extension
        $ext = $file->extension();
        // generate random name with extension.
        $name = str_random(20) . '.' . $ext;
        // get the width and height of the image
        list($width, $height)= getimagesize($file);
        // use Laravel Storage facade to store file to disk
        $path = Storage::disk('public')->putFileAs(
            'uploads', $file, $name
        );
        if ($path) {
            // save new post to photos table
            $create = Auth::user()->photos()->create([
                'uri' => $path,
                'public' => false,
                'height' => $height,
                'width' => $width
            ]);
            if ($create) {
                return response()->json([
                    'uploaded' => true
                ]);
            }
        }
    }

    /* delete image(s) from the storage and database */
    public function deletePhoto(Request $request, $id) {
        echo "WtFFF";
        $photo = Photos::find($request->id);
        if(Storage::disk('public')->delete($photo->url) && $photo->delete()) {
            return response()->json([
                'deleted' => true
            ]);
        }
    }

}

