let txtID = $('#txtCusID');


txtID.keyup(function (){
    let idRegEx = /^(C00-)[0-9]{3}$/;
    if(idRegEx.test(txtID.val())){
        txtID.css("border", "1px solid red");
    }
})