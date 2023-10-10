export var order = {
    oid:"",
    date:"",
    customerID:"",
    orderDetails:[],

    addValue(oid, date, customerID, orderDetails) {
        this.oid = oid;
        this.date = date;
        this.customerID = customerID;
        this.orderDetails = orderDetails;
    }

}