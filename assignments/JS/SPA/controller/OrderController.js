import {customer} from "../model/Customer.js";
import {order} from "../model/Order.js";
import {orderDetails} from "../model/OrderDetail.js";
import {customerDetail, itemDetail, orders, orderDetail} from "../db/DB.js";
import {item} from "../model/Item.js";
let selectCusOp = $('#cusID');
let selectItemOp = $('#itemCode');
let btnSave = $('#btnAddCart');
let txtItemName = $('#itemName');
let txtItemPrice = $('#itemPrice');
let txtItemQty = $('#itemQuantity');
let txtOrderQty = $('#orderQuantity');
let totalTxt = $('#total-text').text().split("Total : ");
let subTotalTxt = $('#subTotal-text');
let total = totalTxt[1].split(".");
let total1 = parseInt(total[0]);
let cash = $('#cash');
let discount = $('#discount');
let btnOrder = $('#btnPlaceOrder');
let tbRow, tblQty, tblPrice, currOID, orderID;


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
    let orderID = $('#orderID');
    if(orders.length===0){
        orderID.val(`Order ID : OR00-1`);
    }else{
        let id = orders[orders.length-1].oid;
        let num = id.split("OR00-");
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
            txtItemName.val(`Item Name : ${itemDetail[i].name}`);
            txtItemPrice.val(`Item Price : ${itemDetail[i].price}`);
            txtItemQty.val(`Item Quantity : ${itemDetail[i].quantity}`);
        }else if(itemCode == "Item Code" ){
            txtItemName.val(`Item Name : `);
            txtItemPrice.val(`Item Price : `);
            txtItemQty.val(`Item Quantity : `);
            txtOrderQty.val("");
            txtOrderQty.css("border", "1px solid white");
            btnSave.attr("disabled", true);
        }
    }
})



btnSave.click(function (event){
    let itemName = txtItemName.val().split("Item Name : ");
    let itemPrice = txtItemPrice.val().split("Item Price : ");
    if(btnSave.text().includes("Add to Cart")) {
        let itemQty = txtItemQty.val().split("Item Quantity : ");
        let tableCode = $('#orderTbody').children('tr').children(':first-child').text();

        if (parseInt(itemQty[1]) >= parseInt(txtOrderQty.val())) {
            if (tableCode.indexOf(selectItemOp.val()) == -1) {
                $('#orderTbody').append(
                    `<tr>
                        <th scope="row">${selectItemOp.val()}</th>
                        <td>${itemName[1]}</td>
                        <td>${itemPrice[1]}</td>
                        <td>${txtOrderQty.val()}</td>
                        <td style="width: 10%"><img class="orderDelete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                    </tr>`
                );
                setFeilds();
                deleteDetail();
                calcTotal(itemPrice[1], txtOrderQty.val());
            } else {
                alert("duplicate item!");
            }
        } else {
            alert("Stock unavailable!");
        }
    }else if(btnSave.text()=="Update "){
        tbRow.children(':eq(1)').text(itemName[1]);
        tbRow.children(':eq(2)').text(itemPrice[1]);
        tbRow.children(':eq(3)').text(txtOrderQty.val());

        total1 -= (tblPrice*tblQty);
        calcTotal(itemPrice[1], txtOrderQty.val());
        selectItemOp.attr("disabled", false);
        setFeilds();
        deleteDetail();
        clearItemSelect();
    }
    event.preventDefault();
})

deleteDetail();

function deleteDetail() {
    let btnDelete = $('.orderDelete');
    btnDelete.on("mouseover", function (){
        $(this).css("cursor", "pointer")}
    )

    btnDelete.click(function () {
        var userChoice = window.confirm("Do you want to delete the item?");

        if (userChoice) {
            $(this).parents('tr').remove();
            let tablePrice = $(this).parents('tr').children(':nth-child(3)').text();
            let tableQty = $(this).parents('tr').children(':nth-child(4)').text();
            total1 -= (tablePrice*tableQty);
            $('#total-text').text(`Total : ${total1.toFixed(2)}`);
            $('#subTotal-text').text(`Sub Total : ${total1.toFixed(2)}`);
        }
    })
}

function calcTotal(price, qty) {
    let tot = price*qty;
    total1 += tot;
    $('#total-text').text(`Total : ${total1.toFixed(2)}`);
    $('#subTotal-text').text(`Sub Total : ${total1.toFixed(2)}`);
}

cash.change(function (){
    let balance = (parseInt( cash.val()) - total1).toFixed(2);
    $('#balance').val(`Balance : ${balance}`);
})

