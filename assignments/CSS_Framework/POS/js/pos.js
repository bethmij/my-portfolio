

 var itemBtn = document.querySelectorAll(".btnItem");
 itemBtn.forEach(function(element) {

     element.addEventListener("click", function (){
         document.querySelector("#customer").style.display = "none";
         document.querySelector("#order").style.display = "none";
         document.querySelector("#home").style.display = "none";
         var item = document.querySelector("#item");
         item.style.display = "block";
         item.className = element.className.replace("d-none", "d-block");
         item.className = item.className.replace("ms-2", "ms-0");
         item.className = item.className.replace("mb-5", "mb-0");

    });
 });

 var orderBtn = document.querySelectorAll(".btnOrder");
 orderBtn.forEach(function(element2) {

     element2.addEventListener("click", function (){
         document.querySelector("#customer").style.display = "none";
         document.querySelector("#item").style.display = "none";
         document.querySelector("#home").style.display = "none";
         var order = document.querySelector("#order");
         order.style.display = "block";
         order.className = element2.className.replace("d-none", "d-block");
         order.className = order.className.replace("ms-2", "ms-0");
         order.className = order.className.replace("mb-5", "mb-0");

     });
 });

 var customBtn = document.querySelectorAll(".btnCustomer");
 customBtn.forEach(function(element3) {

     element3.addEventListener("click", function (){
         document.querySelector("#item").style.display = "none";
         document.querySelector("#order").style.display = "none";
         document.querySelector("#home").style.display = "none";
         var customer = document.querySelector("#customer");
         customer.style.display = "block";
         customer.className = element3.className.replace("d-none", "d-block");
         customer.className = customer.className.replace("ms-2", "ms-0");
         customer.className = customer.className.replace("mb-5", "mb-0");
     });
 });

 var homeBtn = document.querySelectorAll(".btnHome");
 homeBtn.forEach(function(element4) {

     element4.addEventListener("click", function (){
         document.querySelector("#item").style.display = "none";
         document.querySelector("#order").style.display = "none";
         document.querySelector("#customer").style.display = "none";
         document.querySelector("#home").style.display = "block";
     });
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






