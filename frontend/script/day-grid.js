document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'dayGridWeek',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridWeek,dayGridDay'
      },
      editable: true,
      
    });
  
    calendar.render();

    const viewbtn = document.getElementById('typebtn');
    const popup = document.getElementById('popup');
    console.log(viewbtn)
    viewbtn.addEventListener('click', () => {
        popup.classList.remove('notvisible');
    });
  });