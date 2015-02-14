function getWikiQuery(word, queryType, count, lang, resultCallback) {
    var url = 'http://www.igrec.ca/project-files/wikparser/wikparser.php?word=' + word + '&query=' + queryType + '&lang=' + lang;

    if (count !== -1) {
        url += '&count=' + count;
    }

    $.get(url, function (data) {
        resultCallback(data);
    });
}