const utils = {
  truncate: (value, length) => truncate(value, length),
  upperFirst: (value, firstWordOnly = true) => upperFirst(value, firstWordOnly)
};

const truncate = (value, length) => {
  if (value.length > length) {
    return value.slice(0, length) + '...';
  }
  return value;
};

const upperFirst = (value, firstWordOnly = true) => {
  if (firstWordOnly) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    const values = value.split(' ');
    const upperCasedValues = [];
    values.forEach(x => upperCasedValues.push(x.charAt(0).toUpperCase() + x.slice(1)));
    return upperCasedValues.join(' ');
  }
};

module.exports = utils;
