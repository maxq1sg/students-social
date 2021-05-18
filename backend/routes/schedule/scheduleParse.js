export const FIRST_YEAR="1i1-FYNgxnw_Mvh7gzRJ4eeSgyoIOZx1y1NGL3cFe9vU"
export const SECOND_YEAR="1PXX8PHj4yNQ06blpQa34ltkix6HKJ_cxjVV6T3RQWKU"
export const THIRD_YEAR="1UM0aPKUpXFH4UPQ8eeYMsWrZ-Um52lnPNJbEj-yIuNs"

export function parseSchedule(values) {
  let actual = "";
  const schedule = [];
  values[1] = values[1]
    .map((item, index, array) => {
      // console.log(index);
      if (index != 0) {
        if (!item) {
          return actual;
        } else {
          actual = item;
          schedule.push({ day: actual, objects: [] });
          return item;
        }
      }
    })
    .concat(["Суббота", "Суббота"]);
  for (let i = 2; i < values.length; i++) {
    for (let j = 1; j < values[i].length; j++) {
      if (values[i][j]) {
        const ind = schedule.findIndex((item) => item.day === values[1][j]);
        schedule[ind].objects.push({
          predmet: values[i][j],
          prepod: values[i][j + 1],
          aud: values[i][j + 2],
          time: values[i][0],
        });

        j += 2;
      }
    }
  }
  return schedule;
}
export function getSpreedSheetId(year) {
  switch (year) {
    case 1:
      return FIRST_YEAR;
    case 2:
      return SECOND_YEAR;
    case 3:
      return THIRD_YEAR;
  }
}

