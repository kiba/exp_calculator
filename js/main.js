
function attribute(n) {
  return n * 2;
}

function receiveData(data) {
  var cost = 0;
  for (var key in data.attributes)
  {
    var value = data.attributes[key];
    cost = cost + attribute(value);
    $("ul").append("<li> " + key + " : " + value + " </li>");
  }
  console.log(cost);
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage);
});
