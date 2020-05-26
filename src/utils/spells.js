const utils = require('./common');

const spellUtils = {
  unique: items => unique(items),
  filters: items => filters(items),
  nameComparer: (a, b) => nameComparer(a, b),
  buildLevel: (level, type) => buildLevel(level, type)
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

const nameComparer = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const valueA = a.name.toUpperCase();
  const valueB = b.name.toUpperCase();

  if ( valueA > valueB ) return 1;
  if ( valueA < valueB ) return -1;
  return 0;
};

const buildLevel = (level, type) => {
  let value;
  switch (level) {
    case 0:
      value = utils.upperFirst(type) + ' cantrip';
      break;
    case 1:
      value = level + 'st level ' + utils.upperFirst(type);
      break;
    case 2:
      value = level + 'nd level ' + utils.upperFirst(type);
      break;
    case 3:
      value = level + 'rd level ' + utils.upperFirst(type);
      break;
    default:
      value = level + 'th level ' + utils.upperFirst(type);
      break;
  }

  return value;
}

module.exports = spellUtils;
