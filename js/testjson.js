$(document).ready(function update(e) {
    var Userid = sessionStorage.getItem("Userid");

    window.setTimeout(update,6000);

    var SearchValueData = document.getElementById("SearchRecharge").value;

    var SelectIndex = document.getElementById("dataTable_length")
    var ShowDataLimit = SelectIndex.options[SelectIndex.selectedIndex].text;

    $.ajax({
        url: 'https://paypanel.in/Wcf/Service1.svc/GetUserRechargeTransitionLogV2?UserId=' + Userid + '&RechargeCount=' +ShowDataLimit,
        type: 'GET',
        dataType: 'Json',
        crossDomain: true,
        mod: 'no-cors',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        success: function (data) {
            var Result = JSON.parse(JSON.stringify(data));
            var result = Result.GetUserRechargeTransitionLogV2Result;
            var Result2 = JSON.parse(result);
            var ResultLenght = Result2.GetUserRechargeTransitionLogResult.length;
            var trHTML = '';
            $.each(Result2, function (i, item) {
                trHTML += '<thead><tr class="text-center"><th >User Id</th><th>Date & Time</th><th>Mobile Number</th><th>Operator Name</th><th>Recharge Status</th><th>Transition Id</th><th>Amount</th><th>Status Message</th><th>Recharge Type</th></tr></thead>';
                trHTML += '<tfoot><tr class="text-center"><td><strong>User Id</strong></td><td><strong>Date & Time</strong></td><td><strong>Mobile Number</strong></td><td><strong>Operator Name</strong></td><td><strong>Recharge Status</strong></td><td><strong>Transition Id</strong></td><td><strong>Amount</strong></td><td><strong>Status Message</strong></td><td><strong>Recharge Type</strong></td></tr></tfoot>';
                for (var j = 0; j < ResultLenght; ++j) {
                    var RechargeStatus = item[j].Status;
                    var ServiceType = item[j].ServiceType;
                    var CompanyTranstionId = item[j].StatusMessage;
                    /*  if(CompanyTranstionId.includes("Pending")){*/
                    if (ServiceType == "OtomaxDone") {
                        if (RechargeStatus == "20") {
                            trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                        } else if (RechargeStatus == "40") {
                            trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                        } else if (RechargeStatus == "2") {
                            trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                        }
                    } else if (ServiceType == "electDone") {
                        if (RechargeStatus == "20") {
                            trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                        } else if (RechargeStatus == "40") {
                            trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                        } else if (RechargeStatus == "2") {
                            trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                        }
                    }
                    else if(RechargeStatus == "2"){
                        if (RechargeStatus == "20") {
                            trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                        } else if (RechargeStatus == "40") {
                            trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                        } else if (RechargeStatus == "2") {
                            trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                        }
                    }
                        /*}else {
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        if(companyTranstionIdReplace.includes("was") || companyTranstionIdReplace.includes("Is")) {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            }
                        }
                        else{
                            //var Result2 = JSON.parse(companyTranstionIdReplace);
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            }
                        }
                    }*/
                }
            });
            document.getElementById("TranstionDataTable").innerHTML = "";
            $('#TranstionDataTable').append(trHTML);
        }
    });
});

