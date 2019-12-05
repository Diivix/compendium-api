const utils = {
  unique: items => unique(items),
  filters: items => filters(items)
};

const unique = spells => {
  const names = [], classTypes = [], components = [], schools = [], levels = [], castingTimes = [], ranges = [], durations = [], tags = [];

  spells.forEach(spell => {
    names.push(spell.name);
    spell.classTypes.forEach(value => classTypes.push(value));
    spell.components.forEach(value => components.push(value));
    schools.push(spell.school);
    levels.push(spell.level);
    castingTimes.push(spell.castingTime);
    ranges.push(spell.range);
    durations.push(spell.duration);
    spell.tags.forEach(value => tags.push(value));
  });

  return {
    names:        names.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    classTypes:   classTypes.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    components:   components.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    schools:      schools.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    levels:       levels.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    castingTimes: castingTimes.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    ranges:       ranges.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    durations:    durations.filter((item, i, arr) => arr.indexOf(item) === i).sort(),
    tags:         tags.filter((item, i, arr) => arr.indexOf(item) === i).sort()
  };
};

//
// Spells in this case only requires the properties id, name, tags to be present.
// Returns: { names: [{ id: 0, name: "some spell" }], tags: ["tag1", "tag2"] }
//
const filters = spells => {
  const names = [], tags = [];

  spells.forEach(spell => {
    names.push({id: spell.id, name: spell.name});
    spell.tags.forEach(value => tags.push(value));
  });

  return {
    names:        names,
    tags:         tags.filter((item, i, arr) => arr.indexOf(item) === i).sort()
  };
};

module.exports = utils;
