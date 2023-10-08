let Detail = [];
let cusId = $('#txtCusID');
let cusName = $('#txtCusName');
let cusAddress = $('#txtCusAddress');
let cusSalary = $('#txtCusSalary');


$('#btnSave').click(function (event){

    customer = {
        id: cusId.val(),
        name: cusName.val(),
        address: cusAddress.val(),
        salary: cusSalary.val()
    }

    Detail.push(customer);

    $('#cusTBody').append(
        `<tr>
            <th scope="row">${customer.id}</th>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
            <td style="width: 10%"><img className="delete" src="../../CSS_Framework/POS/assets/icons8-delete-96.png" alt="Logo" width="50%" className="opacity-75"></td>
        </tr>`
    );
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
    
})