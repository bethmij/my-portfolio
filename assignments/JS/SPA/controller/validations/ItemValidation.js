let txtCode = $('#txtItemCode');
let paraCode = $('#itemCodePara');
let txtName = $('#txtItemName');
let paraName = $('#itemNamePara');
let txtPrice = $('#txtItemPrice');
let paraPrice = $('#itemPricePara');
let txtQty = $('#txtItemQuantity');
let paraQty = $('#itemQtyPara');
let btnSave = $('#itemSave');
let idRegEx = /^(I00-)[0-9]{3}$/;
let nameRegEx = /^[A-Za-z\s]*$/;
let priceRegEx = /^[0-9]*(\.[0-9]{0,2})?$/;
let qtyRegEx = /^\d+$/;
btnSave.attr("disabled", true);

txtCode.keyup(function (){

    enableButton();

    if( txtCode.val().length == 0) {
        txtCode.css("border", "1px solid white");
        paraCode.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!idRegEx.test(txtCode.val())) {
            txtCode.css("border", "1px solid red");
            paraCode.text("Item code is a required field : Pattern I00-000");
            btnSave.attr("disabled", true);
        } else {
            txtCode.css("border", "1px solid green");
            paraCode.text("");
            console.log(txtCode.css("border-left-color"));
        }
    }
})

txtName.keyup(function (){

    enableButton();

    if( txtName.val().length == 0) {
        txtName.css("border", "1px solid white");
        paraName.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!nameRegEx.test(txtName.val()) || !(txtName.val().length >= 5) || !(txtName.val().length <= 50)) {
            txtName.css("border", "1px solid red");
            paraName.text("Item Name is a required field : Min 5, Max 20, Spaces Allowed");
            btnSave.attr("disabled", true);
        } else {
            txtName.css("border", "1px solid green");
            paraName.text("");
        }
    }
})

txtPrice.keyup(function (){

    enableButton();

    if( txtPrice.val().length == 0) {
        txtPrice.css("border", "1px solid white");
        paraPrice.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!priceRegEx.test(txtPrice.val())) {
            txtPrice.css("border", "1px solid red");
            paraPrice.text("Item Price is a required field : Pattern 100.00 or 100");
            btnSave.attr("disabled", true);
        } else {
            txtPrice.css("border", "1px solid green");
            paraPrice.text("");
        }
    }
})

txtQty.keyup(function (){

    enableButton();

    if( txtQty.val().length == 0) {
        txtQty.css("border", "1px solid white");
        paraQty.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!qtyRegEx.test(txtQty.val())) {
            txtQty.css("border", "1px solid red");
            paraQty.text("Item quantity is a required field : only numbers");
            btnSave.attr("disabled", true);
        } else {
            txtQty.css("border", "1px solid green");
            paraQty.text("");
        }
    }
})

function enableButton(){
    if( idRegEx.test(txtCode.val()) && priceRegEx.test(txtPrice.val()) && qtyRegEx.test(txtQty.val()) &&
        nameRegEx.test(txtName.val()) && (txtName.val().length >= 5) && (txtName.val().length <= 50)){
        btnSave.attr("disabled", false);
    }
}

