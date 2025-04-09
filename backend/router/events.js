import express from 'express';
const eventrouter = express.Router();
import {db} from '../connect.js';

eventrouter.post('/', (request, response)=>{
    response.set('content-type', 'application/json'); 

    let sql = "INSERT INTO event(user, task, type, starttime, endtime, desc) VALUES (?, ?, ?, ?, ?, ?)";
    //let find_sql = "SELECT * FROM user WHERE work_email = ? AND personal_email = ?"
    let find_sql = "SELECT * FROM user WHERE name = ?"
    console.log(request.headers["name"])
    try{
        //db.get(find_sql, [request.headers["work_email"], request.headers["personal_email"]], (err, row)=>{
        db.get(find_sql, request.headers["name"], (err, row)=>{
            if (err) {
                throw err;
            } else {
                if (row){
                    db.run(sql, [row.id, request.body.task, request.body.type, request.body.starttime, request.body.endtime, request.body.desc], function(err){
                        if (err) throw err;
                        response.status(201);
                        let data = { status: 201, message: `Task Saved!` };
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

eventrouter.get('/work', (request, response) => {
    response.set('content-type', 'application/json'); 

    let sql = "SELECT * FROM event WHERE work_email = ? OR personal_email = ?"
    let find_sql = "SELECT * FROM user WHERE work_email = ? OR personal_email = ?"

    try{
        db.get(find_sql, [req.headers["work_email"], req.headers["personal_email"]], (err, row)=>{
            if (err) {
                throw err;
            } else {
                if (row){
                    response.status(201);
                    let content = JSON.stringify(row);
                    response.send(content);
                } else{
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
})

export default eventrouter