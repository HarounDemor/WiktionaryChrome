jQuery(document).ready(function () {
    jQuery('#button').click(function () {
        var word = $('#wordInput').val();


        getWikiQuery(word, "def", -1, "en", function (data) {
            $('#word').text(word);

            var definitions = data.split('|');
            var oList = $('<ol/>');
            $.each(definitions, function (i, v) {
                oList.append($('<li/>', {
                    text: v
                }));
            });
            $('#definitions').append(oList);
        });

        getWikiQuery(word, "pos", 1, "en", function (data) {
            $('#nature').text(data);
        });
    });
});


function printDefResult(data) {}