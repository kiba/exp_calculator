
function receiveData(data) {
  console.log("success");
  var msg = "test"
  $("ul").append("<li>" + msg + "</li>")
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage)
});
