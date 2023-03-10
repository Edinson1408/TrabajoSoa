import { pool } from "../db.js";


export const getDocumentos =async(req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM tipo_documento')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


export const getDocumento =async(req,res)=>{
    try {
        const id =req.params.id;
        const [rows] =await pool.query('SELECT * FROM tipo_documento WHERE ID_TIPO_DOCUMENTO =? ',[id])
        if (rows.length<=0) return res.status(404).json({
            message:"tipo documento  no Encontrado"
        })    
        res.json(rows[0])  
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}



export const putDocumento = async (req,res)=>{
    
    const id =req.params.id;
    const {name}= req.body;
    const [result] =await pool.query('UPDATE  tipo_documento SET NOMBRE_DOCUMENTO=IFNULL(?,NOMBRE_DOCUMENTO)  WHERE ID_TIPO_DOCUMENTO =? ',[name,id])

    console.log(result);
    if (result.affectedRows==0) return res.status(404).json({
        message:"tipo de documento  no encontrado"
    }) 


    /*obteniendo los datos nuevos */
    
    const [rows] =await pool.query('SELECT * FROM tipo_documento WHERE ID_TIPO_DOCUMENTO=? ',[id])
    // if (result.changedRows<=0) return res.status(404).json({
    //     message:"no se realizaron actualizaciones"
    // })
    const mesaje  = (result.changedRows==0)? {message:' no se realizo actualizaciones ' , data:rows[0]  }: {message:' se realizo actualizaciones ' , data:rows[0]  }
    res.json(mesaje)  
}




export const postDocumento = async (req,res)=>{
    console.log(req.body);
    const {name}= req.body;
   const [rows] =await pool.query('INSERT INTO tipo_documento (NOMBRE_DOCUMENTO) VALUES (?)' 
                    , [name])
    res.json({
        id: rows.insertId,
        name:name,
        
    });//insertId
};



export const deleteDocumento = async (req,res)=>{
    const id =req.params.id;
    const [result] =await pool.query('DELETE FROM tipo_documento WHERE ID_TIPO_DOCUMENTO=? ',[id])
// console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:" no se encontro tipo_documento para eliminar"
    })
    res.status(204).json({message:'tipo_documento eliminado'})
    // if (rows.length<=0) return res.status(404).json({
    //     message:"Empleado no encontrado"
    // })
}

