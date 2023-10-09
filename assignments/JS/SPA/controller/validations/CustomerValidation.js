let txtID = $('#txtCusID');
let paraID = $('#cusIDPara');
let txtName = $('#txtCusName');
let paraName = $('#cusNamePara');
let txtAddress = $('#txtCusAddress');
let paraAddress = $('#cusAddressPara');
let txtSalary = $('#txtCusSalary');
let paraSalary = $('#cusSalaryPara');
let idRegEx = /^(C00-)[0-9]{3}$/;
let nameRegEx = /^[A-Za-z\s]*$/;
let salaryRegEx = /^[0-9]*(\.[0-9]{0,2})?$/;
let btnSave = $('#btnSave');
btnSave.attr("disabled", true);


txtID.keyup(function (){


    if( txtID.val().length == 0) {
        txtID.css("border", "1px solid white");
        paraID.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!idRegEx.test(txtID.val())) {
            txtID.css("border", "1px solid red");
            paraID.text("Cus ID is a required field : Pattern C00-000");
            btnSave.attr("disabled", true);
        } else {
            txtID.css("border", "1px solid green");
            paraID.text("");
            enableButton();
        }
    }
})

txtName.keyup(function (){

    if( txtName.val().length == 0) {
        txtName.css("border", "1px solid white");
        paraName.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!nameRegEx.test(txtName.val()) || !(txtName.val().length >= 5) || !(txtName.val().length <= 50)) {
            txtName.css("border", "1px solid red");
            paraName.text("Cus Name is a required field : Min 5, Max 50, Spaces Allowed");
            btnSave.attr("disabled", true);
        } else {
            txtName.css("border", "1px solid green");
            paraName.text("");
            enableButton();
        }
    }
})

txtAddress.keyup(function (){

    if( txtAddress.val().length == 0) {
        txtAddress.css("border", "1px solid white");
        paraAddress.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!(txtAddress.val().length >= 7)) {
            txtAddress.css("border", "1px solid red");
            paraAddress.text("Cus Address is a required field : Minimum 7");
            btnSave.attr("disabled", true);
        } else {
            txtAddress.css("border", "1px solid green");
            paraAddress.text("");
            enableButton();
        }
    }
})

txtSalary.keyup(function (){

    if( txtSalary.val().length == 0) {
        txtSalary.css("border", "1px solid white");
        paraSalary.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!salaryRegEx.test(txtSalary.val())) {
            txtSalary.css("border", "1px solid red");
            paraSalary.text("Cus Salary is a required field : Pattern 100.00 or 100");
            btnSave.attr("disabled", true);
        } else {
            txtSalary.css("border", "1px solid green");
            paraSalary.text("");
            enableButton();
        }
    }
})

function enableButton(){
    if( idRegEx.test(txtID.val()) && nameRegEx.test(txtName.val())  && txtAddress.val().length >= 7 &&
        salaryRegEx.test(txtSalary.val()) && txtSalary.val().length != 0 ){
        btnSave.attr("disabled", false);
    }
}