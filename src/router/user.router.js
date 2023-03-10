import { Router } from "express";
import {getUsuario,getUsuarios,postUsuario,putUsuario,deleteUsuario} from '../controllers/user.controller.js';




const router=Router();

router.get('/usuarios',getUsuarios)

router.get('/usuario/:id',getUsuario)

router.post('/usuario',postUsuario)

//actualizacion parcial
router.patch('/usuario/:id',putUsuario)

router.delete('/usuario/:id',deleteUsuario)


export default router;

