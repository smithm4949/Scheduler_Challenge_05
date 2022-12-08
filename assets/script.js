// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

dayjs.extend(window.dayjs_plugin_customParseFormat)
var events;

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".time-block").click(handleClick); 

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  addClassFromTimeComparison()

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  loadStoredEvents();
  // for (let i = 0; i < events.length; i++) {
  //   const event = events[i];
  //   $(`#${event.id} textarea`).text(`#${event.content}`)
  // }

  // TODO: Add code to display the current date in the header of the page.
  displayDay()
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
      //case: current time is BEFORE timeblock aka block is in future
      timeBlockElement.classList.add("future");
    } else if (dayjs().isAfter(dayjs(timeString, "hA"), "hour")) {
      //case: current time is AFTER timeblock aka block is in past
      timeBlockElement.classList.add("past");
    } else {
      //case: current time is SAME as timeblock aka is present
      timeBlockElement.classList.add("present");
    }
    
  }
}

function loadStoredEvents() {
  //storage template: events = [{id: 'hour-9'; content: 'sample text'}]
  let hours = ['9','10','11','12','1','2','3','4','5']
  hours.forEach(hour => {
    let hourEventString = localStorage.getItem(`hour-${hour}`);
    if (hourEventString !== null) {
      $(`#hour-${hour} textarea`).val(hourEventString);
    }
  });
  
}