$( document ).ready(function() {

    let api_url="http://localhost:8080/api/screen/schedule";

    let last_fetched=[];

    function get_schedule_from_server(api_url){
        $.ajax({
            type: "GET",
            url: api_url,
            dataType: 'json', // json method
            success: function (response) { // If success
                last_fetched=response;
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

    function update_table(responseObj){

    }

    get_schedule_from_server(api_url);
    update_date(last_fetched['currentDate']);
    update_header_title(last_fetched['screenTitle']);
    update_table(last_fetched);

    self.setInterval(function(){get_schedule_from_server(api_url)},1000);
    self.setInterval(function(){update_date(last_fetched['currentDate'])},1000);
    self.setInterval(function(){update_header_title(last_fetched['screenTitle'])},1000);

});
