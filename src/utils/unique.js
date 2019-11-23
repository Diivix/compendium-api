const unique = {
  spells: items => uniqueSpells(items)
};

const uniqueSpells = spells => {
  const names = [], classTypes = [], components = [], schools = [], levels = [], castingTimes = [], ranges = [], durations = [];

  spells.forEach(spell => {
    names.push(spell.name);
    spell.classTypes.forEach(value => classTypes.push(value));
    spell.components.forEach(value => components.push(value));
    schools.push(spell.school);
    levels.push(spell.level);
    castingTimes.push(spell.castingTime);
    ranges.push(spell.range);
    durations.push(spell.duration);
  });

  return (uniqueValues = {
    names:        names.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    classTypes:   classTypes.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    components:   components.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    schools:      schools.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    levels:       levels.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    castingTimes: castingTimes.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    ranges:       ranges.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    durations:    durations.filter((item, i, arr) => arr.indexOf(item) === i).sort()
  });
};

module.exports = unique;
