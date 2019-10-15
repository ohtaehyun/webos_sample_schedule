const calendarContainer = document.querySelector(".calendar-container");
const calendarBody = document.querySelector(".calendar-body");
const decButton = document.querySelector(".dec-button");
const incButton = document.querySelector(".inc-button");
const dateText = document.querySelector(".date-text");
const monthButton = document.querySelector(".month-button");
const weekButton = document.querySelector(".week-button");

const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const ZELLER_DAY = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const ZELLER_MONTH = [13, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dayInfo = {
  year: "",
  month: "",
  day: ""
};

let IS_CALENDAR_EXTEND = false;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION FOR DAY INFO @@@@@@@@@@@@@@@@@@@@@@@@@@@
function initDayInfo() {
  var d = new Date();
  var date = d.getDate();
  var month = d.getMonth(); // getMonth() returns month from 0-11 not 1-12.
  var year = d.getFullYear();
  dayInfo["year"] = year;
  dayInfo["month"] = month;
  dayInfo["day"] = date;
}

function getDayOfWeek(d) {
  let year;
  const month = dayInfo["month"];
  const day = d;
  // Zeller's congurence rule
  if (month < 2) {
    year = dayInfo["year"] - 1;
  } else year = dayInfo["year"];
  const K = parseInt(year % 100);
  const J = parseInt(year / 100);

  // ZELLER's congruence
  result =
    day +
    parseInt((13 * (ZELLER_MONTH[month] + 1)) / 5) +
    K +
    parseInt(K / 4) +
    parseInt(J / 4) +
    5 * J;
  result = result % 7;
  return ZELLER_DAY[result];
}

function getMonthDays(month) {
  const year = dayInfo["year"];
  if (month == 1) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      return 29;
    } else {
      return 28;
    }
  } else if (month == -1) {
    return 31;
  } else {
    return monthDays[month];
  }
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION FOR DAY INFO END @@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION FOR CALENDER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function calendarExtend(thisMonthDays, monthStart) {
  if (
    thisMonthDays - (7 - monthStart) - 28 > 0 &&
    IS_CALENDAR_EXTEND == false
  ) {
    IS_CALENDAR_EXTEND = true;
    if (calendarBody.childNodes.length == 6) {
      return;
    }
    tr = document.createElement("tr");
    for (let index = 0; index < 7; index++) {
      tr.appendChild(document.createElement("td"));
    }
    calendarBody.appendChild(tr);
  } else if (
    thisMonthDays - (7 - monthStart) - 28 < 0 &&
    IS_CALENDAR_EXTEND == true
  ) {
    IS_CALENDAR_EXTEND = false;
    if (calendarBody.childNodes.length == 5) {
      return;
    }
    calendarBody.removeChild(calendarBody.lastChild);
  }
}

function drawWeekcalendar() {
  const dayOfWeek = getDayOfWeek(dayInfo["day"]);
  const month = dayInfo["month"];
  const standardDay = dayInfo["day"];
  const idx = dayList.indexOf(dayOfWeek);
  let startWeek = standardDay - idx;
  let lastMonthDays;
  const thisMonthDays = getMonthDays(month);
  if (startWeek < 1) {
    lastMonthDays = getMonthDays(month - 1);
  }

  const calendarCells = document.querySelectorAll(".calendar-body td");
  for (let index = 0; index < calendarCells.length; index++) {
    calendarCells[index].innerHTML = "";
    p = document.createElement("p");
    if (startWeek < 1) {
      p.textContent = lastMonthDays + startWeek;
      if (month === 0) {
        calendarCells[index].setAttribute(
          "id",
          dayInfo["year"] - 1 + "-" + 12 + "-" + (lastMonthDays + startWeek)
        );
      } else {
        calendarCells[index].setAttribute(
          "id",
          dayInfo["year"] + "-" + month + "-" + (lastMonthDays + startWeek)
        );
      }
    } else if (startWeek > thisMonthDays) {
      p.textContent = startWeek - thisMonthDays;
      if (month === 11) {
        calendarCells[index].setAttribute(
          "id",
          dayInfo["year"] + 1 + "-" + 1 + "-" + (startWeek - thisMonthDays)
        );
      } else {
        calendarCells[index].setAttribute(
          "id",
          dayInfo["year"] +
            "-" +
            (month + 2) +
            "-" +
            (startWeek - thisMonthDays)
        );
      }
    } else {
      p.textContent = startWeek;
      calendarCells[index].setAttribute(
        "id",
        dayInfo["year"] + "-" + (month + 1) + "-" + startWeek
      );
    }
    calendarCells[index].appendChild(p);

    calendarCells[index].addEventListener("click", cellClicked);
    startWeek++;
  }
}

