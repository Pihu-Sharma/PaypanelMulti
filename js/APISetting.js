function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');

    modeSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        modeSwitch.classList.toggle('active');
    });

    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');

    listView.addEventListener('click', function () {
        gridView.classList.remove('active');
        listView.classList.add('active');
        projectsList.classList.remove('jsGridView');
        projectsList.classList.add('jsListView');
    });

    gridView.addEventListener('click', function () {
        gridView.classList.add('active');
        listView.classList.remove('active');
        projectsList.classList.remove('jsListView');
        projectsList.classList.add('jsGridView');
    });

    document.querySelector('.messages-btn').addEventListener('click', function () {
        document.querySelector('.messages-section').classList.add('show');
    });

    document.querySelector('.messages-close').addEventListener('click', function () {
        document.querySelector('.messages-section').classList.remove('show');
    });
});

$(document).ready(function () {
    const date = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const d = new Date();
    const Month = monthNames[d.getMonth()];

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

    document.getElementById('APITimeDisplay').innerHTML = Month + ", " + day;

});

function addObject(){    
    var colorArray = ['#fee4cb', '#e9e7fd', '#dbf6fd', '#ffd3e2', '#c8f7dc', '#d5deff'];
     var randomColor = Math.floor(Math.random() * colorArray.length);
     return colorArray[randomColor];
    //  document.getElementById("new-class").className = colorArray[randomColor];
 }

 function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
  


function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 

$(document).ready(function () {

    readTextFile("json/data.json", function (text) {

        var URlData = JSON.parse(text);

        

        var ips = URlData.ip;
        var port = URlData.port;


        $.ajax({
            url: 'http://'+ips+':'+port+'/GetAPIList',
            type: 'GET',
            crossDomain: true,
            mod: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
            success: function (data) {
               
                var DataLength = data.length;
                var txt = "";

                for (var i = 0; i < DataLength; i++) {
                    var APIName = data[i].APIName;
                    var APIStatus = data[i].APIStatus;
                    var APITOken = data[i].APITOken;
                    var Balance = data[i].Balance;
                    // var Balance = "70.00";
                    var UpdatedBalance = data[i].UpdatedBalance;
                    // var UpdatedBalance = "104.00";
                    var Colors = data[i].Color;
                    var BarColor = ColorLuminance(Colors, -0.3)
                    var Total = percentage(Balance , UpdatedBalance);
                    if(APIStatus)
                    {
                        txt += '<div class="project-box-wrapper"><div class="project-box" style="background-color: '+Colors+';"><div class="project-box-header"><span>December 10, 2020</span><div class="more-wrapper"><button class="project-btn-more"><svg xmlns="http://www.w3.org/20    00/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg></button></div></div><div class="project-box-content-header"><p class="box-content-header">'+ APIName +'</p><p class="box-content-subheader">'+Balance+'</p> </div><div class="box-progress-wrapper"><p class="box-progress-header">Balance</p><div class="box-progress-bar"><span class="box-progress" style="width: '+Total+'%; background-color: '+BarColor+'"></span></div><div class="tabs"><input type="radio" id="radio-1" name="tabs" checked=""><label class="tab" for="radio-1" >Success<span class="notification Successs" >2</span></label><input type="radio" id="radio-2" name="tabs"><label class="tab" for="radio-2" >Fail<span class="notification Fails" >2</span></label><input type="radio" id="radio-3" name="tabs"><label class="tab" for="radio-3" >Proccessing<span class="notification Pendings" >2</span></label></div></div><div class="project-box-footer"><div class="participants"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2550&amp;q=80" alt="participant"><img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60" alt="participant"><button class="add-participant" style="color: #ff942e;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><path d="M12 5v14M5 12h14" /></svg></button></div><!-- <div class="days-left" style="color: #ff942e;">2 Days Left</div> --><label class="switch days-left"><input type="checkbox" checked><span class="slider round"></span></label></div></div></div>'
                    }
                    else
                    {
                        txt += '<div class="project-box-wrapper"><div class="project-box" style="background-color: '+Colors+';"><div class="project-box-header"><span>December 10, 2020</span><div class="more-wrapper"><button class="project-btn-more"><svg xmlns="http://www.w3.org/20    00/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg></button></div></div><div class="project-box-content-header"><p class="box-content-header">'+ APIName +'</p><p class="box-content-subheader">'+Balance+'</p> </div><div class="box-progress-wrapper"><p class="box-progress-header">Balance</p><div class="box-progress-bar"><span class="box-progress" style="width: '+Total+'%; background-color: '+BarColor+'"></span></div><div class="tabs"><input type="radio" id="radio-1" name="tabs" checked=""><label class="tab" for="radio-1" >Success<span class="notification Successs" >2</span></label><input type="radio" id="radio-2" name="tabs"><label class="tab" for="radio-2" >Fail<span class="notification Fails" >2</span></label><input type="radio" id="radio-3" name="tabs"><label class="tab" for="radio-3" >Proccessing<span class="notification Pendings" >2</span></label></div></div><div class="project-box-footer"><div class="participants"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2550&amp;q=80" alt="participant"><img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60" alt="participant"><button class="add-participant" style="color: #ff942e;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><path d="M12 5v14M5 12h14" /></svg></button></div><!-- <div class="days-left" style="color: #ff942e;">2 Days Left</div> --><label class="switch days-left"><input type="checkbox" ><span class="slider round"></span></label></div></div></div>'
                    }
                }
                document.getElementById("ProjectBoxes").innerHTML = "";
                $("#ProjectBoxes").append(txt);
            },
            error: function () {
                console.log('Error in Operation');
            }
        });
    });
});

