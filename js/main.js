$(function () {
	'use strict';

	$('.form-control').on('input', function () {
		var $field = $(this).closest('.form-group');
		if (this.value) {
			$field.addClass('field--not-empty');
		} else {
			$field.removeClass('field--not-empty');
		}
	});
});

$(document).ready(function () {
	var username = $('#username').val();
	var password = $('#password').val();

	if (username != '' || password != '') {
		$('#FromGroupLoginusername').addClass('field--not-empty');
		$('#FromGroupLoginpassword').addClass('field--not-empty');
	}
	else {
		$('#FromGroupLoginusername').removeClass('field--not-empty');
		$('#FromGroupLoginpassword').removeClass('field--not-empty');
	}
});

const rmCheck = document.getElementById("rememberMe");
var Userids = document.getElementById('username').value;
var Password = document.getElementById('password').value;


if (localStorage.checkbox && localStorage.checkbox !== "") {
	rmCheck.setAttribute("checked", "checked");
	document.getElementById('username').value = localStorage.username;
	document.getElementById('password').value = localStorage.Password;
}
else {
	rmCheck.removeAttribute("checked");
	Userids = "";
}

var submit = document.getElementsByTagName('input')[4]
submit.onclick = function () {

	var Userid = document.getElementById('username').value;
	var Passwords = document.getElementById('password').value;

	if (rmCheck.checked && Userid !== "") 
	{
		localStorage.username = Userid;
		localStorage.Password = Passwords;
		localStorage.checkbox = rmCheck.value;
	}
	else 
	{
		localStorage.username = "";
		localStorage.Password = "";
		localStorage.checkbox = "";
	}

	var formData = {
		UserId: Userid,
		Password: Passwords,
		Latitude : '30.929715199999997',
		Longitude : '75.8382592',
		FireBaseToken : '/Nw66yXpk18='
	  };

	$.ajax({
		url: 'http://192.168.1.4:8090/GetUserLogin',
		type: 'POST',
		crossDomain: true,
		mod: 'no-cors',
		data: formData,
		dataType: "json",
		encode: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
		},
		success: function (data) {
			var status = data.status;
			if (status == "20") {
				window.location.href = 'dasboard.html'
			}
		},
		error: function () {
			console.log('Error in Operation');
		}
	});
}



// setTimeout(() => {
	// 	$('#CodeDiv').addClass('viewdata')
	//   }, "200")
	// $('#CodeDiv').addClass('BlockDiv')