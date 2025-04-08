document.addEventListener('DOMContentLoaded', function () {
    const viewbtn = document.getElementById('typebtn');
    const popup = document.getElementById('popup');
    console.log(viewbtn)
    viewbtn.addEventListener('click', () => {
        popup.classList.remove('notvisible');
    });

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'listWeek'
    });
    calendar.render();
});


