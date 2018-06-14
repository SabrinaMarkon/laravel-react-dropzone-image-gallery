<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Auth::routes();

/* Add 'all' requests route to render app.blade.php view against all incoming requests.
We’ve added all requests route under an auth route group to ensure authenticated access to our single page application.
*/
Route::group(['middleware' => ['auth']], function() {
    Route::get('{all?}', 'GalleryController@index')->where('all', '([A-z\d-\/_.]+)?');
});

// Route::get('/home', 'HomeController@index')->name('home');
