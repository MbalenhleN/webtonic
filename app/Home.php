<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Home extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'content', 'path'];

    public static function getUpload($filename){
        $upload = array();
        $time = time();
        $date = date("Y-m-d",$time);
//        $realDate =  $date->format('d M Y g:i:s a');
        $sqlString = "INSERT INTO upload (updated_at, path)
                      VALUES ('{$date}', '{$filename}')";

//        $sql = query($sqlString);
        if ($sqlString) {
            $upload['msg'] = "Uploaded successfully.";
            $upload['msg_type'] = 'success';
        }
        else {
            $upload['msg'] = "Failed to upload.";
            $upload['msg_type'] = 'danger';
        }
    }
}
