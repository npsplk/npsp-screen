$(document).ready(function () {

    const switching_time = 1000; //time in seconds
    let api_url = "http://localhost:8080/api/screen/schedule";

    let last_fetched = [];

    function get_schedule_from_server(api_url) {
        $.ajax({
            type: "GET",
            url: api_url,
            dataType: 'json', // json method
            success: function (response) { // If success
                last_fetched = response;
            },
            error: function (response) { // If success
                console.log('error loading at ', new Date($.now()));
            }
        });
    }

    function update_date(currentDate) {
        $('.header-clock').html(currentDate);
    }

    function update_header_title(headerTitle) {
        $('.header-title').html(headerTitle);
    }

    function update_table(screenRows) {
        clear_data_fields();

        for (let i = 0; i < screenRows.length; i++) {
            screenRow = screenRows[i];

            let row = $('#row-' + (i + 1));

            row.removeClass();
            row.addClass(screenRow['status']);

            $('.time-' + (i + 1)).html(screenRow['time']);
            $('.destination-' + (i + 1)).html(screenRow['destination']);
            $('.route-' + (i + 1)).html(screenRow['route']);
            $('.remarks-' + (i + 1)).html(screenRow['remarks']);
            $('.status-' + (i + 1)).html(screenRow['status']);
        }

    }

    function clear_data_fields() {
        $('.data-field').html("");
    }

    get_schedule_from_server(api_url);
    update_date(last_fetched['currentDate']);
    update_header_title(last_fetched['screenTitle']);
    update_table(last_fetched);

    self.setInterval(function () {
        get_schedule_from_server(api_url)
    }, switching_time);
    self.setInterval(function () {
        update_date(last_fetched['currentDate'])
    }, switching_time);
    self.setInterval(function () {
        update_header_title(last_fetched['screenTitle'])
    }, switching_time);
    self.setInterval(function () {
        update_table(last_fetched['screenRows'])
    }, switching_time);

});
