function postMessage() {
    var message = $("#message").val();
  
    var params = {
      message: message
    };
  
    $.post("/messages", params, function(result) {
      if (result && result.success) {
        $("#status").html("<p style='color:green'>Post successfully sent.</p>");
      } else {
        $("#status").html("<strong style='color:red'>Unable to send message</strong>");
      }
    });
  }

getMessages = () => {
  var posts = $("#posts");
  
  $.get('/messages', function(response) {
      response.forEach(function(r) {
        posts.append('<article><a href="#" class="image"><img src="images/blank.jpg" alt="" /></a><div class="inner"><h4>' + JSON.stringify(r.name) + '</h4><p>' + JSON.stringify(r.post_date) + '</p><p>' + JSON.stringify(r.description) + '</p></div></article></div>');
      });
    }).fail(function() {
      posts.append('<div>' + JSON.stringify(ERROR) + '</div>');
  });
}