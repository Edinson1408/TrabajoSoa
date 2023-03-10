import { pool } from "../db.js";


export const getClientes =async(req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM  cliente')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


export const getCliente =async(req,res)=>{
    try {
        const id =req.params.id;
        const [rows] =await pool.query('SELECT * FROM usuario  cliente ID_CLIENTE   =? ',[id])
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

export const putCliente = async (req,res)=>{
    
    const id =req.params.id;
    const {name,estado}= req.body;
    const [result] =await pool.query('UPDATE  perfil SET NOMBRE=IFNULL(?,NOMBRE) , ESTADO=IFNULL(?,ESTADO)  WHERE ID_PERFIL =? ',[name,estado,id])

    console.log(result);
    if (result.affectedRows==0) return res.status(404).json({
        message:"usuario no encontrado"
    }) 


    /*obteniendo los datos nuevos */
    
    const [rows] =await pool.query('SELECT * FROM usuario WHERE ID_PERFIL=? ',[id])
    // if (result.changedRows<=0) return res.status(404).json({
    //     message:"no se realizaron actualizaciones"
    // })
    const mesaje  = (result.changedRows==0)? {message:' no se realizo actualizaciones ' , data:rows[0]  }: {message:' se realizo actualizaciones ' , data:rows[0]  }
    res.json(mesaje)  
}




export const postCliente = async (req,res)=>{
    console.log(req.body);
    const {ID_TIPO_DOCUMENTO, NRO_DOCUMENTO, NOMBRES, APELLIDOS,CORREO, FECHA_NACIMIENTO, DIRECCION, TELEFONO, ESTADO}= req.body;
    const [rows] =await pool.query(`INSERT INTO cliente (ID_TIPO_DOCUMENTO, NRO_DOCUMENTO, NOMBRES, APELLIDOS,CORREO, FECHA_NACIMIENTO, DIRECCION, TELEFONO, ESTADO)
    VALUES (?,?,?,?,?,?,?,?,?)`, [ ID_TIPO_DOCUMENTO, NRO_DOCUMENTO, NOMBRES, APELLIDOS,CORREO, FECHA_NACIMIENTO, DIRECCION, TELEFONO, ESTADO])
                    

                    
    res.json({
        id: rows.insertId,
        ID_TIPO_DOCUMENTO:ID_TIPO_DOCUMENTO,
        NRO_DOCUMENTO:NRO_DOCUMENTO
    });//insertId
};



export const deleteCliente = async (req,res)=>{
    const id =req.params.id;
    const [result] =await pool.query('DELETE FROM cliente WHERE ID_CLIENTE=? ',[id])
// console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:" no se encontro cliente para eliminar"
    })
    res.status(204).json({message:'cliente eliminado'})
    // if (rows.length<=0) return res.status(404).json({
    //     message:"Empleado no encontrado"
    // })
}