function drawMonthcalendar() {
  firstDay = getDayOfWeek(1);
  const monthStart = dayList.indexOf(firstDay);
  const month = dayInfo["month"];

  const thisMonthDays = getMonthDays(month);
  const lastMonthDays = getMonthDays(month - 1);
  calendarExtend(thisMonthDays, monthStart);
  const calendarCells = document.querySelectorAll(".calendar-body td");

  for (let index = 0; index < calendarCells.length; index++) {
    const p = document.createElement("p");
    calendarCells[index].innerHTML = "";
    calendarCells[index].removeEventListener("click", cellClicked);
    if (index < monthStart) {
      p.classList.add("text-gray");
      p.textContent = lastMonthDays - (monthStart - index) + 1;
      calendarCells[index].appendChild(p);
    } else if (monthStart + thisMonthDays <= index) {
      p.classList.add("text-gray");
      p.textContent = index - (monthStart + thisMonthDays) + 1;
      calendarCells[index].appendChild(p);
    } else {
      p.textContent = index - monthStart + 1;
      calendarCells[index].appendChild(p);
      list = document.createElement("ul");
      calendarCells[index].appendChild(list);
      calendarCells[index].setAttribute(
        "id",
        dayInfo["year"] + "-" + (month + 1) + "-" + (index - monthStart + 1)
      );
      calendarCells[index].addEventListener("click", cellClicked);
    }
  }
}

function initMonthcalendar() {
  dayInfo["day"] = 1;
  incButton.removeEventListener("click", increaseWeek);
  decButton.removeEventListener("click", decreaseWeek);
  incButton.addEventListener("click", increaseMonth);
  decButton.addEventListener("click", decreaseMonth);
  calendarBody.innerHTML = "";
  for (let index = 0; index < 5; index++) {
    tr = document.createElement("tr");
    for (let index = 0; index < 7; index++) {
      td = document.createElement("td");
      tr.appendChild(td);
    }
    calendarBody.appendChild(tr);
  }
  drawMonthcalendar();
  setDateText("month");
}

function initWeekcalendar() {
  // setDayInfoToMonday();
  dayInfo["day"] = 1;
  incButton.removeEventListener("click", increaseMonth);
  decButton.removeEventListener("click", decreaseMonth);
  incButton.addEventListener("click", increaseWeek);
  decButton.addEventListener("click", decreaseWeek);
  calendarBody.innerHTML = "";
  tr = document.createElement("tr");
  for (let index = 0; index < 7; index++) {
    td = document.createElement("td");
    tr.appendChild(td);
  }
  calendarBody.appendChild(tr);
  drawWeekcalendar();
  setDateText("week");
}

function increaseWeek() {
  const year = dayInfo["year"];
  const month = dayInfo["month"];
  const day = dayInfo["day"];
  const thisMonthDays = getMonthDays(month);

  if (month === 11 && day + 7 > 31) {
    // 연도가 늘어남
    dayInfo["year"] = year + 1;
    dayInfo["month"] = 0;
    dayInfo["day"] = day + 7 - thisMonthDays - 1;
  } else if (day + 7 > thisMonthDays) {
    dayInfo["month"] = month + 1;
    dayInfo["day"] = day + 7 - thisMonthDays;
  } else {
    dayInfo["day"] = day + 7;
  }
  drawWeekcalendar();
  setDateText("week");
}

