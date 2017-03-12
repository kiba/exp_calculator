
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
  var transformation = techniques["Transformation"];
  var clone = techniques["Clone"];
  var substitution = techniques["Substitution"];
  delete techniques["Clone"];
  delete techniques["Transformation"];
  delete techniques["Substitution"];
  var bonus = iron_nerve_bonus(taijustu) + iron_nerve_bonus(weapons) + iron_nerve_bonus(awareness) + iron_nerve_bonus(stealth);
  var skills_cost = calculateCost(skills,skill_summing);
  var techniques_cost = calculateCost(techniques,skill_summing);
  var academy_cost = technique_summing_minor(transformation) + technique_summing_minor(clone) + technique_summing_minor(substitution);
  cost += bonus;
  cost += skills_cost;
  cost += techniques_cost;
  cost += academy_cost;
  return cost;
}

function receiveData(data) {
  var cost = 0;
  cost += calculateAttributePrice(data.attributes,data.bloodline);
  var skill_price = calculateSkillPrice(data);
  cost += skill_price;
  cost += calculateCost(data.chakra_natures,nature)
  var reduction = nature(data.chakra_natures[data.chakra_affinity]);

  cost = cost - reduction;
  var unspent = data.experience - cost;
  $("#misc").append("<dt>Experience</dt>");
  $("#misc").append("<dd>" + data.experience + "</dd>");
  $("#misc").append("<dt>Cost</dt>");
  $("#misc").append("<dd>" + cost + "</dd>");
  $("#misc").append("<dt>Unspent</dt>");
  $("#misc").append("<dd>" + unspent + "</dd>");

  listData(data.attributes,"attributes");
  listData(data.skills,"skills");
  listData(data.techniques,"techniques");
  listData(data.chakra_natures,"chakra_natures");
}

function errorMessage(error) {
  console.log("Uh oh");
}

$(document).ready(function()
{
  $.getJSON("kurosawa_hazo.json", receiveData).fail(errorMessage);
});
