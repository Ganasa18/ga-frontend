const splitTextOdoo = (text) => {
  if (text === "Import Odoo") {
    return text;
  }
  var stringArray = text.split(/(\s+)/);
  stringArray = stringArray.filter(function (str) {
    return /\S/.test(str);
  });
  if (stringArray.length > 1) {
    return stringArray[0].charAt(0) + ". " + stringArray[1];
  }
  return text;
};

export { splitTextOdoo };
