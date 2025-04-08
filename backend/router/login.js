import express from 'express';
const loginrouter = express.Router();
import {db} from '../connect.js';
import bcrypt from 'bcrypt';

loginrouter.post('/', async (request, response) => {

    response.set('content-type', 'application/json');

    const sql = "SELECT * FROM user WHERE name = ?";
    const name = request.body.name;
    const password = request.body.password
    try{
        db.get(sql, [name], async (err, row) => {
            if (err){
                throw err;
            }
            if(row){
                const auth = await bcrypt.compare(password, row.password)
                if (auth){
                    response.status(200);
                    let data = {status: 200, message: `Welcome back ${name}`}
                    let content = JSON.stringify(data);
                    response.send(content)
                } else{
                    let data = {status: 400, message: `Wrong password`}
                    let content = JSON.stringify(data);
                    response.send(content)
                }
            } else{
                let data = {status: 400, message: `Wrong username`}
                let content = JSON.stringify(data);
                response.send(content)   
            }
        });
    } catch (err) {
        console.log(err.message);
        response.status(468);
        response.send(`{"code":468, "status":"${err.message}"}`);
    }
});

export default loginrouter;