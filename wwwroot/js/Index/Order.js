function clearTextBoxOrder() {
    $('#form_order_num_order').val("");
    $('#form_date_order').val("");
    $('#form_cust_id_order').val("");
    $('#form_total_rp_order').val("");
}

function CloseModalOrder() {
    $('#btnUpdateOrder').hide();
    $('#btnCreateOrder').show();
}

function CreateOrder() {

    var objOrder = {
        order_num: $('#form_order_num_order').val(),
        date: $('#form_date_order').val(),
        cust_id: $('#form_cust_id_order').val(),
        total_rp: $('#form_total_rp_order').val()
    };

    $.ajax({
        url: "/Home/CreateOrder",
        data: { objOrder: objOrder },
        type: "POST",
        success: function (result) {

            $('#modalOrder').modal('hide');
            location.reload();
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //console.log(errormessage.responseText);
        }
    });
}

function ReadOrder(id) {
    $.ajax({
        url: "/Home/ReadOrder/" + id,
        type: "GET",
        success: function (result) {
            /*var ORDER_NUM = 0;
            var DATE;
            var CUST_ID = "";
            var TOTAL_RP = 0;
            var CUST_NAME = "";*/

            $.each(result.orders, function (index, value) {
                ID = value.id;
                ORDER_NUM = value.order_num;
                DATE = value.date;
                CUST_ID = value.cust_id;
                TOTAL_RP = value.total_rp;
                CUST_NAME = value.cust_name;
            });

            $('#form_id_order').val(ID);
            $('#form_order_num_order').val(ORDER_NUM);
            $('#form_date_order').val(DATE);
            $('#form_cust_id_order').val(CUST_ID);
            $('#form_total_rp_order').val(TOTAL_RP);
            $('#form_cust_name_order').val(CUST_NAME);

            $('#modalOrder').modal('show');
            $('#btnUpdateOrder').show();
            $('#btnCreateOrder').hide();
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //alert(errormessage.responseText);
        }
    });
    return false;
}

function UpdateOrder() {
    var objOrder = {
        id: $('#form_id_order').val(),
        order_num: $('#form_order_num_order').val(),
        date: $('#form_date_order').val(),
        cust_id: $('#form_cust_id_order').val(),
        total_rp: $('#form_total_rp_order').val()
    };

    $.ajax({
        url: "/Home/UpdateOrder",
        data: { objOrder: objOrder },
        type: "POST",
        success: function (result) {

            $('#modalOrder').modal('hide');
            $('#form_id_order').val("");
            $('#form_order_num_order').val("");
            $('#form_date_order').val("");
            $('#form_cust_id_order').val("");
            $('#form_total_rp_order').val("");
            location.reload();
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //console.log(errormessage.responseText);
        }
    });
}

function DeleteOrder(id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/DeleteOrder/" + id,
            type: "POST",
            success: function (result) {

                location.reload();
            },
            error: function (errormessage) {
                alert("Something Went Wrong");
                //alert(errormessage.responseText);
            }
        });
    }
}