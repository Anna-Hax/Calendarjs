import express from 'express';
const signuprouter = express.Router();
import {db} from '../connect.js';
import bcrypt from 'bcrypt';

signuprouter.post('/', async (request, response) => {
  console.log(request.body);
  
  response.set('content-type', 'application/json');
  const sql = "INSERT INTO user(name, work_email, personal_email, password) VALUES (?, ?, ?, ?)";
  let newId;
  const password = await bcrypt.hash(request.body.password, 10);
  
  try {
    db.run(sql, [request.body.name, request.body.work_email, request.body.personal_email, password], function (err) {
      if (err){
        throw err;
      } else {
        newId = this.lastID; 
        response.status(201);
        let data = { status: 201, message: `Hello there ${request.body.name}.` };
        let content = JSON.stringify(data);
        response.send(content);
      }
    });
  } catch (err) {
    console.log(err.message);
    response.status(468);
    response.send(`{"code":468, "status":"${err.message}"}`);
  }
});



export default signuprouter