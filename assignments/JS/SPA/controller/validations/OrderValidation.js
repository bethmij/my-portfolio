let txtQty = $('#orderQuantity');
let paraQty = $('#orderQtyPara');
let btnSave = $('#btnAddCart');
let qtyRegEx = /^\d+$/;

btnSave.attr("disabled", true);

txtQty.keyup(function (){
    enableButton();

    if( txtQty.val().length == 0) {
        txtQty.css("border", "1px solid white");
        paraQty.text("");
        btnSave.attr("disabled", true);
    }else {
        if (!qtyRegEx.test(txtQty.val())) {
            txtQty.css("border", "1px solid red");
            paraQty.text("Order quantity is a required field : only numbers");
            btnSave.attr("disabled", true);
        } else {
            txtQty.css("border", "1px solid green");
            paraQty.text("");
        }
    }
})

function enableButton(){
    if( qtyRegEx.test(txtQty.val()) && $('#cusName').val()!="Customer Name : " && $('#itemName').val()!="Item Name : "){
        btnSave.attr("disabled", false);
    }
}

$('#cusID').change(function () {enableButton()})
$('#itemCode').change(function () {enableButton()})