cash.keyup(function (){
    let balance = (parseInt( cash.val()) - total1).toFixed(2);
    $('#balance').val(`Balance : ${balance}`);
    if(cash.val()==""){
        $('#balance').val(`Balance : 0.00`);
    }
})

discount.change(function (){
    let dis = total1 - ((total1*parseInt(discount.val()))/100).toFixed(2);
    $('#subTotal-text').text(`Sub Total : ${dis}`);
})

discount.keyup(function (){
    let dis = total1 - ((total1*parseInt(discount.val()))/100).toFixed(2);
    $('#subTotal-text').text(`Sub Total : ${dis}`);
    if(discount.val()==""){
        $('#subTotal-text').text(`Sub Total : 0.00`);
    }
})

function setOrderArray(orderID, newOrderDetailArray, oID, currDate) {
    let tableCode = $('#orderTbody').children('tr').children(':nth-child(1)');
    let tablePrice = $('#orderTbody').children('tr').children(':nth-child(3)');
    let tableQty = $('#orderTbody').children('tr').children(':nth-child(4)');

    for (let i = 1; i < tableCode.length; i++) {
        let newOrderDetails = Object.assign({}, orderDetails);
        newOrderDetails.oid = orderID;
        newOrderDetails.code = $(tableCode[i]).text();
        newOrderDetails.unitPrice = parseInt($(tablePrice[i]).text());
        newOrderDetails.qty = parseInt($(tableQty[i]).text());

        newOrderDetailArray.push(newOrderDetails);
    }

    let newOrder = Object.assign({}, order);
    newOrder.oid = oID[1];
    newOrder.date = currDate[1];
    newOrder.customerID = selectCusOp.val();
    newOrder.orderDetails = newOrderDetailArray;

    orders.push(newOrder);
}

btnOrder.click(function (event){
    let tableCode = $('#orderTbody').children('tr').children(':nth-child(1)');
    if($(tableCode[1]).text()!=0) {
        var userChoice = window.confirm("Do you want to continue?");

        if (userChoice) {
            let oID = $('#orderID').val().split("Order ID : ");
            let orderID = oID[1];
            let currDate = $('#currDate').text().split("Date : ");
            let newOrderDetailArray = Object.assign([], orderDetail);

            if (btnOrder.text().includes("Place Order")) {
                if (cash.val() != "") {
                    if (!(parseInt(cash.val()) < total1)) {
                        setOrderArray(orderID, newOrderDetailArray, oID, currDate);
                        clearItemSelect();
                        clearCusDetail();
                        clearTotal();
                        setOrderID();
                        console.log(orders);
                    } else {
                        alert("Insufficient payment amount")
                    }
                } else {
                    alert("Please add ur payment")
                }
            } else if (btnOrder.text().includes("Update Order")) {
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].oid == orderID) {
                        orders.splice(i, 1);
                        setOrderArray(orderID, newOrderDetailArray, oID, currDate);
                        clearItemSelect();
                        clearCusDetail();
                        clearTotal();
                        $('#orderID').val(`Order ID : ${currOID[1]}`);
                        btnOrder.text("");
                        btnOrder.append(`<img src="../../CSS_Framework/POS/assets/Screenshot__550_-removebg-preview.png" alt="Logo" width="25vw" class="opacity-50 me-2">Place Order`);
                        cash.attr("disabled", false);
                        discount.attr("disabled", false);
                        $('#txtOrderSearch').val("");
                        $('#orderSearch').removeClass('btn-outline-danger').addClass('btn-outline-success');
                        $('#orderSearch').text("Search");
                        console.log(orders);
                    }
                }
            }

        }
    }else {
        alert("Add items to your cart");
    }
    event.preventDefault();
})

setFeilds();

function setFeilds() {
    $('#orderTbody>tr').click(function () {
        tbRow = $(this);
        tblQty = $(this).children(':eq(3)').text();
        tblPrice = $(this).children(':eq(2)').text();

        let itemCode = $(this).children(':eq(0)').text();
        txtItemName.val(`Item Name : ${$(this).children(':eq(1)').text()}`);
        txtItemPrice.val(`Item Price : ${tblPrice}`);
        txtOrderQty.val(tblQty);
        selectItemOp.val(itemCode);
        selectItemOp.attr("disabled", true);

        for (let i = 0; i <itemDetail.length ; i++) {
            if(itemDetail[i].code==itemCode){
                txtItemQty.val(`Item Quantity : ${itemDetail[i].quantity}`);
            }
        }
        setFeilds();
        btnSave.text("Update ");
        btnSave.attr("disabled", false);
    })
}

