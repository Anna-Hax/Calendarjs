import cors from 'cors'
const corsOptions = {
    origin: ['http://127.0.0.1:5500', 'https://glittering-douhua-b8e0a1.netlify.app'],
    optionsSuccessStatus: 200,
};
 


export default cors(corsOptions)