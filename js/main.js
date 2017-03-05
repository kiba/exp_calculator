
function attribute(n) {
  if (n === 0)
  {
    return 0;
  }
  return (n * 2) + attribute(n - 1);
}

function nature(n) {
  if (n === 0)
  {
    return 0;
  }
  return (n * 3) + nature(n - 1);
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

    $("#" + name).append("<dt>" + key + "</dt>");
    $("#" + name).append("<dd>" + value + "</dd>");
  }
  return cost;
}


function receiveData(data) {
  var cost = 0;
  var attributes = data.attributes;
  delete attributes["Capacity"];
  delete attributes["Regeneration"];
  var attribute_price = listData(data.attributes,attribute,"attributes");
  cost += attribute_price;
  console.log(attribute_price);
  cost = cost + listData(data.skills,summing,"skills");
  cost = cost + listData(data.techniques,summing,"techniques");
  cost = cost + listData(data.chakra_natures,nature,"chakra_natures")
  var reduction = nature(data.chakra_natures[data.chakra_affinity]);
  cost = cost - reduction;
  var unspent = data.experience - cost;
  $("#misc").append("<dt>Experience</dt>");
  $("#misc").append("<dd>" + data.experience + "</dd>");
  $("#misc").append("<dt>Cost</dt>");
  $("#misc").append("<dd>" + cost + "</dd>");
  $("#misc").append("<dt>Unspent</dt>");
  $("#misc").append("<dd>" + unspent + "</dd>");
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage);
});
