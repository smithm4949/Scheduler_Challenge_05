dayjs.extend(window.dayjs_plugin_customParseFormat)
var events;

$(function () {
  //add click listener to wrapper div for each row
  $(".time-block").click(handleClick); 

  //compare time of each block to current time and add the appropiate class
  addClassFromTimeComparison();

  //load and display any saved schedule items
  loadStoredEvents();

  displayDay();
});

function displayDay() {
  $("#currentDay").text(dayjs().format("MM-DD-YYYY").toString());
}

function handleClick(e) {
  //Check if event was fired on the save button and store data if so
  if (e.target.className.includes("saveBtn")) {
    //save changes
    let id = e.target.parentElement.getAttribute("id");
    localStorage.setItem(id, $(`#${id} textarea`).val())
  }
}

function addClassFromTimeComparison() {
  //iterate over each timeblock comparing its time to current.
  //dayjs format is used to convert the text (ex: "5PM") into a dayjs object
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
  //get any events stored with the key "hour-N" matching our time blocks 
  let hours = ['9','10','11','12','1','2','3','4','5']

  hours.forEach(hour => {
    let hourEventString = localStorage.getItem(`hour-${hour}`);
    if (hourEventString !== null) {
      $(`#hour-${hour} textarea`).val(hourEventString);
    }
  });
}