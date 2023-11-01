var Token = '90931543|-31949330531622338|90959902' ;
var jpdbBaseUrl = 'http://api.login2explore.com:5577';
var jpdbIml = '/api/iml';
var jpdbIrl = '/api/irl';
var stDBName = 'SCHOOL-DB';
var stRelationName = 'STUDENT-TABLE';

$("#st-id").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStIdAsJsonObj() {
    var stid= $("#st-id").val();
    var jsonStr={
        id: stid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#st-name").val("record.name");
    $("#st-class").val("record.class");
    $("#st-birth").val("record.birth");
    $("#st-address").val("record.address");
    $("#st-enroll").val("record.enroll");


}

function resetForm() {
    $("#st-id").val("");
    $("#st-name").val("");
    $("#st-class").val("");
    $("#st-birth").val("");
    $("#st-address").val("");
    $("#st-enroll").val("");
    $('#st-id').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('st-id').focus();
}

function validateData() {
    var stid, stname, stclass, stbirth, staddress, stenroll;
    stid = $("#st-id").val();
    stname = $("#st-name").val();
    stclass = $("#st-class").val();
    stbirth = $("#st-birth").val();
    staddress = $("#st-address").val();
    stenroll = $("#st-enroll").val();
     if (stid === "") {
        alert("Student Roll-No Missing");
        $("st-id").focus();
        return "";
     }
     if (stname === "") {
        alert("Student Name Missing");
        $("st-name").focus();
        return "";
     }
     if (stclass === "") {
        alert("Student Class Missing");
        $("st-class").focus();
        return "";
     }
     if (stbirth === "") {
        alert("Student birth Missing");
        $("st-birth").focus();
        return "";
     }
     if (staddress === "") {
        alert("Student Address Missing");
        $("st-address").focus();
        return "";
     }
     if (stenroll === "") {
        alert("Student Enrollment-No Missing");
        $("st-enroll").focus();
        return "";
     }
     var jsonStrObj = {
        id:stid,
        name:stname,
        class:stclass,
        birth:stbirth,
        address:staddress,
        enroll:stenroll
     };
     return JSON.stringify(jsonStrObj);

  }

function getSt() {
    var stIdJsonObj = getStIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(Token, stDBName, stRelationName, stIdJsonObj );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIrl);
    jQuery.ajaxSetup({async: true});
    if( resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#st-name").focus();
    }
    else if(resJsonObj.status === 200)  {
        $("#st-id").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#st-name").focus();

    }
}


function saveData() {
    var jsonStrObj = validateData();
    if(jsonStrObj === "") {
        return;
    }

    var putRequest= createPUTRequest(Token, jsonStrObj, stDBName, stRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandATGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIml);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#st-id").focus();
}

function changeData() {
    $("#change").prop("disabled", ture);
    jsonChg = validateData();
    var updateRequest= createUPDATERecordRequest(Token, jsonChg, stDBName, stRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: flase});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIml);
    jQuery.ajaxSetup({async: flase});
    console.log(resJsonObj);
    resetForm();
    $("#st-id").focus();
}
