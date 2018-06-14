<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photos extends Model
{
    protected $table = 'photos';
    /*
    $fillable vs $guarded (for protecting against mass assignment vulnerability ie. unexpected HTTP parameter passed such as is_admin)

    $fillable: "white list" of attributes that should be mass assignable

    $guarded: "black list" array of attributes that you do not want to be mass assignable.
    */
    protected $fillable = ['uri', 'public', 'height', 'width'];
}
