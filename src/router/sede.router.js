import { Router } from "express";
import {getSedes,getSede,postSede,putSede,deleteSede} from '../controllers/sede.controllers.js';




const router=Router();
router.get('/sedes',getPerfiles)
router.get('/sede/:id',getPerfil)
router.post('/sede',postPerfil)
//actualizacion parcial
router.patch('/sede/:id',putPerfil)
router.delete('/sede/:id',deletePerfil)
export default router;

