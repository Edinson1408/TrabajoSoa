import { pool } from "../db.js";


export const getSedes =async(req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM sede')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


export const getSede =async(req,res)=>{
    try {
        const id =req.params.id;
        const [rows] =await pool.query('SELECT * FROM sede WHERE ID_SEDE  =? ',[id])
        if (rows.length<=0) return res.status(404).json({
            message:"sede no Encontrado"
        })    
        res.json(rows[0])  
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}

export const putSede = async (req,res)=>{
    
    const id =req.params.id;
    const {name,estado}= req.body;
    const [result] =await pool.query('UPDATE  sede SET NOMBRE=IFNULL(?,NOMBRE) , ESTADO=IFNULL(?,ESTADO)  WHERE ID_SEDE =? ',[name,estado,id])

    console.log(result);
    if (result.affectedRows==0) return res.status(404).json({
        message:"usuario no encontrado"
    }) 


    /*obteniendo los datos nuevos */
    
    const [rows] =await pool.query('SELECT * FROM sede WHERE ID_SEDE=? ',[id])
    // if (result.changedRows<=0) return res.status(404).json({
    //     message:"no se realizaron actualizaciones"
    // })
    const mesaje  = (result.changedRows==0)? {message:' no se realizo actualizaciones ' , data:rows[0]  }: {message:' se realizo actualizaciones ' , data:rows[0]  }
    res.json(mesaje)  
}




export const postSede = async (req,res)=>{
    console.log(req.body);
    const {NOMBRE_SEDE,DIRECCION,DISTRITO}= req.body;
   const [rows] =await pool.query('INSERT INTO sede (NOMBRE_SEDE,DIRECCION,DISTRITO) VALUES (?,?,?)' 
                    , [NOMBRE_SEDE,DIRECCION,DISTRITO])
    res.json({
        id: rows.insertId,
        name:name,
        estado:estado
    });//insertId
};



export const deleteSede = async (req,res)=>{
    const id =req.params.id;
    const [result] =await pool.query('DELETE FROM sede WHERE ID_SEDE=? ',[id])
// console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:" no se encontro sede para eliminar"
    })
    res.status(204).json({message:'sede eliminado'})
    // if (rows.length<=0) return res.status(404).json({
    //     message:"Empleado no encontrado"
    // })
}