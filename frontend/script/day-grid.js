const calendarEl = document.getElementById('calendar');
const linktotask = 'http://localhost:3000/event/post/task/'
const linktogettask = 'http://localhost:3000/event/get/task/'


const work_email = localStorage.getItem("work_email")
const personal_email = localStorage.getItem("personal_email")

if (!work_email || !personal_email){
  alert('Access denied')
  window.location.href = '../html/signup.html'
}

document.addEventListener('DOMContentLoaded', function () {
  const events = gettask();
  const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    initialView: 'dayGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridWeek,dayGridDay'
    },
    eventLimit: false,
    editable: true,
    selectable: true,
    events: events,
  });
  calendar.render();

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
        tasks.forEach(task => {
          calendar.addEvent({
            'title': task.task,
            'start': task.date,
            'endtime': task.time,
          })
        });
        
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

  function logout(){
    localStorage.clear();
    window.location.href = '../html/login.html'
  }
  document.getElementById('logout').addEventListener('click', ()=> {
    logout();
  })
});

