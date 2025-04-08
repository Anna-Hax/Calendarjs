const postlogincred = 'http://localhost:3000/login/'
document.getElementById('submitBtn').addEventListener('click', async (event) => {
    
    event.preventDefault();
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS, GET'}
    try{
       
        const response = await fetch(postlogincred, {
            method:'POST',
            headers: headers,
            body: JSON.stringify({name, password})
        });

        if (response.ok){
            console.log(response);
            alert('login successful')
    
        } else{
            const errorData = await response.json();
            console.error("Login error:", errorData);
            alert("Error during login. Check console for details.");
        }

    } catch (error) {
        console.error("Error", error);
    }

});