function myFunction(e) {
    var IndexValue = document.getElementById("dataTable_length").value = e.target.value;
    var Userid = sessionStorage.getItem("Userid");
    $.ajax({
        url: 'https://paypanel.in/Wcf/Service1.svc/GetUserRechargeTransitionLogV2?UserId=' + Userid,
        type: 'GET',
        dataType: 'Json',
        crossDomain: true,
        mod: 'no-cors',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        success: function (data){
            var Result = JSON.parse(JSON.stringify(data));
            var result = Result.GetUserRechargeTransitionLogV2Result;

            var Result2 = JSON.parse(result);

            var SelectIndex = document.getElementById("dataTable_length");
            var ShowDataLimit = SelectIndex.options[SelectIndex.selectedIndex].text;
            var trHTML = '';
            $.each(Result2, function(i, item) {
                trHTML += '<thead><tr><th>User Id</th><th>Date & Time</th><th>Mobile Number</th><th>Operator Name</th><th>Recharge Status</th><th>Transition Id</th><th>Amount</th><th>Status Message</th><th>Recharge Type</th></tr></thead>';
                trHTML += '<tfoot><tr><td><strong>User Id</strong></td><td><strong>Date & Time</strong></td><td><strong>Mobile Number</strong></td><td><strong>Operator Name</strong></td><td><strong>Recharge Status</strong></td><td><strong>Transition Id</strong></td><td><strong>Amount</strong></td><td><strong>Status Message</strong></td></td><td><strong>Recharge Type</strong></td></tr></tfoot>';
                for(var j = 0; j < IndexValue; ++j) {
                    var RechargeStatus = item[j].Status;
                    var ServiceType = item[j].ServiceType;

                    var CompanyTranstionId = item[j].StatusMessage;
                    if(ServiceType == "OtomaxDone") {
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        /*    if(CompanyTranstionId.includes("Pending")){*/
                        if (RechargeStatus == "20") {
                            trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                        } else if (RechargeStatus == "40") {
                            trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></tr></tbody>';
                        } else if (RechargeStatus == "2") {
                            trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></tr></tbody>';
                        }
                    }
                    else if(ServiceType == "electDone"){
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        /*    if(CompanyTranstionId.includes("Pending")){*/
                        if (RechargeStatus == "20") {
                            trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                        } else if (RechargeStatus == "40") {
                            trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></tr></tbody>';
                        } else if (RechargeStatus == "2") {
                            trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></tr></tbody>';
                        }
                    }
                    else if(RechargeStatus == "2"){
                        if (RechargeStatus == "20") {
                            trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                        } else if (RechargeStatus == "40") {
                            trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                        } else if (RechargeStatus == "2") {
                            trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                        }
                    }
                    /*}*//*else {
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        if(companyTranstionIdReplace.includes("was") || companyTranstionIdReplace.includes("Is")) {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            }
                        }
                        else{

                           // var Result2 = JSON.parse(companyTranstionIdReplace);
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace+ '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace+ '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace+ '  </td></tr></tbody>';
                            }
                        }
                    }*/
                }
            });
            document.getElementById("TranstionDataTable").innerHTML = "";
            $('#TranstionDataTable').append(trHTML);
        }
    });
}

$(function (){

    $("#dataTable_length").change(function(){
        var Userid = sessionStorage.getItem("Userid");

        var SearchValueData = document.getElementById("SearchRecharge").value;

        var SelectIndex = document.getElementById("dataTable_length")
        var ShowDataLimit = SelectIndex.options[SelectIndex.selectedIndex].text;

        $.ajax({
            url: 'https://paypanel.in/Wcf/Service1.svc/GetUserRechargeTransitionLogV2?UserId=' + Userid + '&RechargeCount=' +ShowDataLimit,
            type: 'GET',
            dataType: 'Json',
            crossDomain: true,
            mod: 'no-cors',
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            },
            success: function (data) {
                var Result = JSON.parse(JSON.stringify(data));
                var result = Result.GetUserRechargeTransitionLogV2Result;
                var Result2 = JSON.parse(result);
                var ResultLenght = Result2.GetUserRechargeTransitionLogResult.length;
                var trHTML = '';
                $.each(Result2, function (i, item) {
                    trHTML += '<thead><tr class="text-center"><th >User Id</th><th>Date & Time</th><th>Mobile Number</th><th>Operator Name</th><th>Recharge Status</th><th>Transition Id</th><th>Amount</th><th>Status Message</th><th>Recharge Type</th></tr></thead>';
                    trHTML += '<tfoot><tr class="text-center"><td><strong>User Id</strong></td><td><strong>Date & Time</strong></td><td><strong>Mobile Number</strong></td><td><strong>Operator Name</strong></td><td><strong>Recharge Status</strong></td><td><strong>Transition Id</strong></td><td><strong>Amount</strong></td><td><strong>Status Message</strong></td><td><strong>Recharge Type</strong></td></tr></tfoot>';
                    for (var j = 0; j < ResultLenght; ++j) {
                        var RechargeStatus = item[j].Status;
                        var ServiceType = item[j].ServiceType;
                        var CompanyTranstionId = item[j].StatusMessage;
                        /*  if(CompanyTranstionId.includes("Pending")){*/
                        if (ServiceType == "OtomaxDone") {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                            }
                        } else if (ServiceType == "electDone") {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                            }
                        }
                        else if(RechargeStatus == "2"){
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr class="text-center"><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Pay </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch & Fail </td></td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr class="text-center"><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td class="mousecourser" onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td> Fatch </td></td></tr></tbody>';
                            }
                        }
                        /*}else {
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        if(companyTranstionIdReplace.includes("was") || companyTranstionIdReplace.includes("Is")) {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            }
                        }
                        else{
                            //var Result2 = JSON.parse(companyTranstionIdReplace);
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            }
                        }
                    }*/
                    }
                });
                document.getElementById("TranstionDataTable").innerHTML = "";
                $('#TranstionDataTable').append(trHTML);
            }
        });
    });
});





