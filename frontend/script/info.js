function clearDiv() {
    document.getElementById("div").innerHTML = '';
}
  
document.getElementById('personal').addEventListener('change', (event) => {
  if (event.target.checked) {
    clearDiv();

    const personalDiv = document.createElement("div");
    personalDiv.classList.add("mb-3");
    personalDiv.innerHTML = `
      <input type="text" class="form-control" placeholder="Enter work email" id="w-id">
    `;

    document.getElementById("div").appendChild(personalDiv);
  }
});

document.getElementById('work').addEventListener('change', (event) => {
  if (event.target.checked) {
    clearDiv();
    const workDiv = document.createElement("div");
    workDiv.classList.add("mb-3");
    workDiv.innerHTML = `
      <input type="text" class="form-control" placeholder="Enter personal email" id="p-id">
    `;

    document.getElementById("div").appendChild(workDiv);
  }
});
  
document.getElementById('both').addEventListener('change', (event) => {
    if (event.target.checked) {
      clearDiv();
    }
});

document.getElementById('submitBtn').addEventListener('click', async (event) => {
    
    event.preventDefault();
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS, GET'}
    try{
        const personal_email = document.getElementById('p-id')
        const work_email = document.getElementById('w-id')
        const response = await fetch(postlogincred, {
            method:'POST',
            headers: headers,
            body: JSON.stringify({personal_email, work_email})
        });

        if (response.ok){
            window.location.href = 'info.html';
    
        } else{
            const errorData = await response.json();
            console.error("Login error:", errorData);
            alert("Error during login. Check console for details.");
        }

    } catch (error) {
        console.error("Error", error);
    }

});