
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'multiMonthYear',
      editable: true,
      events: 'https://fullcalendar.io/api/demo-feeds/events.json'
    });

    calendar.render();
});