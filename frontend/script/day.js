const calendarEl = document.getElementById('calendar');
const linktotask = 'http://localhost:3000/event/task/'
localStorage.setItem("work_email", "dhruvi_p@ch.iitr.ac.in")
localStorage.setItem("personal_email", "dhruvi.purohit06@gmail.com")
console.log(localStorage.getItem("work_email"), localStorage.getItem("personal_email"))

document.addEventListener('DOMContentLoaded', function () {
  
  const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
  });
  calendar.render(); 

  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar'); 
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  }); 

  document.getElementById("addTaskModal").addEventListener("submit", async (event) =>{
    event.preventDefault();
    console.log('hello')
    const task = document.getElementById("taskTitle").value
    const type = "work" ///!!!!!!!! seeeee thisss
    const date = document.getElementById("taskDate").value
    const time = document.getElementById("taskTime").value
    const desc = document.getElementById("taskDesc").value
    const work_email = localStorage.getItem("work_email")
    const personal_email = localStorage.getItem("personal_email")
    const headers = {'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS,GET'}
    try{
      console.log('bello')
      const response = await fetch(linktotask, {
        statusCode: 200, 
        method: "POST",
        headers: headers,
        body: JSON.stringify({ work_email, personal_email, task, type, date, time, desc})
      });
      console.log('mello')
      if (response.ok){
        console.log('chello')
        const result = await response.json();
        alert('task added!');
        document.getElementById('addTaskModal').modal('hide');
        //make changes in calendar

      } else{
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Error during adding task. Check console for details.");
      }
    } catch (err){
      console.log('nooooo')
      console.log(err)
    }
  });
  
});