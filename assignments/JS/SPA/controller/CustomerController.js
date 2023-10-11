import {customer} from "../model/Customer.js";
import {customerDetail, itemDetail} from "../db/DB.js";
import {setCusID} from "./OrderController.js";

let cusId = $('#txtCusID');
let cusName = $('#txtCusName');
let cusAddress = $('#txtCusAddress');
let cusSalary = $('#txtCusSalary');
let btnCustomerSave = $('#btnSave');

$(document).on('keydown', function(event) {
    if (event.keyCode === 9) {
        event.preventDefault();
    }
});

btnCustomerSave.click(function (event){

    if(btnCustomerSave.text()=="Save ") {
        let count = 0;
        var userChoice = window.confirm("Do you want to save the customer?");

        if (userChoice) {
            for (let i = 0; i < customerDetail.length; i++) {
                if(customerDetail[i].id!=cusId.val()) {
                    count++;
                }
            }
            if(count==customerDetail.length) {
                customer.addValue(cusId.val(), cusName.val(), cusAddress.val(), cusSalary.val());
                customerDetail.push(customer);

                $('#cusTBody').append(
                    `<tr>
                        <th scope="row">${customer.id}</th>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.salary}</td>
                        <td style="width: 10%"><img class="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                    </tr>`
                );
                deleteDetail();
                setFeilds();
                clearAll(event);
                setCusID();
                btnCustomerSave.attr("disabled", true);
            }else {
                alert("Duplicate customer ID!");
            }
        }
    }else if(btnCustomerSave.text()=="Update ") {
        for (let i = 0; i < customerDetail.length; i++) {

            if(customerDetail[i].id == $('#txtCusID').val()){
                customerDetail[i].name = $('#txtCusName').val();
                customerDetail[i].address = $('#txtCusAddress').val();
                customerDetail[i].salary = $('#txtCusSalary').val();
                getAll();
                clearAll(event);
                btnCustomerSave.text("Save ");
                btnCustomerSave.attr("disabled", true);
                cusId.val($(this).children(':eq(0)').text()).attr("disabled", false);
            }
        }
    }
    event.preventDefault();
})

$('#clear').click(function (event){
    clearAll(event);
})

function clearAll(event) {
    cusId.val("");
    cusName.val("");
    cusAddress.val("");
    cusSalary.val("");
    $('#txtCusID').css("border","1px solid white");
    $('#cusIDPara').text("");
    $('#txtCusName').css("border","1px solid white");;
    $('#cusNamePara').text("");
    $('#txtCusAddress').css("border","1px solid white");;
    $('#cusAddressPara').text("");
    $('#txtCusSalary').css("border","1px solid white");;
    $('#cusSalaryPara').text("");
    btnCustomerSave.text("Save ");
    btnCustomerSave.attr("disabled", true);
    event.preventDefault();
}



$('#getAll').click(function (){
    getAll();

})

function getAll() {
    let tBody = $('#cusTBody')
    tBody.empty();

    for (let i = 0; i < customerDetail.length; i++) {
        tBody.append(`<tr>
            <th scope="row">${customerDetail[i].id}</th>
            <td>${customerDetail[i].name}</td>
            <td>${customerDetail[i].address}</td>
            <td>${customerDetail[i].salary}</td>
            <td style="width: 10%"><img class="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
            </tr>`);
        deleteDetail();
        setFeilds();
    }
    ;
}

setFeilds();

function setFeilds() {
    $('#cusTBody>tr').click(function () {
        cusId.val($(this).children(':eq(0)').text());
        cusName.val($(this).children(':eq(1)').text());
        cusAddress.val($(this).children(':eq(2)').text());
        cusSalary.val($(this).children(':eq(3)').text());
        btnCustomerSave.text("Update ");
        btnCustomerSave.attr("disabled", false);
        cusId.val($(this).children(':eq(0)').text()).attr("disabled", true);
    })
}

deleteDetail();

function deleteDetail() {
    let btnDelete = $('.delete');
    btnDelete.on("mouseover", function (){
        $(this).css("cursor", "pointer");}
    )

    btnDelete.click(function () {
        var userChoice = window.confirm("Do you want to delete the customer?");

        if (userChoice) {
            $(this).parents('tr').remove();
        }
    })
}

$('#btnSearch').click(function (){
    let id = $('#txtSearch').val();
    let tbody = $('#cusTBody');
    let count = 0;

    if(id.length!=0) {
        for (let i = 0; i < customerDetail.length; i++) {
            if (customerDetail[i].id == id) {
                count++;
                tbody.empty();

                tbody.append(`<tr>
                <th scope="row">${customerDetail[i].id}</th>
                <td>${customerDetail[i].name}</td>
                <td>${customerDetail[i].address}</td>
                <td>${customerDetail[i].salary}</td>
                <td style="width: 10%"><img class="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
                </tr>`);
                deleteDetail();
                setFeilds();
            }
        }
        if (count != 1) {
            alert("No such Customer..please check the ID");
        }
    }else {
        alert("Please enter the ID");
    }
})

