
function attribute(n) {
  if (n === 0)
  {
    return 0;
  }
  return (n * 2) + attribute(n - 1);
}

function summing(n)
{
  if (n === 0)
  {
    return 0;
  }
  return n + summing(n - 1);
}

function listData(data,math,name)
{
  var cost = 0;
  for (var key in data)
  {
    var value = data[key];
    cost = cost + math(value);

    $("ul#" + name).append("<li> " + key + " : " + value + " </li>");
  }
  return cost;
}


function receiveData(data) {
  var cost = 0;

  cost = cost + listData(data.attributes,attribute,"attributes");

  for (var key in data.skills)
  {
    var value = data.skills[key];
    cost = cost + summing(value);
    $("ul#skills").append("<li> " + key + " : " + value + " </li>");
  }
  for (var key in data.techniques)
  {
    var value = data.techniques[key];
    cost = cost + summing(value);
    $("ul#techniques").append("<li> " + key + " : " + value + " </li>");
  }
  for (var key in data.chakra_natures)
  {
    var value = data.chakra_natures[key];
    cost = cost + summing(value);
    $("ul#chakra_natures").append("<li> " + key + " : " + value + " </li>");
  }
  var reduction = summing(data.chakra_natures[data.chakra_affinity]);
  cost = cost - reduction;
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage);
});
