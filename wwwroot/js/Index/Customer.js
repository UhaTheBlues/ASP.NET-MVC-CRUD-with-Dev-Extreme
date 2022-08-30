function clearTextBoxCustomer() {
    $('#form_id_customer').val("");
    $('#form_cust_id_customer').val("");
    $('#form_cust_name_customer').val("");
}

function CloseModalCustomer() {
    $('#btnUpdateCustomer').hide();
    $('#btnCreateCustomer').show();
}

function CreateCustomer() {
    var objCustomer = {
        id: $('#form_id_customer').val(),
        cust_id: $('#form_cust_id_customer').val(),
        cust_name: $('#form_cust_name_customer').val()
    };

    $.ajax({
        url: "/Home/CreateCustomer/",
        data: { objCustomer: objCustomer },
        type: "POST",
        success: function (result) {

            $('#modalCustomer').modal('hide');
            location.reload();
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //console.log(errormessage.responseText);
        }
    });
}

function ReadCustomer(id) {
    $.ajax({
        url: "/Home/ReadCustomer/" + id,
        type: "GET",
        success: function (result) {
            var ID = 0;
            var CUST_ID = "";
            var CUST_NAME = "";

            $.each(result.customers, function (index, value) {
                ID = value.id;
                CUST_ID = value.cust_id;
                CUST_NAME = value.cust_name;
            });

            $('#form_id_customer').val(ID);
            $('#form_cust_id_customer').val(CUST_ID);
            $('#form_cust_name_customer').val(CUST_NAME);

            $('#modalCustomer').modal('show');
            $('#btnUpdateCustomer').show();
            $('#btnCreateCustomer').hide();
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //alert(errormessage.responseText);
        }
    });
    return false;
}

function UpdateCustomer() {
    var objCustomer = {
        id: $('#form_id_customer').val(),
        cust_id: $('#form_cust_id_customer').val(),
        cust_name: $('#form_cust_name_customer').val()
    };

    $.ajax({
        url: "/Home/UpdateCustomer",
        data: { objCustomer: objCustomer },
        type: "POST",
        success: function (result) {
            $('#modalCustomer').modal('hide');
            $('#form_id_customer').val("");
            $('#form_cust_id_customer').val("");
            $('#form_cust_name_customer').val("");
            location.reload();
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //console.log(errormessage.responseText);
        }
    });
}

function DeleteCustomer(id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/DeleteCustomer/" + id,
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