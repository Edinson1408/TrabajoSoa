import { Router } from "express";
import {getClientes,getCliente,postCliente,putCliente,deleteCliente} from '../controllers/clientes.controllers.js';

const router=Router();
router.get('/clientes',getClientes)
router.get('/cliente/:id',getCliente)
router.post('/cliente',postCliente)
//actualizacion parcial
router.patch('/cliente/:id',putCliente)
router.delete('/cliente/:id',deleteCliente)
export default router;

