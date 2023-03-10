import { Router } from "express";
import {getDocumentos,getDocumento,postDocumento,putDocumento,deleteDocumento} from '../controllers/documentos.controller.js';

const router=Router();
router.get('/documentos',getDocumentos)
router.get('/documento/:id',getDocumento)
router.post('/documento',postDocumento)
//actualizacion parcial
router.patch('/documento/:id',putDocumento)
router.delete('/documento/:id',deleteDocumento)
export default router;

