import {customer} from "../model/Customer.js";
import {order} from "../model/Order.js";
import {orderDetails} from "../model/OrderDetail.js";
import {customerDetail, itemDetail, orders, orderDetail} from "../db/DB.js";
import {item} from "../model/Item.js";
let selectCusOp = $('#cusID');
let selectItemOp = $('#itemCode');
let btnSave = $('#btnAddCart');

setCusID();
setOrderID();
setItemCode();

for (let i = 0; i < customerDetail.length; i++) {
    console.log(customerDetail[i].id);
}

export function setCusID() {
    selectCusOp.empty();
    selectCusOp.append(`<option class="text-white">Customer ID</option>`);

    for (let i = 0; i < customerDetail.length; i++) {
        selectCusOp.append(`<option class="text-white">${customerDetail[i].id}</option>`);
    }
}

function setOrderID() {
    let id = order.oid;
    let orderID = $('#orderID');

    if(id==""){
        orderID.val(`Order ID : OR00-1`);
    }else {
        let num = iddd.split("OR00-");
        let nextID = parseInt(num[1])+1;
        orderID.val(`Order ID : OR00-${nextID}`);
    }
}

selectCusOp.change(function () {
    let cusID = selectCusOp.val();
    for (let i = 0; i < customerDetail.length; i++) {
        if (customerDetail[i].id == cusID) {
            $('#cusName').val(`Customer Name : ${customerDetail[i].name}`);
            $('#cusAddress').val(`Customer Address : ${customerDetail[i].address}`);
            $('#cusSalary').val(`Customer Salary : ${customerDetail[i].salary}`);
        }else if(cusID == "Customer ID" ){
            $('#cusName').val(`Customer Name : `);
            $('#cusAddress').val(`Customer Address : `);
            $('#cusSalary').val(`Customer Salary : `);
            btnSave.attr("disabled", true);
        }
    }
})

export function setItemCode() {
    selectItemOp.empty();
    selectItemOp.append(`<option class="text-white">Item Code</option>`);

    for (let i = 0; i < itemDetail.length; i++) {
        selectItemOp.append(`<option class="text-white">${itemDetail[i].code}</option>`);
    }
}

selectItemOp.change(function () {
    let itemCode = selectItemOp.val();
    for (let i = 0; i < itemDetail.length; i++) {
        if (itemDetail[i].code == itemCode) {
            $('#itemName').val(`Item Name : ${itemDetail[i].name}`);
            $('#itemPrice').val(`Item Price : ${itemDetail[i].price}`);
            $('#itemQuantity').val(`Item Quantity : ${itemDetail[i].quantity}`);
        }else if(itemCode == "Item Code" ){
            $('#itemName').val(`Item Name : `);
            $('#itemPrice').val(`Item Price : `);
            $('#itemQuantity').val(`Item Quantity : `);
            btnSave.attr("disabled", true);
        }
    }
})

btnSave.click(function (){
    $('#orderTbody').append(
        `<tr>
             <th scope="row">${item.code}</th>
             <td>${item.name}</td>
             <td>${item.price}</td>
             <td>${item.quantity}</td>
             <td style="width: 10%"><img class="itemDelete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
        </tr>`
    );
})

