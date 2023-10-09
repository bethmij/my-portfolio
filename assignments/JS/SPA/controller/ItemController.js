import {item} from "../model/Item.js";
import {itemDetail} from "../db/DB.js";
import {setItemCode} from "./OrderController.js";

let itemCode = $('#txtItemCode');
let itemName = $('#txtItemName');
let itemPrice = $('#txtItemPrice');
let itemQuantity = $('#txtItemQuantity');
let btnItemSave = $('#itemSave');

$(document).on('keydown', function(event) {
    if (event.keyCode === 9) {
        event.preventDefault();
    }
});

btnItemSave.click(function (event){

    if(btnItemSave.text()=="Save ") {
        let count = 0;
        var userChoice = window.confirm("Do you want to save the item?");

        if (userChoice) {
            for (let i = 0; i < itemDetail.length; i++) {
                if(itemDetail[i].code!=itemCode.val()) {
                    count++;
                }
            }
            if(count==itemDetail.length){
                item.addValue(itemCode.val(), itemName.val(), itemPrice.val(), itemQuantity.val());

                itemDetail.push(item);

                $('#itemBody').append(
                    `<tr>
                         <th scope="row">${item.code}</th>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${item.quantity}</td>
                            <td style="width: 10%"><img class="itemDelete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                        </tr>`
                );
                deleteDetail();
                setFeilds();
                clearAll(event);
                setItemCode();
                btnItemSave.attr("disabled", true);
            } else {
                alert("Duplicate item code!");
            }
        }
    }else if(btnItemSave.text()=="Update ") {
        for (let i = 0; i < itemDetail.length; i++) {

            if(itemDetail[i].code == $('#txtItemCode').val()){
                itemDetail[i].name = $('#txtItemName').val();
                itemDetail[i].price = $('#txtItemPrice').val();
                itemDetail[i].quantity = $('#txtItemQuantity').val();
                getAll();
                clearAll(event);
                btnItemSave.text("Save ");
                btnItemSave.attr("disabled", true);
                itemCode.val($(this).children(':eq(0)').text()).attr("disabled", false);
            }
        }
    }
    event.preventDefault();
})

$('#itemClear').click(function (event){
    clearAll(event);
})

function clearAll(event) {
    itemCode.val("");
    itemName.val("");
    itemPrice.val("");
    itemQuantity.val("");
    $('#txtItemCode').css("border", "1px solid white");
    $('#itemCodePara').text("");
    $('#txtItemName').css("border", "1px solid white");
    ;
    $('#itemNamePara').text("");
    $('#txtItemPrice').css("border", "1px solid white");
    ;
    $('#itemPricePara').text("");
    $('#txtItemQuantity').css("border", "1px solid white");
    ;
    $('#itemQtyPara').text("");
    event.preventDefault();
}



$('#itemGetAll').click(function (){
    getAll();

})

function getAll() {
    let tBody = $('#itemBody')
    tBody.empty();

    for (let i = 0; i < itemDetail.length; i++) {
        tBody.append(`<tr>
            <th scope="row">${itemDetail[i].code}</th>
            <td>${itemDetail[i].name}</td>
            <td>${itemDetail[i].price}</td>
            <td>${itemDetail[i].quantity}</td>
            <td style="width: 10%"><img class="itemDelete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
            </tr>`);
        deleteDetail();
        setFeilds();
    }
    ;
}



setFeilds();

function setFeilds() {
    $('#itemBody>tr').dblclick(function () {
        itemCode.val($(this).children(':eq(0)').text());
        itemName.val($(this).children(':eq(1)').text());
        itemPrice.val($(this).children(':eq(2)').text());
        itemQuantity.val($(this).children(':eq(3)').text());
        btnItemSave.text("Update ");
        btnItemSave.attr("disabled", false);
        itemCode.val($(this).children(':eq(0)').text()).attr("disabled", true);
    })
}

deleteDetail();

function deleteDetail() {
    let btnDelete = $('.itemDelete');
    btnDelete.on("mouseover", function (){
        $(this).css("cursor", "pointer");}
    )

    btnDelete.click(function () {
        var userChoice = window.confirm("Do you want to delete the item?");

        if (userChoice) {
            $(this).parents('tr').remove();
        }
    })
}

$('#itemSearch').click(function (){

    let code = $('#txtItemSearch').val();
    let tbody = $('#itemBody');
    let count = 0;

    if(code.length!=0) {
        for (let i = 0; i < itemDetail.length; i++) {
            if (itemDetail[i].code == code) {
                count++;
                tbody.empty();

                tbody.append(`<tr>
                <th scope="row">${itemDetail[i].code}</th>
                <td>${itemDetail[i].name}</td>
                <td>${itemDetail[i].price}</td>
                <td>${itemDetail[i].quantity}</td>
                <td style="width: 10%"><img class="itemDelete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                </tr>`);
                deleteDetail();
                setFeilds();
            }
        }
        if (count != 1) {
            alert("No such Item..please check the code");
        }
    }else {
        alert("Please enter the code");
    }
})
