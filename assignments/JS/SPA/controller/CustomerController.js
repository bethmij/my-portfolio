import {customer} from "../model/Customer.js";
import {detail} from "../db/DB.js";

let cusId = $('#txtCusID');
let cusName = $('#txtCusName');
let cusAddress = $('#txtCusAddress');
let cusSalary = $('#txtCusSalary');


$('#btnSave').click(function (event){

    customer.addValue(cusId.val(), cusName.val(), cusAddress.val(), cusSalary.val());

    detail.push(customer);

    $('#cusTBody').append(
        `<tr>
            <th scope="row">${customer.id}</th>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
            <td style="width: 10%"><img className="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
        </tr>`
    );
    setFeilds();
    event.preventDefault();
})

$('#clear').click(function (event){
    cusId.val("");
    cusName.val("");
    cusAddress.val("");
    cusSalary.val("");
    event.preventDefault();
})

$('#getAll').click(function (){
    let tBody = $('#cusTBody')
    tBody.empty();

    for (let i = 0; i <detail.length ; i++) {
        tBody.append(`<tr>
            <th scope="row">${detail[i].id}</th>
            <td>${detail[i].name}</td>
            <td>${detail[i].address}</td>
            <td>${detail[i].salary}</td>
            <td style="width: 10%"><img className="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
            </tr>`);
        setFeilds();
    };

})

setFeilds();

function setFeilds() {
    $('#cusTBody>tr').dblclick(function () {
        cusId.val($(this).children(':eq(0)').text());
        cusName.val($(this).children(':eq(1)').text());
        cusAddress.val($(this).children(':eq(2)').text());
        cusSalary.val($(this).children(':eq(3)').text());
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

