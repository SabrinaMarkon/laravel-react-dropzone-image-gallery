<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index() {
        return view('app');
    }

    public function getPhotos() {

    }

    public function uploadPhotos(Request $request) {
        $file = $request->file('file');
        $ext = $file->extension();
        $name = str_random(20) . '.' . $ext;
        list($width, $height)= getimagesize($file);
        $path = Storage::disk('public')->putFileAs(
            'uploads', $file, $name
        );
        if ($path) {
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

    public function deletePhotos(Request $request) {

    }

}

