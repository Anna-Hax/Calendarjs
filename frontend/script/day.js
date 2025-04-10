const calendarEl = document.getElementById('calendar');
const linktotask = 'http://localhost:3000/event/post/task/'
const linktogettask = 'http://localhost:3000/event/get/task/'

localStorage.setItem("work_email", "dhruvi_p@ch.iitr.ac.in")
localStorage.setItem("personal_email", "dhruvi.purohit06@gmail.com")
const modalDate = document.getElementById('modalDate');
const taskList = document.getElementById('taskList');
const taskModal = document.getElementById('taskModal');
const work_email = localStorage.getItem("work_email")
const personal_email = localStorage.getItem("personal_email")
const headers = {'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS,GET',
  'work_email': work_email,
  'personal_email': personal_email}

console.log(localStorage.getItem("work_email"), localStorage.getItem("personal_email"))

document.addEventListener('DOMContentLoaded', function () {
  
  const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
    eventLimit: false,
    height: 'auto',
    dateClick: async function (info) {
      taskList.innerHTML = '';
      const selectedDate = info.dateStr;
      modalDate.textContent = selectedDate;
    
      try {
        const response = await fetch(linktogettask, {
          method: "GET",
          headers: headers
        });
    
        if (response.ok) {
          const result = await response.json();
          const tasks = result.filter(task => task.date === selectedDate);
          console.log(tasks)
          if (tasks.length === 0) {
            taskList.innerHTML = '<li class="list-group-item text-muted">No tasks for this day.</li>';
          } else {
            tasks.forEach(task => {
              const li = document.createElement('li');
              li.className = 'list-group-item d-flex justify-content-between align-items-center';
              li.innerHTML = `
                <span>${task.task}</span>
                <div>
                  <button class="btn btn-sm btn-outline-primary me-2" onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" onclick="deleteTask('${selectedDate}', ${task.id})">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              `;
              taskList.appendChild(li);
            });
          }
    
          document.getElementById('modalTrigger').click(); // ✅ Works via Bootstrap attributes

    
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Error fetching tasks.");
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong.");
      }
    }
    
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
  //async function gettask(){
  //  const work_email = localStorage.getItem("work_email")
  //  const personal_email = localStorage.getItem("personal_email")
  //  const headers = {'Content-Type':'application/json',
  //    'Access-Control-Allow-Origin':'*',
  //    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS,GET',
  //    'work_email': work_email,
  //    'personal_email': personal_email}
  //  try{
  //    const response = await fetch(linktogettask, {
  //      statusCode: 200, 
  //      method: "GET",
  //      headers: headers
  //    });
  //    
  //    if (response.ok){
  //      const result = await response.json();
  //      console.log(result)
  //      const tasks = result;
  //      eventColor = 'red'
  //      result.forEach(task => {
  //        let eventColor = 'gray';
  //        if (task.type === 'work') {
  //          eventColor = 'blue';
  //        } else if (task.type === 'personal') {
  //          eventColor = 'green';
  //        }
  //      
  //        calendar.addEvent({
  //          title: task.task,
  //          start: task.date,
  //          end: task.date,
  //          color: eventColor,           
  //          extendedProps: {
  //            type: task.type
  //          }        
  //        });
  //      });
  //    } else{
  //      const errorData = await response.json();
  //      console.error("Error:", errorData);
  //      alert("Error during getting task. Check console for details.");
  //    }
  //  } catch (err){
  //    
  //    console.log(err)
  //  }
  //}
  //gettask();
});

