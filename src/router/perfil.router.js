import { Router } from "express";
import {getPerfil,getPerfiles,postPerfil,putPerfil,deletePerfil} from '../controllers/perfil.controller.js';




const router=Router();

router.get('/perfiles',getPerfiles)

router.get('/perfil/:id',getPerfil)

router.post('/perfil',postPerfil)

//actualizacion parcial
router.patch('/perfil/:id',putPerfil)

router.delete('/perfil/:id',deletePerfil)


export default router;

