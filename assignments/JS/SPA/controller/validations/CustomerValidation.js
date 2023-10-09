let txtID = $('#txtCusID');
let paraID = $('#cusIDPara');
let txtName = $('#txtCusName');
let paraName = $('#cusNamePara');
let txtAddress = $('#txtCusAddress');
let paraAddress = $('#cusAddressPara');
let txtSalary = $('#txtCusSalary');
let paraSalary = $('#cusSalaryPara');


txtID.keyup(function (){
    let idRegEx = /^(C00-)[0-9]{3}$/;

    if( txtID.val().length == 0) {
        txtID.css("border", "1px solid white");
        paraID.text("");
    }else {
        if (!idRegEx.test(txtID.val())) {
            txtID.css("border", "1px solid red");
            paraID.text("Cus ID is a required field : Pattern C00-000");
        } else {
            txtID.css("border", "1px solid green");
            paraID.text("");
        }
    }
})

txtName.keyup(function (){
    let nameRegEx = /^[A-Za-z\s]*$/;

    if( txtName.val().length == 0) {
        txtName.css("border", "1px solid white");
        paraName.text("");
    }else {
        if (!nameRegEx.test(txtName.val()) || !(txtName.val().length >= 5) || !(txtName.val().length <= 50)) {
            txtName.css("border", "1px solid red");
            paraName.text("Cus Name is a required field : Min 5, Max 50, Spaces Allowed");
        } else {
            txtName.css("border", "1px solid green");
            paraName.text("");
        }
    }
})

txtAddress.keyup(function (){

    if( txtAddress.val().length == 0) {
        txtAddress.css("border", "1px solid white");
        paraAddress.text("");
    }else {
        if (!(txtAddress.val().length >= 7)) {
            txtAddress.css("border", "1px solid red");
            paraAddress.text("Cus Address is a required field : Minimum 7");
        } else {
            txtAddress.css("border", "1px solid green");
            paraAddress.text("");
        }
    }
})

txtSalary.keyup(function (){
    let salaryRegEx = /^[0-9]*(\.[0-9]{0,2})?$/;

    if( txtSalary.val().length == 0) {
        txtSalary.css("border", "1px solid white");
        paraSalary.text("");
    }else {
        if (!salaryRegEx.test(txtSalary.val())) {
            txtSalary.css("border", "1px solid red");
            paraSalary.text("Cus Salary is a required field : Pattern 100.00 or 100");
        } else {
            txtSalary.css("border", "1px solid green");
            paraSalary.text("");
        }
    }
})