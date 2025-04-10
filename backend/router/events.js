import express from 'express';
const eventrouter = express.Router();
import {db} from '../connect.js';

//post event
eventrouter.post('/', (request, response)=>{
    response.set('content-type', 'application/json'); 

    let sql = "INSERT INTO event(user, task, type, starttime, endtime, desc) VALUES (?, ?, ?, ?, ?, ?)";
    let find_sql = "SELECT * FROM user WHERE work_email = ? AND personal_email = ?"
    //let find_sql = "SELECT * FROM user WHERE name = ?"
    var work_email=request.headers["work_email"] 
    var personal_email = request.headers["personal_email"]
    
    try{
        db.get(find_sql, [work_email, personal_email], (err, row)=>{
            if (err) {
                throw err;
            } else {
                if (row){
                    db.run(sql, [row.id, request.body.task, request.body.type, request.body.starttime, request.body.endtime, request.body.desc], function(err){
                        if (err) throw err;
                        response.status(201);
                        let data = { status: 201, message: `Event Saved!` };
                        let content = JSON.stringify(data);
                        response.send(content);
                    });
                } else{
                    console.log(row)
                    let data = {status: 400, message: `Wrong username`}
                    let content = JSON.stringify(data);
                    response.send(content) 
                };
            }
        });
        
    } catch (err){
        console.log(err.message);
        response.status(468);
        response.send(`{"code":468, "status":"${err.message}"}`);
    };
});


//post task
eventrouter.post('/post/task', (request, response)=>{
    response.set('content-type', 'application/json'); 

    let sql = "INSERT INTO task(user, task, type, date, time, desc) VALUES (?, ?, ?, ?, ?, ?)";
    let find_sql = "SELECT * FROM user WHERE work_email = ? AND personal_email = ?"
    var work_email=request.headers["work_email"]
   
    var personal_email = request.headers["personal_email"]
    console.log(request.headers)
    try{
        db.get(find_sql, [work_email, personal_email], (err, row)=>{
            if (err) {
                throw err;
            } else {
                if (row){
                    db.run(sql, [row.id, request.body.task, request.body.type, request.body.date, request.body.time, request.body.desc], function(err){
                        console.log('hello')
                        if (err){
                            console.log(err);
                        }else {
                            response.status(201);
                            let data = { status: 201, message: `Task Saved!` };
                            let content = JSON.stringify(data);
                            response.send(content);
                        }
                    });
                } else{
                    console.log(row, 'hi')
                    let data = {status: 400, message: `Wrong username`}
                    let content = JSON.stringify(data);
                    response.send(content) 
                };
            }
        });
        
    } catch (err){
        console.log(err.message);
        response.status(468);
        response.send(`{"code":468, "status":"${err.message}"}`);
    };
});

//get task
eventrouter.get('/get/task', (request, response) => {
    response.set('content-type', 'application/json'); 

    let find_sql = "SELECT * FROM user WHERE work_email = ? AND personal_email = ?"
    var work_email=request.headers["work_email"]
    var personal_email = request.headers["personal_email"]
    console.log(work_email)
    try{
        db.all(find_sql, [work_email, personal_email], (err, rows)=>{
           
            if (err) {
                throw err;
            } else {
               console.log(rows)
                if (rows){
                    rows.forEach(row => {
                        const user_id = row.id;
                        let sql = "SELECT * FROM task where user = ?";
                        db.all(sql, [user_id], (err, row)=>{
                            if (row){

                                response.status(201);
                                let content = JSON.stringify(row);
                                console.log(content)
                                response.send(content);
                            } else {
                                response.send(null)
                            }
                        })
                    
                    });
                    
                } else{
                    response.status(400)
                    let data = {status: 400, message: `error`}
                    let content = JSON.stringify(data);
                    response.send(content) 
                };
            }
        });
        
    } catch (err){
        console.log(err.message);
        response.status(468);
        response.send(`{"code":468, "status":"${err.message}"}`);
    };
});

// edit task
eventrouter.put('/update/task', (request, response) => {
    response.set('content-type', 'application/json');

    let find_user_sql = "SELECT * FROM user WHERE work_email = ? AND personal_email = ?";
    const work_email = request.headers["work_email"];
    const personal_email = request.headers["personal_email"];

    const { id, task, type, date, time, desc} = request.body; // Assuming these fields are being updated

    console.log(`Updating task dated ${id}`);

    try {
        db.all(find_user_sql, [work_email, personal_email], (err, rows) => {
            if (err) {
                throw err;
            }

            if (rows && rows.length > 0) {
                const user_id = rows[0].id;

                let update_task_sql = "UPDATE task SET task = ?, type = ? date = ?, time = ?, desc = ? WHERE id = ? AND user = ?";
                db.run(update_task_sql, [task, type, date, time, desc, id, user_id], function (err) {
                    if (err) {
                        console.error(err.message);
                        response.status(500).send(JSON.stringify({ code: 500, message: err.message }));
                    } else {
                        response.status(200).send(JSON.stringify({ code: 200, message: "Task updated successfully" }));
                    }
                });

            } else {
                response.status(404).send(JSON.stringify({ code: 404, message: "User not found" }));
            }
        });
    } catch (err) {
        console.error(err.message);
        response.status(500).send(JSON.stringify({ code: 500, message: err.message }));
    }
});



export default eventrouter