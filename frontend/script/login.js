const postlogincred = 'http://localhost:3000/login/'
document.getElementById('submitBtn').addEventListener('click', async (event) => {
    
    event.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS, GET'}
    try{
       
        const response = await fetch(postlogincred, {
            method:'POST',
            headers: headers,
            body: JSON.stringify({email, password})
        });

        if (response.ok){
            alert('login successful')
            const result = await response.json();
            localStorage.setItem('work_email', result.work_email)
            localStorage.setItem('personal_email', result.personal_email)
    
        } else{
            const errorData = await response.json();
            console.error("Login error:", errorData);
            alert("Error during login. Check console for details.");
        }

    } catch (error) {
        console.error("Error", error);
    }

});