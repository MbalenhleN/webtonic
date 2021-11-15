<?php

namespace App\Http\Controllers;

use App\Home;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class HomeController extends Controller
{

//    Uploads CSV file into database
    public static function uploadFile(Request $request){

        $input = $request->all();
        $response = '';

        if($file = $request->file('select_file')){
            $name = $file->getClientOriginalName();
            if (file_exists(public_path('csvFiles/'.$file->getClientOriginalName()))) {
                return redirect()->back()->withInput()->withErrors([' File already exists.']);
            }else{
                $file->move('csvFiles', $name);
                $input['path'] = $name;

                $filename = $input['path'];
                $time = time();
                $date = date("Y-m-d",$time);

                $values = array('updated_at' => $date,'path' => $filename);
                $var1 = DB::table('upload')->insert($values);
                $response = Response::json($var1);
            }
        }
        return $response;
    }

//    List data loaded onto database
    public static function listUploads(){
        $data = DB::table('upload')->get();
        $response = Response::json($data);

        return $response;
    }

//    Returns CSV data
    public static function viewUploads(Request $request){
        $docName   = $request->get('docName');
        $docNum   = $request->get('docNum');

        return response()->download('csvFiles/'.$docName);
    }

//    Helps display data in new tab
    public static function linkToUploads($docName){
        return response()->file('csvFiles/'.$docName);
    }
}
