$(() => {
    $("#dataGridCustomer").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            loadMode: "raw", // omit in the DataGrid, TreeList, PivotGrid, and Scheduler
            load: function () {
                return $.getJSON("/Home/GetCustomerList").fail(function () { throw "Data loading error" });
            },
            insert: function (values) {
                var deferred = $.Deferred();
                $.ajax({
                    url: "/Home/CreateCustomer/",
                    method: "POST",
                    data: values
                })
                    .done(deferred.resolve)
                    .fail(function (e) {
                        deferred.reject("Insertion failed");
                    });
                return deferred.promise();
            },
            update: function (id, values) {
                var deferred = $.Deferred();
                $.ajax({
                    url: "/Home/UpdateCustomer/" + id,
                    method: "POST",
                    data: values
                })
                    .done(deferred.resolve)
                    .fail(function (e) {
                        deferred.reject("Update failed");
                    });
                return deferred.promise();
            },
            remove: function (id) {
                var deferred = $.Deferred();
                $.ajax({
                    url: "/Home/DeleteCustomer/" + id,
                    method: "POST"
                })
                    .done(deferred.resolve)
                    .fail(function (e) {
                        deferred.reject("Deletion failed");
                    });
                return deferred.promise();
            },

        }),
        columns: [
            {
                dataField: 'id',
                caption: 'ID',
                allowEditing: false
            },
            {
                dataField: 'cust_id',
                caption: 'Customer ID',
                allowEditing: false
            },
            {
                dataField: 'cust_name',
                caption: 'Customer Name'
            }
        ],
        remoteOperations: true,
        editing: {
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
        },
        /*filterRow: {
            visible: true,
        },
        headerFilter: {
            visible: true,
        },
        groupPanel: {
            visible: true,
        },*/
        scrolling: {
            mode: 'virtual',
        },
        height: 600,
        showBorders: true,
    });
});