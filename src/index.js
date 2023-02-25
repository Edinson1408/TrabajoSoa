import express from "express";
import indexRouter from './router/index.router.js';
import employeesRouter from './router/employes.routers.js';


const app =express();

app.use(express.json());
// app.get('/ping', async(req,res)=>{
//         const [result]=await pool.query('SELECT 1+1 AS result')
//         res.json(result[0])
// })


app.use('/api',employeesRouter);
app.use(indexRouter);
// app.get('/',(req,res)=>{
//     // res.send('<h1>hola mundo</h1>')
//     res.json({"saludo":"hola mundo"})
// })



app.listen(300,()=>{
    console.log('Se esta ejecutando en el localhost:300')
    // res.({"saludo":"hola mundo"})
    
});


