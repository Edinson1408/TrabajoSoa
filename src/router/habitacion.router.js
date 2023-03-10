import { Router } from "express";
import {getHabitaciones,getHabitacion,postHabitacion,putHabitacion,deleteHabitacion} from '../controllers/habitacion.controller.js';




const router=Router();

router.get('/habitaciones',getHabitaciones)
router.get('/habitacion/:id',getHabitacion)
router.post('/habitacion',postHabitacion)
//actualizacion parcial
router.patch('/habitacion/:id',putHabitacion)
router.delete('/habitacion/:id',deleteHabitacion)
export default router;

