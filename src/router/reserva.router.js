import { Router } from "express";
import {getReservas,getReserva,putReserva,postReserva,deleteReserva} from '../controllers/reserva.controller.js';




const router=Router();

router.get('/reservas',getReservas)
router.get('/reserva/:id',getReserva)
router.post('/reserva',postReserva)
//actualizacion parcial
router.patch('/reserva/:id',putReserva)
router.delete('/reserva/:id',deleteReserva)
export default router;
