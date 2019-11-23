
const unique = {
  spells: (items) => uniqueSpells(items)
}

const uniqueSpells = (spells) => {
  const names = [];

  spells.forEach(spell => {
    names.push(spell.name);
    classTypes.push(spell);
    components.push(spell);
    schools.push(spell);
    levels.push(spell);
    castingTimes.push(spell);
    ranges.push(spell);
    durations.push(spell);
  });

  //let unique = a.filter((item, i, arr) => arr.indexOf(item) === i);

  return names;
}

module.exports = unique;
