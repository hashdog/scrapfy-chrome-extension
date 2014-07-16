$(document).on('ready', function() {
  $('a.btn-create').on('click', function(e) {
    e.preventDefault();

    var lang = $('#lang').val();
    $.post('http://api.scrapfy.io/scraps', {lang: lang}, function(data) {
      chrome.tabs.create({url: data.url});
    });
  });
});
