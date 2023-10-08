
initiateUI();

function initiateUI() {
    clearAll();
    $("#home").css("display", "block");
    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "dashboardContent":
            localStorage.setItem("view", "HOME");
            break;
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "orderContent":
            localStorage.setItem("view", "ORDER");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#home"));
            break;
        case "ITEM":
            setView($("#item"));
            break;
        case "CUSTOMER":
            setView($("#customer"));
            break;
        case "ORDER":
            setView($("#order"));
            break;
        default:
            setView($("#home"));
    }
}

function clearAll() {
    $("#home,#customer,#item,#order").css('display', 'none');
}


function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

//bind events
$(".btnHome").click(function () {
    setView($("#home"));
});

$(".btnCustomer").click(function () {
    setView($("#customer"));
});

$(".btnItem").click(function () {
    setView($("#item"));
});

$(".btnOrder").click(function () {
    setView($("#order"));
});

var img =  document.querySelectorAll(".menuImg");
img.forEach(function(element5) {
    element5.addEventListener("mouseover",function (){
        element5.style.opacity = "1";
        element5.style.cursor = "pointer";
    });
    element5.addEventListener("mouseout",function (){
        element5.style.opacity = "0.7";
        element5.style.cursor = "unset";
    });
});

var btn =  document.querySelectorAll(".menuBtn");
btn.forEach(function(element) {
    element.addEventListener("mouseover",function (){
        element.style.cursor = "pointer";
        element.style.opacity = "1";
    });
    element.addEventListener("mouseout",function (){
        element.style.cursor = "unset";
        element.style.opacity = "0.5";
    });
});

window.addEventListener("load", function(event) {
    event.preventDefault();
    var savedScrollPosition = localStorage.getItem("scrollPosition");

    if (savedScrollPosition !== null) {
        window.scrollTo(0, savedScrollPosition);
    }
});