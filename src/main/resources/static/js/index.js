function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#imageUpload").change(function() {
    readURL(this);
});

function _(el) {
	return document.getElementById(el);
}

function uploadFile() {
	
	_("link").setAttribute('href', '');
	_("link").innerHTML = "";
	
	if (_("imageUpload").value == "") {
		_("status").innerHTML = "Select the Image file";
		return;
	}  
    
	var file = _("imageUpload").files[0];
	
	var formdata = new FormData();
	formdata.append("imageFile", file);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", "image/upload", true);
	ajax.send(formdata);
}

function progressHandler(event) {
	_("status").innerHTML = "Uploading...";
}

function completeHandler(event) {
	_("status").innerHTML = "Uploaded";
	_("link").setAttribute('href', event.target.responseText);
	_("link").innerHTML = event.target.responseText;
	
	_("imageUpload").value = "";
	defaultAvatar();
}

function errorHandler(event) {
	_("status").innerHTML = "Upload Failed";
	
}

function abortHandler(event) {
	_("status").innerHTML = "Upload Aborted";
}

function validateFileType(){
	_("link").setAttribute('href', '');
	_("link").innerHTML = "";
	_("status").innerHTML = "";
	
	var fileName = _("imageUpload").value;
	
	if (fileName == "") {
		_("status").innerHTML = "Select the Image file";
		defaultAvatar();
		return;
	}  
	
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile != "jpg" && extFile != "jpeg" && extFile != "png"){
    	_("status").innerHTML = "Select the valid Image type";
    	_("imageUpload").value = "";
    	defaultAvatar();
		return;
    }
	var FileSize = _("imageUpload").files[0].size / 1024 / 1024;
	if (FileSize >= 1) {
        _("status").innerHTML = "Select the Image less than 1MB";
    	_("imageUpload").value = "";
    	defaultAvatar();
		return;    
    }
}

function defaultAvatar(){
	_("imagePreview").setAttribute("style", "background-image: url(image/upload.png);");
}