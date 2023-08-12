$(document).ready(function () {
    
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    function updateCalendar(year, month) {
      $(".month-year").text(`${monthNames[month]} ${year}`);
      const today = new Date();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDay = firstDay.getDay();
      const endDay = lastDay.getDate();
  
      const $calendarDates = $(".calendar-dates");
      $calendarDates.empty();
  
      for (let i = 0; i < startDay; i++) {
        $calendarDates.append('<div class="date"></div>');
      }
  
      for (let day = 1; day <= endDay; day++) {
        const date = new Date(year, month, day);
        const $dateElement = $('<div class="date"></div>');
        
        // Check if the date is in the past and disable it
      if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth()) || (year === today.getFullYear() && month === today.getMonth() && day < today.getDate())) {
        $dateElement.addClass("past");
      }
        else if (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) {
        $dateElement.addClass("today");
      } 
        // else if (date < today) {
        //   $dateElement.addClass("past");
        // } 
       
        else {
          $dateElement.addClass("future");
        }
  
        $dateElement.text(day);
        $calendarDates.append($dateElement);
      }
    }
  
    const today = new Date();
    updateCalendar(today.getFullYear(), today.getMonth());
  
    $(".prev-month").click(function () {
      today.setMonth(today.getMonth() - 1);
      updateCalendar(today.getFullYear(), today.getMonth());
    });
  
    $(".next-month").click(function () {
      today.setMonth(today.getMonth() + 1);
      updateCalendar(today.getFullYear(), today.getMonth());
    });
  
    $(".calendar-dates").on("click", ".future", function () {
      const selectedDate = new Date(today.getFullYear(), today.getMonth(), parseInt($(this).text()));
      $("#popupTitle").text(selectedDate.toDateString());
      $("#popupForm").modal("show");
    });

    $(".calendar-dates").on("click", ".event-day", function () {
      const selectedDate = new Date(today.getFullYear(), today.getMonth(), parseInt($(this).text()));
      $("#popupTitle").text(selectedDate.toDateString());
      $("#popupEventInfo").modal("show");
    });
  
    $("#popupForm form").submit(function (event) {
      event.preventDefault();
      const selectedDate = new Date(today.getFullYear(), today.getMonth(), parseInt($("#popupTitle").text().split(" ")[2]));
      const $selectedDateElement = $(`.date:contains('${selectedDate.getDate()}')`);
  
      $selectedDateElement.removeClass("future").addClass("event-day");
      $("#popupForm").modal("hide");
    });
  });
  