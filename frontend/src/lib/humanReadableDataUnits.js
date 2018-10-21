import fileSize from "file-size";

const humanReadableDataUnits = unit => {
  if (unit === 0) {
    return "∞";
  } else {
    return fileSize(unit * 1049000, {
      fixed: 2,
      spacer: " "
    }).human("jedec");
  }
};

export { humanReadableDataUnits };
