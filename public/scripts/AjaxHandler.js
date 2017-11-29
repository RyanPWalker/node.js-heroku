/**
 * @file A jQuery demonstration of a GET AJAX request.
 */
'use strict';

// Constants used during the AJAX request.
var ERROR = {
  "message": "The request failed!"
};

// Wait for the document to load before binding event handlers further.
$(function() {

  // Obtain programmatic reference to the important elements of the page.
  var exform = $('#messageForm'),
      message = $('#message'),
      output = $('#posts'),
      target = '/db?action=selectmessages';

  $.get(target, function(response) {
    output.append('<div>' + JSON.stringify(response) + '</div>');
  }).fail(function() {
    output.append('<div>' + JSON.stringify(ERROR) + '</div>');
  });

  // Listen for submission events on the example form.
  exform.on('submit', function(e) {

    // Programmatically prevent the form from submitting.
    e.preventDefault();

    // Resolve the target URI.
    target = '/db?action=select&message=' + message.val();

    $.get(target, function(response) {

      // The most notable difference here is that jQuery attempts to parse JSON
      // responses into a JSON object, whereas vanilla JavaScript returns the
      // result of an AJAX request as a string.
      output.append('<div>' + JSON.stringify(response) + '</div>');
    }).fail(function() {
      output.append('<div>' + JSON.stringify(ERROR) + '</div>');
    });
  });
});