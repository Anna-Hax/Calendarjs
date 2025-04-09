const postsigncred = 'http://localhost:3000/signup/'

document.getElementById('submitBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS, GET'}

    const name = document.getElementById('name').value
    const work_email = document.getElementById('work_email').value
    const personal_email = document.getElementById('personal_email').value
    const password = document.getElementById('password').value

    try{
        
        const response = await fetch(postsigncred, {
            method:'POST',
            headers: headers,
            body: JSON.stringify({name, work_email, personal_email, password})
        });

        if (response.ok){
            console.log(response)
            localStorage.setItem('work_email', work_email)
            localStorage.setItem('personal_email', personal_email)
    
        } else{
            const errorData = await response.json();
            console.error("Signup error:", errorData);
            alert("Error during signing in. Check console for details.");
        }

    } catch (error) {
        console.error("Error", error);
    }

});


  