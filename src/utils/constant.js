import moment from "moment";

export const getTime = (time) => {
  return moment(time).format("hh:mm A");
};
