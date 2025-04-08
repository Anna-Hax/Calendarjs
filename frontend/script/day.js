document.addEventListener('DOMContentLoaded', function () {
    const viewbtn = document.getElementById('typebtn');
    const popup = document.getElementById('popup');
    console.log(viewbtn)
    viewbtn.addEventListener('click', () => {
        popup.classList.remove('notvisible');
    });


    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'dayGridMonth',
      events: 'https://fullcalendar.io/api/demo-feeds/events.json',
      editable: true,
      selectable: true
    });
  
    calendar.render();
});
