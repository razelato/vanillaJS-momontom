const dateContainer = document.querySelector(".js-date");

function paintDate(year, month, date) {
  dateContainer.innerText = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;
}

function getDate() {
  const nowDate = new Date();
  nowYear = nowDate.getFullYear();
  nowMonth = nowDate.getMonth() + 1;
  nowDates = nowDate.getDate();
  paintDate(nowYear, nowMonth, nowDates);
}

function init() {
  getDate();
  setInterval(getDate, 1000);
}

init();
