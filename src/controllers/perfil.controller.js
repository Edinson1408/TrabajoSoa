import { pool } from "../db.js";


export const getPerfiles =async(req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM perfil')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


export const getPerfil =async(req,res)=>{
    try {
        const id =req.params.id;
        const [rows] =await pool.query('SELECT * FROM perfil WHERE ID_PERFIL =? ',[id])
        if (rows.length<=0) return res.status(404).json({
            message:"Perfil no Encontrado"
        })    
        res.json(rows[0])  
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}

export const putPerfil = async (req,res)=>{
    
    const id =req.params.id;
    const {name,estado}= req.body;
    const [result] =await pool.query('UPDATE  perfil SET NOMBRE=IFNULL(?,NOMBRE) , ESTADO=IFNULL(?,ESTADO)  WHERE ID_PERFIL =? ',[name,estado,id])

    console.log(result);
    if (result.affectedRows==0) return res.status(404).json({
        message:"usuario no encontrado"
    }) 


    /*obteniendo los datos nuevos */
    
    const [rows] =await pool.query('SELECT * FROM perfil WHERE ID_PERFIL=? ',[id])
    // if (result.changedRows<=0) return res.status(404).json({
    //     message:"no se realizaron actualizaciones"
    // })
    const mesaje  = (result.changedRows==0)? {message:' no se realizo actualizaciones ' , data:rows[0]  }: {message:' se realizo actualizaciones ' , data:rows[0]  }
    res.json(mesaje)  
}




export const postPerfil = async (req,res)=>{
    console.log(req.body);
    const {name,estado}= req.body;
   const [rows] =await pool.query('INSERT INTO perfil (NOMBRE,ESTADO) VALUES (?,?)' 
                    , [name,estado])
    res.json({
        id: rows.insertId,
        name:name,
        estado:estado
    });//insertId
};



export const deletePerfil = async (req,res)=>{
    const id =req.params.id;
    const [result] =await pool.query('DELETE FROM perfil WHERE ID_PERFIL=? ',[id])
// console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:" no se encontro perfil para eliminar"
    })
    res.status(204).json({message:'perfil eliminado'})
    // if (rows.length<=0) return res.status(404).json({
    //     message:"Empleado no encontrado"
    // })
}