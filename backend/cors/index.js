import cors from 'cors'
const corsOptions = {
    origin: ['http://127.0.0.1:5500', 'https://calendarjs-qc65.onrender.com'],
    optionsSuccessStatus: 200,
};
 


export default cors(corsOptions)