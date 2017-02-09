
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

    $("#" + name).append("<dt>" + key + "</dt>");
    $("#" + name).append("<dd>" + value + "</dd>");
  }
  return cost;
}


function receiveData(data) {
  var cost = 0;

  cost = cost + listData(data.attributes,attribute,"attributes");
  cost = cost + listData(data.skills,summing,"skills");
  cost = cost + listData(data.techniques,summing,"techniques");
  cost = cost + listData(data.chakra_natures,summing,"chakra_natures")
  var reduction = summing(data.chakra_natures[data.chakra_affinity]);
  cost = cost - reduction;
  $("#misc").append("<dt>Cost</dt>");
  $("#misc").append("<dd>" + cost + "</dd>");
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage);
});
