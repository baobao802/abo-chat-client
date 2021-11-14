export const formatter = dateTime => {
  console.log(dateTime);
  return `${dateTime.getHours()}:${dateTime.getMinutes()}`;
};
