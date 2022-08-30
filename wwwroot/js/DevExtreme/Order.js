$(() => {
    /*const url = 'https://localhost:44376/Home';
        const custList = 
            DevExpress.data.AspNet.createStore({
            key: 'cust_id',
            loadUrl: `${url}/GetCustomerList`,
            onBeforeSend(method, ajaxOptions) {
                    ajaxOptions.xhrFields = { withCredentials: true };
                },
            });*/

    const custList =
        new DevExpress.data.CustomStore({
            key: "cust_id",
            loadMode: "raw",
            load: function () {
                return $.getJSON("/Home/GetCustomerList").fail(function () { throw "Data loading error" });
            },
        });
    
    const dataGrid = $("#dataGridOrder").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            loadMode: "raw",
            load: function () {
                return $.getJSON("/Home/GetOrderList").fail(function () { throw "Data loading error" });
            },
            insert: function (values) {
                var deferred = $.Deferred();
                $.ajax({
                    url: "/Home/CreateOrder/",
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
                console.log(values);
                $.ajax({
                    url: "/Home/UpdateOrder/" + id,
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
                    url: "/Home/DeleteOrder/" + id,
                    method: "POST"
                })
                    .done(deferred.resolve)
                    .fail(function (e) {
                        deferred.reject("Deletion failed");
                    });
                return deferred.promise();
            },

        }),

        editing: {
            mode: 'batch',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            selectTextOnEditStart: true,
            startEditAction: 'click',
        },
        toolbar: {
            items: [
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'add',
                        onClick() {
                            dataGrid.addRow();
                        },
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'save',
                        onClick() {
                            dataGrid.saveEditData();
                        },
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'revert',
                        onClick() {
                            dataGrid.cancelEditData();
                        },
                    },
                },

            ],
        },
        columns: [
            /*{
                dataField: 'id',
                caption: 'ID',
                allowEditing: false
            },
            {
                dataField: 'order_num',
                caption: 'Order Number',
                allowEditing: false
            },*/
            {
                dataField: 'date',
                dataType: 'date',
                caption: 'Order Date',
                format: 'dd-MM-yyyy',
                allowSearch: true
            },
            {
                dataField: 'cust_id',
                caption: 'Customer Name',
                /*calculateDisplayValue: 'cust_name',
                width: 150,
                allowSorting: false,*/
                lookup: {
                    //dataSource: 'Home/GetCustomerList',
                    dataSource: custList,
                    valueExpr: 'cust_id',
                    displayExpr: 'cust_name',
                },
                validationRules: [{ type: "required" }],
                editCellTemplate: dropDownBoxEditorTemplate,
            },
            {
                dataField: 'total_rp',
                caption: 'Total RP',
                format: '#,##0.00',
            },
            {
                dataField: 'pajak',
                caption: 'Pajak',
                format: '#,##0.00',
                allowEditing: false,
                calculateCellValue(data) {
                    return data.total_rp * 11 / 100;
                },
            },
            {
                dataField: 'hasil',
                caption: 'Total RP Setelah Pajak',
                format: '#,##0.00',
                allowEditing: false,
                calculateCellValue(data) {
                    return data.total_rp + (data.total_rp * 11 / 100);
                },
            },
            /*{
                caption: 'Action',
                width: 80,
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $('<a/>')
                        .addClass('dx-link')
                        .addClass('dx-icon-trash')
                        .text('')
                        .on('dxclick', function (e) {
                            //Do something with options.data;  
                            console.log(e);
                            //dataGrid.deleteRow(rowIndex);
                        })
                        .appendTo(container);
                }
            },  */
        ],
        summary: {
            totalItems: [
                /*{
                    column: 'order_num',
                    summaryType: 'count',
                },*/
                {
                    column: 'total_rp',
                    summaryType: 'sum',
                    valueFormat: '#,##0.00',
                    displayFormat: "{0}"
                    /*customizeText(data) {
                        return `${data.value}`;
                    },*/
                },
                {
                    column: 'pajak',
                    summaryType: 'sum',
                    valueFormat: '#,##0.00',
                    displayFormat: "{0}"
                    /*customizeText(data) {
                        return `${data.value}`;
                    },*/
                },
                {
                    column: 'hasil',
                    summaryType: 'sum',
                    valueFormat: '#,##0.00',
                    displayFormat: "{0}"
                    /*customizeText(data) {
                        return `${data.value}`;
                    },*/
                },
            ],
        },
        /* paging: {
             enabled: false
         },
         filterRow: {
             visible: true,
         },
         groupPanel: {
             visible: true,
         },
         headerFilter: {
             visible: true,
         },
         searchPanel: { 
             visible: true, 
         },*/
        scrolling: {
            mode: 'virtual',
        },
        height: 600,
        showBorders: true,
        onEditingStart(e) {
            console.log(e);
        },
        onRowUpdating(e) {
            //console.log(e);

            //Untuk Menyatukan Object Lama dengan Object Baru
            e.newData = Object.assign(e.oldData, e.newData);
        },
        onEditorPreparing(e) {
            //console.log(e);

            //Membuat inputan date minimal tanggal hari ini
            if (e.dataField === "date") {
                e.editorOptions.min = new Date(); // Set Today's date as the minimum date
            }
        },
    }).dxDataGrid('instance');

    function dropDownBoxEditorTemplate(cellElement, cellInfo) {
        return $('<div>').dxDropDownBox({
            dropDownOptions: { width: 500 },
            dataSource: custList,
            value: cellInfo.value,
            valueExpr: 'cust_id',
            displayExpr: 'cust_name',
            contentTemplate(e) {
                return $('<div>').dxDataGrid({
                    dataSource: custList,
                    remoteOperations: true,
                    columns: ['cust_id', 'cust_name'],
                    hoverStateEnabled: true,
                    scrolling: { mode: 'virtual' },
                    height: 250,
                    selection: { mode: 'single' },
                    selectedRowKeys: [cellInfo.value],
                    focusedRowEnabled: true,
                    focusedRowKey: cellInfo.value,
                    onSelectionChanged(selectionChangedArgs) {
                        e.component.option('value', selectionChangedArgs.selectedRowKeys[0]);
                        cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);
                        if (selectionChangedArgs.selectedRowKeys.length > 0) {
                            e.component.close();
                        }
                    },
                });
            },
        });
    };

    var startdate;
    var enddate;

    const datebox1 = $("#dateBox1").dxDateBox({
        type: 'date',
        width: 140,
        displayFormat: 'dd-MM-yyyy',
        onValueChanged(data) {
            startdate = data.value;
            /*console.log(data);
            dataGrid.filter(['date', '>=', data.value]);
            dataGrid.filter([
               ["date", ">=", startdate],
               "and",
               ["date", "<=", enddate]
            ]);*/
        },
    }).dxDateBox("instance");

    const datebox2 = $('#dateBox2').dxDateBox({
        type: 'date',
        width: 140,
        displayFormat: 'dd-MM-yyyy',
        onValueChanged(data) {
            enddate = data.value;
            /*console.log(data);
            dataGrid.filter([
                    ["date", ">=", startdate],
                    "and",
                    ["date", "<=", enddate]
            ]);*/
        },
    }).dxDateBox("instance");

    $('#filtersearch').dxButton({
        icon: 'search',
        text: 'Search',
        stylingMode: 'contained',
        type: 'default',
        width: 110,
        onClick() {
            if (startdate && enddate != null) {
                dataGrid.filter([
                    ["date", ">=", startdate],
                    "and",
                    ["date", "<=", enddate]
                ]);
            } else {
                alert("Harap masukan tanggal pencarian !!!");
            }
        },
    });

    $('#filterclear').dxButton({
        icon: 'remove',
        text: 'Clear',
        stylingMode: 'contained',
        type: 'danger',
        width: 110,
        onClick(e) {
            dataGrid.clearFilter();
            datebox1.reset();
            datebox2.reset();
        },
    });
});