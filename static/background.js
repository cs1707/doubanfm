(function(){
  'use strict';

  var index = 'index.html';

  chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create(index, {
      id: 'doubanFM1',
      bounds: {
        'width': 500,
        'height': 245
      },
      resizable: false
    });
  });

})();
