import sqlite3 from 'sqlite3'
const sql3 = sqlite3.verbose();

const db = new sql3.Database('./mydata.db', sqlite3.OPEN_READWRITE, connected)

function connected(err){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('Created DB')
}

const users = `CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    work_email TEXT,
    personal_email TEXT,
    password TEXT
)`;
db.run(users, [], (err)=> {
    if(err){
        console.log(err.message)
    } else{
        console.log('Created Table user / user exists')
    };
});

const event = `CREATE TABLE IF NOT EXISTS event(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER,
    task TEXT NOT NULL,
    type TEXT NOT NULL,
    starttime TEXT,
    endtime TEXT,
    desc TEXT,
    FOREIGN KEY(user) REFERENCES user(id)
)`;
db.run(event, [], (err)=> {
    if(err){
        console.log(err.message)
    } else{
        console.log('Created Table work_event / work_event already exists')
    }
});


export {db};