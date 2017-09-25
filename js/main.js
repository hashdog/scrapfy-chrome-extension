/* global document, $, chrome */

$(document).on('ready', function () {
  var lastLang = localStorage.getItem('lastLang');

  // Set the last lang selected
  if (lastLang !== null) {
    $('#lang-selector').val(lastLang);
  }

  $('#create-btn').on('click', function (e) {
    e.preventDefault();

    // Show loading spinner
    $('#loading-text').show();
    $('#create-text').hide();

    // Get and save the selected lang
    var lang = $('#lang-selector').val();
    if (lang != lastLang) {
      localStorage.setItem('lastLang', lang);
    }

    // Get the SCRAP data and open the new tab
    $.ajax({
      type: 'POST',
      url: 'https://api.scrapfy.io/scraps',
      contentType: 'application/json',
      data: JSON.stringify({ lang: lang }),
      dataType: 'json'
    })
    .done(function (data) {
      chrome.tabs.create({
        url: data.url
      });
    });
  });
});
