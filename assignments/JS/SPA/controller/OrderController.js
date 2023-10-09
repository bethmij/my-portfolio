import {customer} from "../model/Customer.js";
import {order} from "../model/Order.js";
import {orderDetails} from "../model/OrderDetail.js";
import {customerDetail, itemDetail, orders, orderDetail} from "../db/DB.js";
import {item} from "../model/Item.js";


setCusID();
setOrderID();

for (let i = 0; i < customerDetail.length; i++) {
    console.log(customerDetail[i].id);
}

export function setCusID() {
    let selectOp = $('#cusID');
    selectOp.empty();
    selectOp.append(`<option class="text-white">Customer ID</option>`);

    for (let i = 0; i < customerDetail.length; i++) {
        selectOp.append(`<option class="text-white">${customerDetail[i].id}</option>`);
    }
}

function setOrderID() {
    let id = order.oid;
    let orderID = $('#orderID');
    let iddd = "OR00-1";
    let num = iddd.split("OR00-");
    let nextID = parseInt(num[1])+1;
    alert(nextID)

    if(id==""){
        orderID.val(`Order ID : OR00-${nextID}`);
    }
}