function decreaseWeek() {
  const year = dayInfo["year"];
  const month = dayInfo["month"];
  const day = dayInfo["day"];
  const lastMonthDays = getMonthDays(month - 1);

  if (month === 0 && day - 7 < 1) {
    // 연도가 줄어듬
    dayInfo["year"] = year - 1;
    dayInfo["month"] = 11;
    dayInfo["day"] = day - 7 + lastMonthDays;
  } else if (day - 7 < 1) {
    dayInfo["month"] = month - 1;
    dayInfo["day"] = day - 7 + lastMonthDays;
  } else {
    dayInfo["day"] = day - 7;
  }
  drawWeekcalendar();
  setDateText("week");
}

function increaseMonth() {
  const year = dayInfo["year"];
  const month = dayInfo["month"];
  let nextMonth;
  let nextYear;
  if (month == 11) {
    nextMonth = 0;
    nextYear = year + 1;
    dayInfo["year"] = nextYear;
  } else {
    nextMonth = month + 1;
  }
  dayInfo["month"] = nextMonth;

  drawMonthcalendar();
  setDateText("month");
}

function decreaseMonth() {
  const year = dayInfo["year"];
  const month = dayInfo["month"];
  let nextMonth;
  let nextYear;
  if (month == 0) {
    nextMonth = 11;
    nextYear = year - 1;
    dayInfo["year"] = nextYear;
  } else {
    nextMonth = month - 1;
  }
  dayInfo["month"] = nextMonth;
  drawMonthcalendar();
  setDateText("month");
}

function setDateText(calendarType) {
  if (calendarType === "month") {
    dateText.innerHTML = dayInfo["year"] + "-" + (dayInfo["month"] + 1);
  } else if (calendarType === "week") {
    const calendarCells = document.querySelectorAll(".calendar-body td");
    dateText.innerHTML =
      calendarCells[0].getAttribute("id") +
      "~" +
      calendarCells[6].getAttribute("id");
  }
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION FOR CALENDER END @@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION FOR lISTENER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function saveButtonClicked() {
  calendarContainer.removeChild(calendarContainer.lastChild);
}

function addButtonClicked() {
  const modalList = document.querySelector(".modal-list");
  const input = document.createElement("input");
  modalList.append(input);
  input.focus();
}

function cellClicked(event) {
  modalFrame = document.createElement("div");
  modalFrame.classList.add("modalFrame");

  modal = document.createElement("div");
  modal.classList.add("modal");

  title = document.createElement("h1");
  title.textContent = this.getAttribute("id");

  list = document.createElement("div");
  list.classList.add("modal-list");

  input = document.createElement("input");

  addButton = document.createElement("button");
  addButton.textContent = "add";
  addButton.classList.add("add-button");
  addButton.addEventListener("click", addButtonClicked);

  saveButton = document.createElement("button");
  saveButton.textContent = "save";
  saveButton.classList.add("save-button");
  saveButton.addEventListener("click", saveButtonClicked);

  calendarContainer.append(modalFrame);
  modalFrame.append(modal);
  list.append(input);
  modal.append(title);
  modal.append(list);
  modal.append(addButton);
  modal.append(saveButton);

  input.focus();
}
// @@@@@@@@@@@@@@@@@@@@@@@@@ FUNCTION FOR LISTENER END @@@@@@@@@@@@@@@@@@@@@@@@@@

function init() {
  initDayInfo();
  initMonthcalendar();
  monthButton.addEventListener("click", initMonthcalendar);
  weekButton.addEventListener("click", initWeekcalendar);
}

init();
