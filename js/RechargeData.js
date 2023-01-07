// function myFunction() {
//     $.ajax({
//         url: 'https://112.196.47.126/Wcf/Service1.svc/GetRechargeList',
//         type: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             var len = data.GetRechargeListResult.length;
//             var txt = "";
//             for(var i=0;i<len;i++){

//                 var RechargeName = data.GetRechargeListResult[i].RechargeName;
//                 var Number = data.GetRechargeListResult[i].RechargeNumber;
//                 var Status = data.GetRechargeListResult[i].Status;
//                 var Amount = data.GetRechargeListResult[i].RechargeAmount;
//                 var Time = data.GetRechargeListResult[i].Time;

//                 if(Status == "2")
//                 {
//                     var StatusMsg = "PENDING";
//                     txt += "<tr><td>"+RechargeName+"</td><td>"+Number+"</td><td>"+StatusMsg+"</td><td>"+Amount+"</td><td>"+Time+"</td></tr>";
//                 }
//                 else if(Status == "20")
//                 {
//                     var StatusMsg = "SUCCESS";
//                     txt += "<tr><td>"+RechargeName+"</td><td>"+Number+"</td><td>"+StatusMsg+"</td><td>"+Amount+"</td><td>"+Time+"</td></tr>";
//                 }
//                 else if(Status == "40")
//                 {
//                     var StatusMsg = "FAIL";
//                     txt += "<tr><td>"+RechargeName+"</td><td>"+Number+"</td><td>"+StatusMsg+"</td><td>"+Amount+"</td><td>"+Time+"</td></tr>";
//                 }
//             }

//             $("#tableData").append(txt);
//             $("#tableData > tbody > tr").hide().slice(0, 21).show();
//         },
//         error: function () {
//             console.log('Error in Operation');
//         }
//     });
//     return false;//suppress natural form submission
// }

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


function sortJSON(arr, key, way) {
    return arr.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}


// var GetColorName = function (APINames) {

//     var ColorNamess = null;
//     $.ajax({
//         url: 'http://192.168.1.4:8090/GetColorName?ApiName=MROBO',
//         type: 'GET',
//         crossDomain: true,
//         mod: 'no-cors',
//         async: false,
//         global: false,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
//             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
//         },
//         success: function (data) {
//             ColorNamess = data;
//             // console.log(ColorNamess);
//             // // return ColorNamess;
//         },
//     });
//     return ColorNamess;
// }();



