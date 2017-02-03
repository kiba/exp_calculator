
function receiveData(data) {
  for (var key in data.attributes)
  {
    $("ul").append("<li> " + key + " : " + data.attributes[key] + " </li>");
  }
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage);
});
