function attribute(n) {
  return (n * (n + 1)) - 2;
}

function attribute_summing(n) {
  return (n * (n + 1) - 2) / 2;
}

function technique_bonus(n) {
  return (n * (n + 1)) / 2 - 1;
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

function technique_summing_minor(n)
{
  return (n * (n + 1)) / 2 - 1;
}

function iron_nerve_bonus(n)
{
  return (n * (n + 1))/2 - 3;
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
