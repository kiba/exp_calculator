
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
    cost += attribute_summing(capacity);
    cost += attribute(regen);
  }
  else
  {
    cost += attribute_summing(regen);
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

function skill_summing(n)
{
  return (n * (n + 1)) / 2;
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

function calculateAttributePrice(attributes, bloodline)
{
  var capacity = attributes["Capacity"];
  var regen = attributes["Regeneration"];
  delete attributes["Capacity"];
  delete attributes["Regeneration"];
  var attribute_price = calculateCost(attributes,attribute) + cap_versus_regen(capacity,regen);
  if (bloodline === true)
  {
    attribute_price += 30;
  }
  console.log("Attribute XP: " + attribute_price);
  return attribute_price;
}

function iron_nerve_bonus(n)
{
  return (n * (n + 1))/2 - 3;
}

function calculateSkillPrice(data)
{
  var cost = 0;
  var skills = data.skills;
  var techniques = data.techniques;
  var taijustu = skills["Taijustu"];
  var weapons = skills["Weapons"];
  var awareness = skills["Awareness"];
  var stealth = skills["Stealth"];
  delete skills["Taijustu"];
  delete skills["Weapons"];
  delete skills["Awareness"];
  delete skills["Stealth"];
  var bonus = iron_nerve_bonus(taijustu) + iron_nerve_bonus(weapons) + iron_nerve_bonus(awareness) + iron_nerve_bonus(awareness);
  var skills_cost = calculateCost(skills,skill_summing);
  cost += bonus;
  cost += skills_cost;
  console.log(cost);
  return cost;
}

function receiveData(data) {
  var cost = 0;
  cost += calculateAttributePrice(data.attributes,data.bloodline);
  var skill_price = calculateSkillPrice(data);
  // var skill_price = calculateCost(data.skills,summing) + listData(data.techniques,summing);
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