$(document).ready(function () {
    readTextFile("json/data.json", function (text) {
        var URlData = JSON.parse(text);

        var ips = URlData.ip;
        var port = URlData.port;

        var userid = localStorage.username;
        var formData = {
            UserId: userid,
        };

        $.ajax({
            url: 'http://' + ips + ':' + port + '/GetAllRechargeData',
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

                Data2 = sortJSON(data, 'id', '321');

                var len = Data2.length;
                var txt = "";
                txt += '<thead><tr><th class="table-plus">Operator</th><th>Time</th><th>Status</th><th>Amount</th><th>Number</th><th>Transaction Id</th><th>API</th></tr></thead>'
                for (var i = 0; i < len; i++) {
                    var RechargeName = Data2[i].RechargeOprator;
                    var Number = Data2[i].RechargeNumber;
                    var Status = Data2[i].RecharegeStatus;
                    var Amount = Data2[i].RechargeAmount;
                    var Time = Data2[i].Time;
                    var TransacitonID = Data2[i].TransactionId;
                    var id = Data2[i].id;
                    var ServiceName = Data2[i].ServiceName;
                    var image = "images/Oprater/" + RechargeName + ".png";

                    var ColorName;

                    $.ajax({
                      type: "GET",
                      url: 'http://192.168.1.4:8090/GetColorName?ApiName='+ServiceName,
                      datatype: "json",
                      async: false,
                      success: function(data2){
                        ColorName = data2.Color;
                      }
                    });
                    
                    if (Status == "FAILURE") {
                        txt += '<tbody style="background: '+ColorName+'" class=" FailLigttbody"><tr><td><div class="d-flex align-items-center pr-20"><img class="avatar  mr-3" src=' + image + ' alt=""><div class=""><p class="font-weight-bold mb-0">' + RechargeName + '</p><p class="text-muted mb-0">paypanel-app</p></div></div></td><td>' + Time + '</td><td><div class="badge glowonFail badge-fail-alt">' + Status + '</div></td><td>' + Amount + '</td><td>' + Number + '</td><td>' + TransacitonID + '</td><td><div class="dropdown"><button class="btn btn-sm btn-icon" type="button"  id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i></button><div class="dropdown-menu " aria-labelledby="dropdownMenuButton2"><a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a></div></div></td></tr></tbody>';
                    }
                    else if (Status == "SUCCESS") {
                        txt += '<tbody style="background: '+ColorName+'"  class="SuccessLigttbody"><tr><td><a href="#"><div class="d-flex align-items-center pr-20"><img class="avatar mr-3" src=' + image + ' alt=""><div class=""><p class="font-weight-bold mb-0">' + RechargeName + '</p><p class="text-muted mb-0">paypanel-app</p></div></div></a></td><td>' + Time + '</td><td><div class="badge glowonSuccess badge-success-alt">' + Status + '</div></td><td>' + Amount + '</td><td>' + Number + '</td><td>' + TransacitonID + '</td><td><div class="dropdown"><button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i></button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton2"><a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a><a class="dropdown-item text-danger" href="#"><i class="bx bxs-trash mr-2"></i> Remove</a></div></div></td></tr></tbody>';
                    }
                    else if (Status == "PENDING") {
                        txt += '<tbody style="background: '+ColorName+'"  class="pendingLigttbody"><tr><td><a href="#"><div class="d-flex align-items-center pr-20"><img class="avatar mr-3" src=' + image + ' alt=""><div class=""><p class="font-weight-bold mb-0">' + RechargeName + '</p><p class="text-muted mb-0">paypanel-app</p></div></div></a></td><td>' + Time + '</td><td><div class="badge glowonPending badge-pending-alt">' + Status + '</div></td><td>' + Amount + '</td><td>' + Number + '</td><td>' + TransacitonID + '</td><td><div class="dropdown"><button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i></button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton2"><a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a><a class="dropdown-item text-danger" href="#"><i class="bx bxs-trash mr-2"></i> Remove</a></div></div></td></tr></tbody>';
                    }
                }
                document.getElementById("tableData").innerHTML = "";
                $("#tableData").append(txt);
                $("#tableData > tbody > tr").hide().slice(0, 20).show();
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

        var userid = localStorage.username;
        var formData = {
            UserId: userid,
        };

        $.ajax({
            url: 'http://' + ips + ':' + port + '/GetAllRechargeData',
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

                Data2 = sortJSON(data, 'id', '321');

                var len = Data2.length;
                var txt = "";
                txt += '<thead><tr><th class="table-plus">Operator</th><th>Time</th><th>Status</th><th>Amount</th><th>Number</th><th>Transaction Id</th><th>API</th></tr></thead>'
                for (var i = 0; i < len; i++) {
                    var RechargeName = Data2[i].RechargeOprator;
                    var Number = Data2[i].RechargeNumber;
                    var Status = Data2[i].RecharegeStatus;
                    var Amount = Data2[i].RechargeAmount;
                    var Time = Data2[i].Time;
                    var TransacitonID = Data2[i].TransactionId;
                    var id = Data2[i].id;
                    var ServiceName = Data2[i].ServiceName;
                    var image = "images/Oprater/" + RechargeName + ".png";

                    var ColorName;

                    $.ajax({
                      type: "GET",
                      url: 'http://192.168.1.4:8090/GetColorName?ApiName='+ServiceName,
                      datatype: "json",
                      async: false,
                      success: function(data2){
                        ColorName = data2.Color;
                      }
                    });
                    
                    if (Status == "FAILURE") {
                        txt += '<tbody style="background: '+ColorName+'" class=" FailLigttbody"><tr><td><div class="d-flex align-items-center pr-20"><img class="avatar  mr-3" src=' + image + ' alt=""><div class=""><p class="font-weight-bold mb-0">' + RechargeName + '</p><p class="text-muted mb-0">paypanel-app</p></div></div></td><td>' + Time + '</td><td><div class="badge glowonFail badge-fail-alt">' + Status + '</div></td><td>' + Amount + '</td><td>' + Number + '</td><td>' + TransacitonID + '</td><td><div class="dropdown"><button class="btn btn-sm btn-icon" type="button"  id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i></button><div class="dropdown-menu " aria-labelledby="dropdownMenuButton2"><a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a></div></div></td></tr></tbody>';
                    }
                    else if (Status == "SUCCESS") {
                        txt += '<tbody style="background: '+ColorName+'"  class="SuccessLigttbody"><tr><td><a href="#"><div class="d-flex align-items-center pr-20"><img class="avatar mr-3" src=' + image + ' alt=""><div class=""><p class="font-weight-bold mb-0">' + RechargeName + '</p><p class="text-muted mb-0">paypanel-app</p></div></div></a></td><td>' + Time + '</td><td><div class="badge glowonSuccess badge-success-alt">' + Status + '</div></td><td>' + Amount + '</td><td>' + Number + '</td><td>' + TransacitonID + '</td><td><div class="dropdown"><button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i></button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton2"><a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a><a class="dropdown-item text-danger" href="#"><i class="bx bxs-trash mr-2"></i> Remove</a></div></div></td></tr></tbody>';
                    }
                    else if (Status == "PENDING") {
                        txt += '<tbody style="background: '+ColorName+'"  class="pendingLigttbody"><tr><td><a href="#"><div class="d-flex align-items-center pr-20"><img class="avatar mr-3" src=' + image + ' alt=""><div class=""><p class="font-weight-bold mb-0">' + RechargeName + '</p><p class="text-muted mb-0">paypanel-app</p></div></div></a></td><td>' + Time + '</td><td><div class="badge glowonPending badge-pending-alt">' + Status + '</div></td><td>' + Amount + '</td><td>' + Number + '</td><td>' + TransacitonID + '</td><td><div class="dropdown"><button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip" data-placement="top" title="Actions"></i></button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton2"><a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i> Edit Profile</a><a class="dropdown-item text-danger" href="#"><i class="bx bxs-trash mr-2"></i> Remove</a></div></div></td></tr></tbody>';
                    }
                }
                document.getElementById("tableData").innerHTML = "";
                $("#tableData").append(txt);
                $("#tableData > tbody > tr").hide().slice(0, 20).show();
            },
            error: function () {
                console.log('Error in Operation');
            }
        });
    });
}, 30000);

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

$.noConflict();
$(document).ready(function () {

    $("#examplsse").DataTable({
        aaSorting: [],
        responsive: true,

        columnDefs: [
            {
                responsivePriority: 1,
                targets: 0
            },
            {
                responsivePriority: 2,
                targets: -1
            }
        ]
    });

    $(".dataTables_filter input")
        .attr("placeholder", "Search here...")
        .css({
            width: "300px",
            display: "inline-block"
        });

});


function Clear() {
    localStorage.clear();
}


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


