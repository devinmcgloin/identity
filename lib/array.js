const flatten = (obj) => {
  let field = {};

  Object.entries(obj).forEach(([k, v]) => {
    typeof v === 'object' && v !== null && !Array.isArray(v)
      ? Object.assign(field, flatten(v))
      : Object.assign(field, { [k]: v });
  });
  return field;
};

var groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export { flatten, groupBy };
