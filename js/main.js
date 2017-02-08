
function attribute(n) {
  if (n === 0)
  {
    return 0;
  }
  return (n * 2) + attribute(n - 1);
}

function skill_sum(n)
{
  if (n === 0)
  {
    return 0;
  }
  return n + skill_sum(n - 1);
}

function receiveData(data) {
  var cost = 0;
  for (var key in data.attributes)
  {
    var value = data.attributes[key];
    cost = cost + attribute(value);
    $("ul").append("<li> " + key + " : " + value + " </li>");
  }
  for (var key in data.skills)
  {
    var value = data.skills[key];
    cost = cost + skill_sum(value);
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
