jQuery(document).ready(function () {
    jQuery('#button').click(function () {
        requestApi();
    });

    // On Enter keyboard pressed
    jQuery(document).keypress(function (e) {
        if (e.which == 13) {
            requestApi();
        }
    })
});


function requestApi() {
    setPreloaderState(true);
    emptyAllSections();
    var word = $('#wordInput').val();
    requestApiByLanguage(word, "en");
}

function requestApiByLanguage(word, lang) {
    $('#word').text(word);

    getWikiQuery(word, "def", 5, lang, function (data) {
        if (!wordExists(data)) {
            emptyAllSections();
            if (lang == "fr") {
                printWordNotFoundMsg(word);
                setPreloaderState(false);
            } else {
                requestApiByLanguage(word, "fr");
            }
            return;
        }

        printDefinitions(data);

        getWikiQuery(word, "pos", 1, lang, function (data) {
            printNature(data);
        });

        getWikiQuery(word, "syn", -1, lang, function (data) {
            printSynonymsAndHypernyms(data, $('#synonyms'));
        });

        getWikiQuery(word, "hyper", -1, lang, function (data) {
            printSynonymsAndHypernyms(data, $('#hypernyms'));
            setPreloaderState(false);
        });
    });
}

function printSynonymsAndHypernyms(data, container) {
    var array = data.split('|');
    var result = '';
    $.each(array, function (i, v) {
        result += v + ', ';
    });
    $('.sectionTitle').show();
    container.text(result);
}

function printNature(data) {
    $('#nature').text(data);
}

function printDefinitions(data) {
    var definitions = data.split('|');
    var oList = $('<ol/>');
    $.each(definitions, function (i, v) {
        oList.append($('<li/>', {
            text: v
        }));
    });
    $('#definitions').append(oList);
}

function wordExists(data) {
    if (data.indexOf('No such word for specified language') > -1 || data.indexOf('The Wiktionary API did not return a page for that word') > -1)
        return false;
    return true;
}

function emptyAllSections() {
    $('#word').text('');
    $('#nature').text('');
    $('#definitions').html('');
    $('#synonyms').text('');
    $('#hypernyms').text('');
    $('#wordNotFound').text('');
    $('.sectionTitle').hide();
}

function printWordNotFoundMsg(word) {
    $('#wordNotFound').html('<b>' + word + '</b> was not found in the current languages');
}

function setPreloaderState(active) {
    if (active == true) {
        $('#preloader').show();
        $('#main').hide();
    } else {
        $('#preloader').hide();
        $('#main').show();
    }
}