import { Router } from "express";

import {deleteEmployees, getEmployess, postEmployess, putEmployees,getEmploye} from '../controllers/employees.controller.js';

const router=Router();

router.get('/empleados',getEmployess)

router.get('/empleados/:id',getEmploye)

router.post('/empleados',postEmployess)

//actualizacion parcial
router.patch('/empleados/:id',putEmployees)

router.delete('/empleados/:id',deleteEmployees)


export default router;