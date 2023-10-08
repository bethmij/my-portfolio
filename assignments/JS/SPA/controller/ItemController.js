import {item} from "../model/Item.js";
import {itemDetail} from "../db/DB.js";

let itemCode = $('#itemCode');
let itemName = $('#itemName');
let itemPrice = $('#itemPrice');
let itemQuantity = $('#itemQuantity');

$('#itemSave').click(function (event){

    item.addValue(itemCode.val(), itemName.val(), itemPrice.val(), itemQuantity.val());

    itemDetail.push(item);

    $('#itemBody').append(
        `<tr>
            <th scope="row">${item.code}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td style="width: 10%"><img class="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
        </tr>`
    );
    deleteDetail();
    setFeilds();
    event.preventDefault();
})

$('#itemClear').click(function (event){
    itemCode.val("");
    itemName.val("");
    itemPrice.val("");
    itemQuantity.val("");
    event.preventDefault();
})

$('#itemGetAll').click(function (){
    let tBody = $('#itemBody')
    tBody.empty();

    for (let i = 0; i <itemDetail.length ; i++) {
        tBody.append(`<tr>
            <th scope="row">${itemDetail[i].code}</th>
            <td>${itemDetail[i].name}</td>
            <td>${itemDetail[i].price}</td>
            <td>${itemDetail[i].quantity}</td>
            <td style="width: 10%"><img class="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
            </tr>`);
        deleteDetail();
        setFeilds();
    };

})

setFeilds();

function setFeilds() {
    $('#itemBody>tr').dblclick(function () {
        itemCode.val($(this).children(':eq(0)').text());
        itemName.val($(this).children(':eq(1)').text());
        itemPrice.val($(this).children(':eq(2)').text());
        itemQuantity.val($(this).children(':eq(3)').text());
    })
}

deleteDetail();

function deleteDetail() {
    let btnDelete = $('.delete');
    btnDelete.on("mouseover", function (){
        $(this).css("cursor", "pointer");}
    )

    btnDelete.click(function () {
        $(this).parents('tr').remove();
    })
}

$('#itemSearch').click(function (){
    let code = $('#txtItemSearch').val();
    let tbody = $('#itemBody');

    for (let i = 0; i < itemDetail.length; i++) {
        if(itemDetail[i].code==code){
            tbody.empty();

            tbody.append(`<tr>
                <th scope="row">${itemDetail[i].code}</th>
                <td>${itemDetail[i].name}</td>
                <td>${itemDetail[i].price}</td>
                <td>${itemDetail[i].quantity}</td>
                <td style="width: 10%"><img class="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                </tr>`);
            deleteDetail();
            setFeilds();
        }
    }
})

