$(document).on('ready', function() {
  $('#create-btn').on('click', function(e) {
    e.preventDefault();

    $('#loading-text').show();
    $('#create-text').hide();

    var lang = $('#lang-selector').val();
    $.post('http://api.scrapfy.io/scraps', {lang: lang}, function(data) {
      chrome.tabs.create({url: data.url});
    });
  });
});
