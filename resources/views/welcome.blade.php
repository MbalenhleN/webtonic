@extends('layout.layout')



@section('content')

    <div class="container">
        <div class="text-center m-4">
{{--            Upload form--}}
            <form class="form-inline" id="frmUpload" enctype="multipart/form-data">
                <table class="table table-bordered">
                    <tr>
                        <td>
                            <div class="form-group col">
                                <input type="file" name="select_file" accept=".csv" placeholder="File Path" value="Browse" class="inputfile" id="upload-file">
                            </div>
                        </td>
                        <td>
                            <div class="form-group ">
                                <button type="submit" class="btn btn-outline-primary" id="file-upload-button" disabled>Upload</button>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>

{{--            Table that displays uploaded CSV files--}}
            <div class="table-responsive">
                <table class="table table-hover m-4" id="tblFile">
                    <thead class="table-secondary">
                    <tr>
                        <th></th>
                        <th>File Number</th>
                        <th>Date</th>
                        <th>File Name/ Path</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

