(function () {
  'use strict';

  // Helpers
  var _addLink = function () {
    var btnHtml = '<a href="https://scrapfy.io" class="scrapfy-link" target="_blank">open in SCRAPfy</a>';

    $('.scrapfy-link').remove();
    $('pre').prepend(btnHtml);

    $('.scrapfy-link').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);

      var $code = $this.parent().find('code');
      var content = '';

      if ($code.length > 0) {
        content = $code.text()
      } else {
        var $parent = $this.parent();
        $parent.find('a.scrapfy-link').remove();
        content = $parent.text();
      }

      $this.text('loading...');

      $.ajax({
        type: 'POST',
        url: 'https://api.scrapfy.io/scraps',
        contentType: 'application/json',
        data: JSON.stringify({ content: content }),
        dataType: 'json'
      })
      .done(function (reponseData) {
        $this.text('open in SCRAPfy');

        if(!reponseData.url) {
          alert('SCRAPfy error: bad response format by the server');
          return false;
        }

        // Open the room in new tab
        window.open(reponseData.url);
      })
      .fail(function () {
        $this.text('open in SCRAPfy');
        alert('SCRAPfy error: seems the server is unreachable for the moment');
      });
    });
  };

  // Init
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'change') {
      _addLink();
    }
  });

})();
