const listToMysqlParam = (list) => {
  let result = "";

  list.forEach((item, index) => {
    if (index !== 0) {
      result += ", ";
    }
    result += `'${item}'`;
  });

  return result;
};

export default {
  listToMysqlParam,
};
