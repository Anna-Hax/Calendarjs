document.addEventListener('DOMContentLoaded', function () {
    const viewbtn = document.getElementById('typebtn');
    const popup = document.getElementById('popup');
    console.log(viewbtn)
    viewbtn.addEventListener('click', () => {
        popup.classList.remove('notvisible');
    });
});


const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target)) {
      sidebar.classList.remove("show");
    }
});
function renderMiniCalendar(elementId, monthIndex) {
    let calendarEl = document.getElementById(elementId);
    let year = new Date().getFullYear();
    
    let calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: new Date(year, monthIndex, 1),
      height: 200,
      editable: false,
      selectable: false,
      showNonCurrentDates: false,
      headerToolbar: false,
      events: []
    });

    calendar.render();
}   
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('monthContainer');
    months.forEach((month, index) => {
        const currentmonth = new Date().getUTCMonth();
        const iscurrent = index === currentmonth;
        console.log(currentmonth)
        const col = document.createElement('div');
        col.className = 'col-md-3';
        col.innerHTML = `
          <div class="month-card ${iscurrent ? 'highlighted' : ''}" id="mini-${month.toLowerCase()}">
            <div class="month-title">${month}</div>
            <div id="cal-${month.toLowerCase()}" class="calendar-mini"></div>
          </div>
        `;
        container.appendChild(col);
        renderMiniCalendar(`cal-${month.toLowerCase()}`, index);
    });
  // Add More Details button at the end
  const col = document.createElement('div');
  col.className = 'col-md-3 d-flex align-items-end justify-content-end';
  col.innerHTML = '<button class="btn btn-info">More Details</button>';
  container.appendChild(col);
});