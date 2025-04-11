document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    let currentDay = String(now.getDate()).padStart(2, '0');
    let currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    let currentYear = now.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    const currenttime = `${hours}:${minutes}`;
  
    async function gettask() {
      const work_email = localStorage.getItem("work_email");
      const personal_email = localStorage.getItem("personal_email");
  
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS,GET',
        'work_email': work_email,
        'personal_email': personal_email
      };
  
      try {
        const response = await fetch(linktogettask, {
          method: "GET",
          headers: headers
        });
  
        if (response.ok) {
          const result = await response.json();
          const tasks = result;
  
          tasks.forEach(task => {
            console.log(task.time, task.date);
            if (task.date === currentDate && task.time === currenttime) {
              alert(`Task alert! Look at task: ${task.task}`);
            }
          });
  
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Error during getting task. Check console for details.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
  
    
    gettask();
  
    
  });
  