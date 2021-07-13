const isNull = val => {
  if (val === undefined || val === null || val === '') {
    return true;
  } else if (Array.isArray(val) && val.length === 0) {
    return true;
  }
  return false;
};

export default {
  isNull,
};
