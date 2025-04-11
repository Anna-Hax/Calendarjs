const calendarEl = document.getElementById('calendar');
const linktotask = 'http://localhost:3000/event/post/task/'
const linktogettask = 'http://localhost:3000/event/get/task/'

localStorage.setItem("work_email", "dhruvi_p@ch.iitr.ac.in")
localStorage.setItem("personal_email", "dhruvi.purohit06@gmail.com")

console.log(localStorage.getItem("work_email"), localStorage.getItem("personal_email"))

document.addEventListener('DOMContentLoaded', function () {
  const events = gettask();
  const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
    eventLimit: false,
    editable: true,
    selectable: true,
    
    events: events, 

    eventClick: function (info) {
      const event = info.event;
      document.getElementById('editTaskTitle').value = event.title;
      document.getElementById('editTaskDate').value = event.start.toISOString().split('T')[0];
      document.getElementById('editTaskTime').value = event.start.toTimeString().slice(0, 5);
      document.getElementById('editTypeDropdown').value = event.extendedProps.type || '';
      document.getElementById('editTaskDesc').value = event.extendedProps.description || '';

     
      document.getElementById('editTaskForm').setAttribute('data-event-id', event.id);

    
      document.getElementById('editTaskModal').modal('show');

     }
   });
 
   calendar.render();
 
   // Handle Edit form submission
   document.getElementById('editTaskForm').addEventListener('submit', function (e) {
     e.preventDefault();
 
     const eventId = e.target.getAttribute('data-event-id');
     const event = calendar.getEventById(eventId);
 
     if (event) {
       const newTitle = document.getElementById('editTaskTitle').value;
       const newDate = document.getElementById('editTaskDate').value;
       const newTime = document.getElementById('editTaskTime').value;
       const newStart = `${newDate}T${newTime}`;
 
       event.setProp('title', newTitle);
       event.setStart(newStart);
       event.setExtendedProp('type', document.getElementById('editTypeDropdown').value);
       event.setExtendedProp('description', document.getElementById('editTaskDesc').value);
     }
      });
    

  
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar'); 
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  }); 

  document.getElementById("addTaskModal").addEventListener("submit", async (event) =>{
    event.preventDefault();
    
    const task = document.getElementById("taskTitle").value
    const type = document.getElementById("typeDropdown").value
    const date = document.getElementById("taskDate").value
    const time = document.getElementById("taskTime").value
    const desc = document.getElementById("taskDesc").value
    const work_email = localStorage.getItem("work_email")
    const personal_email = localStorage.getItem("personal_email")
    const headers = {'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS,GET',
      'work_email': work_email,
      'personal_email': personal_email}
    try{
      
      const response = await fetch(linktotask, {
        statusCode: 200, 
        method: "POST",
        headers: headers,
        body: JSON.stringify({ work_email, personal_email, task, type, date, time, desc})
      });
      
      if (response.ok){
        const result = await response.json();
        alert('task added!');
        gettask();
        document.getElementById('addTaskModal').modal('hide');
      } else{
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Error during adding task. Check console for details.");
      }
    } catch (err){
      
      console.log(err)
    }
  });
  async function gettask(){
    const work_email = localStorage.getItem("work_email")
    const personal_email = localStorage.getItem("personal_email")
    const headers = {'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS,GET',
      'work_email': work_email,
      'personal_email': personal_email}
    try{
      const response = await fetch(linktogettask, {
        statusCode: 200, 
        method: "GET",
        headers: headers
      });
      
      if (response.ok){
        const result = await response.json();
        console.log(result)
        const tasks = result;
        return tasks
      } else{
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Error during getting task. Check console for details.");
      }
    } catch (err){
      
      console.log(err)
    }
  }
  gettask();

  
});

