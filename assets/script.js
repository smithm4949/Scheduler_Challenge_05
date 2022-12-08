dayjs.extend(window.dayjs_plugin_customParseFormat)
var events;

$(function () {
  $(".time-block").click(handleClick); 
  addClassFromTimeComparison();
  loadStoredEvents();
  displayDay();
});

function displayDay() {
  $("#currentDay").text(dayjs().format("MM-DD-YYYY").toString());
}

function handleClick(e) {
  if (e.target.className.includes("saveBtn")) {
    //save changes
    let id = e.target.parentElement.getAttribute("id");
    localStorage.setItem(id, $(`#${id} textarea`).val())
  }
}

function addClassFromTimeComparison() {
  let scheduleItems = document.getElementById("schedule-wrapper").children;
  for (let i = 0; i < scheduleItems.length; i++) {
    const timeBlockElement = scheduleItems[i];
    timeString = timeBlockElement.firstElementChild.textContent;
    if (dayjs().isBefore(dayjs(timeString, "hA"), "hour")) {
      timeBlockElement.classList.add("future");
    } else if (dayjs().isAfter(dayjs(timeString, "hA"), "hour")) {
      timeBlockElement.classList.add("past");
    } else {
      timeBlockElement.classList.add("present");
    }
  }
}

function loadStoredEvents() {

  let hours = ['9','10','11','12','1','2','3','4','5']

  hours.forEach(hour => {
    let hourEventString = localStorage.getItem(`hour-${hour}`);
    if (hourEventString !== null) {
      $(`#hour-${hour} textarea`).val(hourEventString);
    }
  });
}