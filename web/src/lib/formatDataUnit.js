import fileSize from "file-size";

export const formatDataUnit = unit => {
  if (unit === 0) {
    return "∞";
  } else {
    return fileSize(unit * 1049000, {
      fixed: 1,
      spacer: " "
    }).human("jedec");
  }
};

export default formatDataUnit;