$(document).ready(function(){
    $("#SearchRecharge").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#TranstionDataTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});




/*function animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}*/







function BillPaySearchFilter() {
    var Userid = sessionStorage.getItem("Userid");

    var SelectIndex = document.getElementById("dataTable_length");
    var ShowDataLimit = SelectIndex.options[SelectIndex.selectedIndex].text;

    $.ajax({
        url: 'https://paypanel.in/Wcf/Service1.svc/GetUserRechargeTransitionBillPayLogV2?UserId=' + Userid + '&RechargeCount='+ShowDataLimit,
        type: 'GET',
        dataType: 'Json',
        crossDomain: true,
        mod: 'no-cors',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        success: function (data){
            var Result = JSON.parse(JSON.stringify(data));

            var result = Result.GetUserRechargeTransitionBillPayLogV2Result;

            var Result2 = JSON.parse(result);
            var ResultLength = Result2.GetUserRechargeTransitionBillPayLogResult.length;



            var trHTML = '';
            $.each(Result2, function(i, item) {
                trHTML += '<thead><tr><th>User Id</th><th>Date & Time</th><th>Mobile Number</th><th>Operator Name</th><th>Recharge Status</th><th>Transition Id</th><th>Amount</th><th>Status Message</th><th>Recharge Type</th></tr></thead>';
                trHTML += '<tfoot><tr><td><strong>User Id</strong></td><td><strong>Date & Time</strong></td><td><strong>Mobile Number</strong></td><td><strong>Operator Name</strong></td><td><strong>Recharge Status</strong></td><td><strong>Transition Id</strong></td><td><strong>Amount</strong></td><td><strong>Status Message</strong></td></td><td><strong>Recharge Type</strong></td></tr></tfoot>';

                for(var j = 0; j < ResultLength; ++j) {
                    var RechargeStatus = item[j].Status;
                    var ServiceType = item[j].ServiceType;
                    var CompanyTranstionId = item[j].StatusMessage;
                    /*  if(CompanyTranstionId.includes("Pending")){*/
                    /* if(ServiceType == "electDone"){*/
                    if (RechargeStatus == "20") {
                        trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td>Bill Pay</td></tr></tbody>';
                    } else if (RechargeStatus == "40") {
                        trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td>Bill Pay</td></td></tr></tbody>';
                    } else if (RechargeStatus == "2") {
                        trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td>Bill Pay</td></td></tr></tbody>';
                    }
                    /* }*/
                    /*}else {
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        if(companyTranstionIdReplace.includes("was") || companyTranstionIdReplace.includes("Is")) {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            }
                        }
                        else{
                            //var Result2 = JSON.parse(companyTranstionIdReplace);
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            }
                        }
                    }*/
                }
            });
            document.getElementById("TranstionDataTable").innerHTML = "";

            $('#TranstionDataTable').append(trHTML);
        }
    });
}

function BillFetchSearchFilter() {
    var Userid = sessionStorage.getItem("Userid");

    var SelectIndex = document.getElementById("dataTable_length");
    var ShowDataLimit = SelectIndex.options[SelectIndex.selectedIndex].text;

    $.ajax({
        url: 'https://paypanel.in/Wcf/Service1.svc/GetUserRechargeTransitionBillFatchLogV2?UserId=' + Userid + '&RechargeCount='+ShowDataLimit,
        type: 'GET',
        dataType: 'Json',
        crossDomain: true,
        mod: 'no-cors',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        success: function (data){
            var Result = JSON.parse(JSON.stringify(data));

            var result = Result.GetUserRechargeTransitionBillFatchLogV2Result;

            var Result2 = JSON.parse(result);

            var ResultLenght = Result2.GetUserRechargeTransitionBillFatchLogResult.length;

            var trHTML = '';
            $.each(Result2, function(i, item) {
                trHTML += '<thead><tr><th>User Id</th><th>Date & Time</th><th>Mobile Number</th><th>Operator Name</th><th>Recharge Status</th><th>Transition Id</th><th>Amount</th><th>Status Message</th><th>Recharge Type</th></tr></thead>';
                trHTML += '<tfoot><tr><td><strong>User Id</strong></td><td><strong>Date & Time</strong></td><td><strong>Mobile Number</strong></td><td><strong>Operator Name</strong></td><td><strong>Recharge Status</strong></td><td><strong>Transition Id</strong></td><td><strong>Amount</strong></td><td><strong>Status Message</strong></td></td><td><strong>Recharge Type</strong></td></tr></tfoot>';

                for(var j = 0; j < ResultLenght; ++j) {
                    var RechargeStatus = item[j].Status;
                    var ServiceType = item[j].ServiceType;
                    var CompanyTranstionId = item[j].StatusMessage;
                    /*  if(CompanyTranstionId.includes("Pending")){*/
                    /*if(ServiceType == "OtomaxDone") {*/
                    if (RechargeStatus == "20") {
                        trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td>Bill Fatch</td></tr></tbody>';
                    } else if (RechargeStatus == "40") {
                        trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td>Bill Fatch</td></td></tr></tbody>';
                    } else if (RechargeStatus == "2") {
                        trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td onmouseover="GetRechargeDetial()">' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '</td><td>Bill Fatch</td></td></tr></tbody>';
                    }
                    /*}*/
                    /*}else {
                        var companyTranstionIdReplace = CompanyTranstionId.replace("\\", "\\\\");
                        if(companyTranstionIdReplace.includes("was") || companyTranstionIdReplace.includes("Is")) {
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + CompanyTranstionId + '  </td></tr></tbody>';
                            }
                        }
                        else{
                            //var Result2 = JSON.parse(companyTranstionIdReplace);
                            if (RechargeStatus == "20") {
                                trHTML += '<tbody style="background-color: #D2FFEF"><tr><td >' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Success</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "40") {
                                trHTML += '<tbody style="background-color: #FFDCD9"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Fail</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            } else if (RechargeStatus == "2") {
                                trHTML += '<tbody style="background-color: #FFEEC2"><tr><td>' + item[j].UserId + '</td><td>' + item[j].Time + '</td><td>' + item[j].RechargeNumber + '</td><td>' + item[j].RechargeName + '</td><td>Panding</td><td>' + item[j].TranstionId + '</td><td>' + item[j].RechargeAmount + '  </td><td>' + companyTranstionIdReplace + '  </td></tr></tbody>';
                            }
                        }
                    }*/
                }
            });
            document.getElementById("TranstionDataTable").innerHTML = "";

            $('#TranstionDataTable').append(trHTML);
        }
    });
}
