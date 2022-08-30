$(document).ready(function () {
    loadTableOrder();
    loadTableCustomer();
    loadSelectList();
});

//Membuat Format Date Dapat Dibaca
function dateToYMD(date) {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}

//Menampilkan Tabel Order
function loadTableOrder() {
    $.ajax({
        url: "/Home/GetOrderList/",
        type: "GET",
        success: function (result) {
            var html = '';
            $.each(result, function (index, value) {
                html += '<tr>';
                html += '<td>' + value.order_num + '</td>';
                html += '<td>' + dateToYMD(new Date(value.date)) + '</td>';
                html += '<td>' + value.cust_name + '</td>';
                html += '<td>' + value.total_rp + '</td>';
                html += '<td><button class="btn btn-primary" onclick="return ReadOrder(' + value.order_num + ')">Edit</button> | <button class="btn btn-danger" onclick="DeleteOrder(' + value.order_num + ')">Delete</button></td>';
                html += '</tr>';
            });
            $('#ajaxTable').append(html);
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //alert(errormessage.responseText);
        }
    });
}

//Menampilkan Tabel Customer
function loadTableCustomer() {
    $.ajax({
        url: "/Home/GetCustomerList/",
        type: "GET",
        success: function (result) {
            var html = '';
            $.each(result, function (index, value) {
                html += '<tr>';
                html += '<td>' + value.id + '</td>';
                html += '<td>' + value.cust_id + '</td>';
                html += '<td>' + value.cust_name + '</td>';
                html += '<td><button class="btn btn-primary" onclick="return ReadCustomer(' + value.id + ')">Edit</button> | <button class="btn btn-danger" onclick="DeleteCustomer(' + value.id + ')">Delete</button></td>';
                html += '</tr>';
            });
            $('#ajaxTable2').append(html);
        },
        error: function (errormessage) {
            alert("Something Went Wrong");
            //alert(errormessage.responseText);
        }
    });
}

//Menampilkan Select List dari cust_name dan cust_id pada tambah dan edit data
function loadSelectList() {
    $.get('/home/GetCustomerList/',
        function (result) {
            $.each(result,
                function(index, value) {
                    $('<option>').val(value.cust_id).text(value.cust_name).appendTo("#form_cust_id_order");
                }
            );
        }
    );
}