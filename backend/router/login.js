import express from 'express';
const loginrouter = express.Router();
import {db} from '../connect.js';
import bcrypt from 'bcrypt';

loginrouter.post('/', async (request, response) => {

    response.set('content-type', 'application/json');

    const sql = "SELECT * FROM user WHERE work_email = ? OR personal_email = ?";
    const email = request.body.email;
    const password = request.body.password
    try{
        db.get(sql, [email, email], async (err, row) => {
            if (err){
                throw err;
            } else {
                if(row){
                    const auth = await bcrypt.compare(password, row.password)
                    if (auth){
                        response.status(200);
                        let data = {'work_email': row.work_email, 'personal_email': row.personal_email}
                        let content = JSON.stringify(data);
                        response.send(content)
                    } else {
                        let data = {status: 400, message: `Wrong password`}
                        let content = JSON.stringify(data);
                        response.send(content)
                    }
                } else {
                    let data = {status: 400, message: `Wrong username`}
                    let content = JSON.stringify(data);
                    response.send(content)   
                }
            };
        }); 
    } catch (err) {
        console.log(err.message);
        response.status(468);
        response.send(`{"code":468, "status":"${err.message}"}`);
    }
});

export default loginrouter;