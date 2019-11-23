
const unique = {
  spells: (items) => uniqueSpells(items)
}

const uniqueSpells = (spells) => {
  const names = [];

  spells.forEach(spell => {
    names.push(spell.name);
  });

  // let unique = a.filter((item, i, arr) => arr.indexOf(item) === i);

  return names;
}

module.exports = unique;
