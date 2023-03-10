import express from "express";
import indexRouter from './router/index.router.js';
import employeesRouter from './router/employes.routers.js';
import perfilRouter from './router/perfil.router.js';
import documentoRouter  from './router/documento.router.js';
import  usuarioRouter from './router/user.router.js';
import clienteRouter from './router/cliente.router.js';
import habitacionRouter from './router/habitacion.router.js';
import reservaRouter from './router/reserva.router.js';

const app =express();

app.use(express.json());
// app.get('/ping', async(req,res)=>{
//         const [result]=await pool.query('SELECT 1+1 AS result')
//         res.json(result[0])
// })


app.use('/api',employeesRouter);
app.use('/api',perfilRouter);
app.use('/api',documentoRouter);
app.use('/api',usuarioRouter);
app.use('/api',clienteRouter);
app.use('/api',habitacionRouter);
app.use('/api',reservaRouter);

app.use(indexRouter);
// app.get('/',(req,res)=>{
//     // res.send('<h1>hola mundo</h1>')
//     res.json({"saludo":"hola mundo"})
// })

//no fount 
app.use((req,res,next)=>{
    res.status(400).json({
        message:'endpoint not found'
    })
})


app.listen(300,()=>{
    console.log('Se esta ejecutando en el localhost:300')
    // res.({"saludo":"hola mundo"})
    
});


