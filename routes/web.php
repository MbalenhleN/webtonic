<?php

use Illuminate\Support\Facades\Route;

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

//Returns home screen view
Route::get('/', function () {
    return view('welcome');
});

//Upload CSV into database
Route::post('/home', 'HomeController@uploadFile');

//Display list of uploads
Route::get('/loadTbl', 'HomeController@listUploads');

//Gets data inside CSV file
Route::get('/home/viewDocument', 'HomeController@viewUploads');

//Helps display in new tab
Route::get('/home/file/{docName}', 'HomeController@linkToUploads');
