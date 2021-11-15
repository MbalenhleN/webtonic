$(document).ready(function () {

    loadTbl();

    // Datatable displaying uploaded files function
    function loadTbl() {
        var tblFile = $('#tblFile').DataTable({
            dom: "<'row'<'col-md-6'B><'col-md-6 d-flex flex-row-reverse'f>>" +
                "<'row'<'col-md-12'tr>>" +
                "<'row'<'col-md-4'i><'col-md-4 text-center'l><'col-md-4 d-flex flex-row-reverse'p>>",
            "lengthMenu": [20, 25, 50, 75, 100],
            autoWidth: true,
            scrollX: false,
            bDestroy: true,
            ajax: {
                url: '/loadTbl',
                dataSrc: '',
                type: 'get',
            },
            buttons: [],
            columns: [
                {
                    'data': 'Action', 'render': function (data, type, row, meta) {
                        return'<button title="View File" id="btnView" type="button" value="" class="btn fa fa-eye"></button>';}
                },
                {data: "id"},
                {data: "updated_at",
                    "render": function (data) {

                        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ];

                        var date = new Date(data);
                        var month = date.getMonth();
                        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();

                    }
                },
                {data: "path"}
            ],
        });

        //Button to view CSV data
        $(document).on('click', '#btnView', function () {
            var rowData = $('#tblFile').DataTable().row( $(this).parents('tr') ).data();
            var docName = rowData['path'];
            var docNum = rowData['id'];

            $.ajax({
                url: '/home/viewDocument',
                data: {docName, docNum},
                success: function (data) {
                    window.open('/home/file/'+docName,'_blank'); // open the CSV in a new window/tab

                }
            });
        });
    }

//Determines to enable and disable Upload btn based on user actions on the form
$('.inputfile').click(function () {
    if (document.getElementById("upload-file").files.length == 0) {
        $('#file-upload-button').attr("disabled", true);
    } else if (document.getElementById("upload-file").files.length > 0) {
        $('#file-upload-button').attr("disabled", false);
    }
});

//Determines to enable and disable Upload btn based on user actions when choosing file format to upload
$('.inputfile').change(function () {
    var val = $(this).val().toLowerCase(),
        regex = new RegExp("(.*?)\.(csv)$");
    var oFile = document.getElementById("upload-file").files[0]; // <input type="file" id="fileUpload" accept=".jpg,.png,.gif,.jpeg"/>

    if (!(regex.test(val))) {
        $(this).val('');
        var result = ['Incorrect file format selected.','danger'];
        dspMessage(result[0], result[1]);

    } else if (oFile.size > 10000000) {  // 10 mb for bytes.
        $(this).val('');
        $('#upLoadModal').modal('hide');
        var result = ['File size larger than 10MB!','danger'];
        dspMessage(result[0], result[1]);
    }

    if ($('.inputfile').val() == '') {

        $('#file-upload-button').attr("disabled", true);
    }else{
        $('#file-upload-button').attr("disabled", false);
    }
});

//Function to upload CSV file if file it's submitted
$('#frmUpload').on('submit', function (event) {
    event.preventDefault();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.LoadingOverlay("show", {
        color     : "rgba(255, 255, 255, 0.5)",
        image     : "",
        fontawesome    : "fa fa-spinner fa-pulse"
    });

    var filename =  new FormData(this);

    $.ajax({
        type: 'post',
        url: '/home',
        data: filename,
        dataType: 'text',
        contentType: false,
        processData: false,
        cache: false,

        success: function (data) {
            $.LoadingOverlay("hide");
            var result= ["File uploaded successfully.", "success"];
            var result2= ["File already exists.", "danger"];
            if(data == "true"){
                dspMessage(result[0], result[1]);
            }else {
                dspMessage(result2[0], result2[1]);
            }
            $('.inputfile').val('');
            $('#file-upload-button').attr("disabled", true);
            $('#tblFile').DataTable().ajax.reload();
            $('#tblFile').DataTable().draw();
        },
        error: function (data) {
            $.LoadingOverlay("hide");
            var result= ["File uploaded successfully.", "success"];
            var result2= ["File already exists.", "danger"];
            if(data == "true"){
                dspMessage(result[0], result[1]);
            }else {
                dspMessage(result2[0], result2[1]);
            }
            $('.inputfile').val('');
            $('#file-upload-button').attr("disabled", true);
            $('#tblFile').DataTable().ajax.reload();
            $('#tblFile').DataTable().draw();
        }

    });

});

//Show notification message
function dspMessage(message,type) {
    var iconName;

    switch(type) {
        case "success": iconName = 'fa fa-check-circle-o'; break;
        case "warning": iconName = 'fa fa-exclamation-circle'; break;
        case "danger": iconName = 'fa fa-times-circle-o'; break;
        default: iconName = 'fa fa-info-circle';
    }

    $.notify({
        // options
        icon		:	iconName,
        message	    :	message
    },{
        // settings
        type			:	type,
        placement	    :	{from		:	"top",
            align		:	"center"
        },
        offset			:	40,
        delay			:	200,
        timer			:	3000,
        mouse_over		:	"pause",
        allow_dismiss	:	false
    });


}

});
