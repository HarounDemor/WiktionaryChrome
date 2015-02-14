jQuery(document).ready(function () {
    jQuery('#button').click(function () {
        requestAPI();
    });

    jQuery(document).keypress(function (e) {
        if (e.which == 13) {
            requestAPI();
        }
    })
});


function requestAPI() {
    var word = $('#wordInput').val();
    $('#word').text('');
    $('#word').text(word);

    getWikiQuery(word, "def", 5, "en", function (data) {
        var definitions = data.split('|');
        var oList = $('<ol/>');
        $.each(definitions, function (i, v) {
            oList.append($('<li/>', {
                text: v
            }));
        });
        $('#definitions').html('');
        $('#definitions').append(oList);
    });

    getWikiQuery(word, "pos", 1, "en", function (data) {
        $('#nature').text('');
        $('#nature').text(data);
    });

    getWikiQuery(word, "syn", -1, "en", function (data) {
        printSynonymsAndHypernyms(data, $('#synonyms'));
    });

    getWikiQuery(word, "hyper", -1, "en", function (data) {
        printSynonymsAndHypernyms(data, $('#hypernyms'));
    });
}

function printSynonymsAndHypernyms(data, container) {
    var array = data.split('|');
    var result = '';
    $.each(array, function (i, v) {
        result += v + ', ';
    });
    $('.sectionTitle').show();
    container.text('');
    container.text(result);
}