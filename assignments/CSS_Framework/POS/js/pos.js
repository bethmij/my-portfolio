

 var itemBtn = document.querySelectorAll(".btnItem");
 itemBtn.forEach(function(element) {

     element.addEventListener("click", function (){
         document.querySelector("#customer").style.display = "none";
         document.querySelector("#order").style.display = "none";
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
         var order = document.querySelector("#order");
         order.style.display = "block";
         order.className = element2.className.replace("d-none", "d-block");
         order.className = order.className.replace("ms-2", "ms-0");
         order.className = order.className.replace("mb-5", "mb-0");

     });
 });

 var customBtn = document.querySelectorAll(".btnCustomer");
 customBtn.forEach(function(element) {

     element.addEventListener("click", function (){
         document.querySelector("#item").style.display = "none";
         document.querySelector("#order").style.display = "none";
         document.querySelector("#customer").style.display = "block";
     });
 });


