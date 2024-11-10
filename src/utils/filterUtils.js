export const validateDate = (date) => {
  if (date && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
    return "Date must be in MM/DD/YYYY format";
  }

  return true;
};

export const formatDate = (date) => {
  if (!date) return null;
  const [month, day, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const toggleAll = (type, allState, objectState) => {
  if (type === "all") {
    allState.value = true;
    Object.keys(objectState).forEach((key) => (objectState[key] = false));
  } else {
    allState.value = !Object.values(objectState).includes(true);
  }
};
