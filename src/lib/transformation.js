const flatten = obj => {
  let field = {};

  Object.entries(obj).forEach(([k, v]) => {
    typeof v === 'object' && v !== null
      ? Object.assign(field, flatten(v))
      : Object.assign(field, { [k]: v });
  });
  return field;
};

export { flatten };
