$(function() {

    var count = 0;
    
    $('#count-up').on('click', function () {
        count++;
        $('#count-display').text(count);
    });
    
    $('#count-down').on('click', function () {
        count--;
        $('#count-display').text(count);
    });
    
});