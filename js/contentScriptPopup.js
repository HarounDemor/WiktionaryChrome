jQuery('body').dblclick(function () {
    var word = document.getSelection().toString();
    alert(word);
});


function getSelectedWord() {
    document.getSelection().toString();
}