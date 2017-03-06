
function attribute(n) {
  return (n * (n + 1)) - 2;
}

function attribute_summing(n) {
  return (n * (n + 1) - 2) / 2;
}

function cap_versus_regen(capacity,regen)
{
  var cost = 0;
  if (capacity < regen)
  {
    cost += summing(capacity);
    cost += attribute(regen);
  }
  else
  {
    cost += summing(regen);
    cost += attribute(capacity);
  }
  return cost;
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
  if (n <= 1)
  {
    return 0;
  }
  return n + summing(n - 1);
}

function calculateCost(data,math)
{
  var cost = 0;
  for (var key in data)
  {
    var value = data[key];
    cost = cost + math(value);
  }
  return cost;
}

function listData(data,name)
{
  for (var key in data)
  {
    var value = data[key];
    $("#" + name).append("<dt>" + key + "</dt>");
    $("#" + name).append("<dd>" + value + "</dd>");
  }
}


function receiveData(data) {
  var cost = 0;
  var attributes = data.attributes;
  var capacity = attributes["Capacity"];
  var regen = attributes["Regeneration"];
  delete attributes["Capacity"];
  delete attributes["Regeneration"];
  var attribute_price = calculateCost(data.attributes,attribute) + cap_versus_regen(capacity,regen);
  if (data.bloodline === true)
  {
    attribute_price += 30;
  }
  console.log("Attribute XP: " + attribute_price);
  var skill_price = calculateCost(data.skills,summing) + listData(data.techniques,summing,"techniques");
  console.log(skill_price);
  cost += skill_price;
  console.log(cost);
  cost = cost + calculateCost(data.chakra_natures,nature)
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