$(document).ready(function () {

    readTextFile("json/data.json", function (text) {

        var URlData = JSON.parse(text);

        var ips = URlData.ip;
        var port = URlData.port;


        $.ajax({
            url: 'http://' + ips + ':' + port + '/GetSFPData',
            type: 'GET',
            crossDomain: true,
            mod: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
            success: function (data) {
                var Fail = data.Fail;
                var Pending = data.Pending;
                var Success = data.Success;
                var total = Fail + Pending + Success;

                const totals = document.getElementById("total");
                const Successs = document.getElementById("Success");
                const Fails = document.getElementById("Fail");
                const Proccessingss = document.getElementById("Proccessing");

              

                animate(totals, 0, total, 500);
                animate(Successs, 0, Success, 500);
                animate(Fails, 0, Fail, 500);
                animate(Proccessingss, 0, Pending, 500);

             

                // document.getElementById('total').innerHTML = total;
                // document.getElementById('Success').innerHTML = Success;
                // document.getElementById('Fail').innerHTML = Fail;
                // document.getElementById('Proccessing').innerHTML = Pending;
            },
            error: function () {
                console.log('Error in Operation');
            }
        });
    });
});
setInterval(function () {
    readTextFile("json/data.json", function (text) {

        var URlData = JSON.parse(text);

        var ips = URlData.ip;
        var port = URlData.port;


        $.ajax({
            url: 'http://' + ips + ':' + port + '/GetSFPData',
            type: 'GET',
            crossDomain: true,
            mod: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
            success: function (data) {
                var Fail = data.Fail;
                var Pending = data.Pending;
                var Success = data.Success;
                var total = Fail + Pending + Success;

                const totals = document.getElementById("total");
                const Successs = document.getElementById("Success");
                const Fails = document.getElementById("Fail");
                const Proccessingss = document.getElementById("Proccessing");

           

                animate(totals, 0, total, 500);
                animate(Successs, 0, Success, 500);
                animate(Fails, 0, Fail, 500);
                animate(Proccessingss, 0, Pending, 500);


                // document.getElementById('total').innerHTML = total;
                // document.getElementById('Success').innerHTML = Success;
                // document.getElementById('Fail').innerHTML = Fail;
                // document.getElementById('Proccessing').innerHTML = Pending;
            },
            error: function () {
                console.log('Error in Operation');
            }
        });
    });
    return false;
}, 20000);



function animate(obj, initVal, lastVal, duration) {
    let startTime = null;

    let currentTime = Date.now();

    const step = (currentTime) => {

        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min((currentTime - startTime) / duration, 1);

        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };
    window.requestAnimationFrame(step);
}