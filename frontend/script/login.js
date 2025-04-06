document.getElementById('submitBtn').addEventListener('click', async (event) => {
    
    event.preventDefault();
    const headers = {'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS, GET'}
    try{
        const email = document.getElementById('email')
        const password = document.getElementById('password')
        const response = await fetch(postlogincred, {
            method:'POST',
            headers: headers,
            body: JSON.stringify({email, password})
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