$('#orderClear').click(function (event){
    clearItemSelect();
    event.preventDefault();
})

function clearItemSelect(){
    selectItemOp.val("Item Code");
    txtItemName.val(`Item Name : `);
    txtItemPrice.val(`Item Price : `);
    txtItemQty.val(`Item Quantity : `);
    txtOrderQty.val("");
    txtOrderQty.css("border", "1px solid white");
    btnSave.text("");
    btnSave.append(`<img src="../../CSS_Framework/POS/assets/Screenshot__543_-removebg-preview.png" alt="Logo" width="25vw" class="opacity-50 me-3">Add to Cart`);
    btnSave.attr("disabled", true);
}

function clearCusDetail(){
    selectCusOp.val("Customer ID");
    $('#cusName').val(`Customer Name : `);
    $('#cusAddress').val(`Customer Address : `);
    $('#cusSalary').val(`Customer Salary : `);
}

function clearTotal(){
    $('#total-text').text("Total : 00.00");
    $('#subTotal-text').text("Sub Total : 00.00");
    $('#cash').val("");
    $('#discount').val("");
    $('#balance').val("");
    $('#orderTbody').empty();
    $('#orderTbody').append(`<tr >
        <th scope="col">Code</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Order Qty</th>
        <th scope="col"></th>
    </tr>`);
    total1 = parseInt(total[0]);
}

$('#orderSearch').click(function (){
    let search = $('#orderSearch');
    if (search.text().includes("Search")) {

        let id = $('#txtOrderSearch').val();
        let count = 0;
        let tbody = $('#orderTbody');

        if (id.length != 0) {
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].oid == id) {
                    orderID = orders[i].oid;
                    currOID = $('#orderID').val().split("Order ID : ");
                    $('#orderID').val("Order ID : " + orders[i].oid);
                    count++;
                    search.removeClass('btn-outline-success').addClass('btn-outline-danger');
                    search.text("Clear Search");
                    total1 = 0;
                    cash.attr("disabled", true);
                    discount.attr("disabled", true);
                    if (orders[i].customerID == customerDetail[i].id) {
                        selectCusOp.val(customerDetail[i].id);
                        $('#cusName').val(`Customer Name : ${customerDetail[i].name}`);
                        $('#cusAddress').val(`Customer Address : ${customerDetail[i].address}`);
                        $('#cusSalary').val(`Customer Salary : ${customerDetail[i].salary}`);
                    }

                    tbody.empty();
                    tbody.append(`<tr >
                                    <th scope="col">Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Order Qty</th>
                                    <th scope="col"></th>
                             </tr> `);

                    for (let j = 0; j < orders[i].orderDetails.length; j++) {
                        if (orders[i].orderDetails[j].code == itemDetail[j].code) {

                            tbody.append(
                                `<tr>
                        <th scope="row">${orders[i].orderDetails[j].code}</th>
                        <td>${itemDetail[j].name}</td>
                        <td>${orders[i].orderDetails[j].unitPrice}</td>
                        <td>${orders[i].orderDetails[j].qty}</td>                        
                        <td style="width: 10%"><img class="orderDelete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                    </tr>`
                            );
                            setFeilds();
                            deleteDetail();
                            calcTotal(orders[i].orderDetails[j].unitPrice, orders[i].orderDetails[j].qty);
                            btnOrder.text("");
                            btnOrder.append(`<img src="../../CSS_Framework/POS/assets/Screenshot__550_-removebg-preview.png" alt="Logo" width="25vw" class="opacity-50 me-2">Update Order`);
                        }
                    }
                }
            }
            if (count != 1) {
                alert("No such Order..please check the order ID");
            }
        } else {
            alert("Please enter the order ID");
        }
    }
    if (search.text().includes("Clear Search")) {
        alert("huuuu");
        // clearItemSelect();
        // clearCusDetail();
        // clearTotal();
        // $('#orderID').val(`Order ID : ${currOID[1]}`);
        // btnOrder.text("");
        // btnOrder.append(`<img src="../../CSS_Framework/POS/assets/Screenshot__550_-removebg-preview.png" alt="Logo" width="25vw" class="opacity-50 me-2">Place Order`);
        // cash.attr("disabled", false);
        // discount.attr("disabled", false);
        // $('#txtOrderSearch').val("");
        // $('#orderSearch').removeClass('btn-outline-danger').addClass('btn-outline-success');
        // $('#orderSearch').text("Search");

    }
})


