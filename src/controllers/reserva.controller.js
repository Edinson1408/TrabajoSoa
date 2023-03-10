import { pool } from "../db.js";


export const getReservas =async(req,res)=>{
    try {
        const [rows] = await pool.query(`SELECT A.ID_RESERVA,A.ID_CLIENTE,B.NRO_DOCUMENTO AS NRO_DOCUMENTO_CLIENTE ,CONCAT(B.NOMBRES,' ', B.APELLIDOS) AS NOMBRE_CLIENTE ,B.CORREO AS CORREO_CLIENTE,
                                            B.DIRECCION AS  DIRECCION_CLIENTE ,B.TELEFONO AS TELEFONO_CLIENTE ,
                                            A.ID_USUARIO,CONCAT(C.NOMBRES,' ',C.APELLIDOS) AS NOMBRE_USUARIO,
                                            A.ID_HABITACION,
                                            F.NOMBRE_SEDE,F.DIRECCION,F.DISTRITO,G.NOMBRE_PISO,H.NOMBRE_CATEGORIA,
                                            A.FECHA_RESERVACION,A.FECHA_INICIO,A.FECHA_SALIDA,A.CANT_ADULTOS,A.CANT_MENORES,
                                            A.ESTADO,A.HORA_INICIO,A.HORA_SALIDA
                                            FROM reserva A INNER JOIN cliente B ON
                                            B.ID_CLIENTE=A.ID_CLIENTE
                                            INNER JOIN  usuario C ON
                                            C.ID_USUARIO=A.ID_USUARIO 
                                            INNER JOIN habitacion D ON 
                                            D.ID_HABITACION=A.ID_HABITACION
                                            INNER JOIN sede F ON 
                                            F.ID_SEDE=D.ID_SEDE 
                                            INNER JOIN piso G ON 
                                            G.ID_PISO=D.ID_PISO 
                                            INNER JOIN categoria H ON 
                                            H.ID_CATEGORIA=D.ID_CATEGORIA
        ;`)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message:"Ocurrio un error"
        })
    }
}


export const getReserva =async(req,res)=>{
    try {
        const id =req.params.id;
        const [rows] =await pool.query('SELECT * FROM reserva WHERE ID_RESERVA =? ',[id])
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

export const putReserva = async (req,res)=>{
    
    
    const id =req.params.id;
    const {ID_CLIENTE,ID_USUARIO,ID_HABITACION,FECHA_RESERVACION,FECHA_INICIO,FECHA_SALIDA,CANT_ADULTOS,CANT_MENORES,ESTADO,HORA_INICIO,HORA_SALIDA}= req.body;
    const [result] =await pool.query(`UPDATE  reserva SET ID_CLIENTE=IFNULL(?,ID_CLIENTE)  ,  
                                                ID_USUARIO=IFNULL(?,ID_USUARIO)  
                                                ,ID_HABITACION=IFNULL(?,ID_HABITACION) 
                                                ,FECHA_RESERVACION=IFNULL(?,FECHA_RESERVACION) 
                                                ,FECHA_INICIO=IFNULL(?,FECHA_INICIO) 
                                                ,FECHA_SALIDA=IFNULL(?,FECHA_SALIDA) 
                                                ,CANT_ADULTOS=IFNULL(?,CANT_ADULTOS) 
                                                ,CANT_MENORES=IFNULL(?,CANT_MENORES) 
                                                ,ESTADO=IFNULL(?,ESTADO) 
                                                ,HORA_INICIO=IFNULL(?,HORA_INICIO) 
                                                ,HORA_SALIDA=IFNULL(?,HORA_SALIDA) 
                                        WHERE ID_RESERVA  =? `,
    [ID_CLIENTE,ID_USUARIO,ID_HABITACION,new Date(FECHA_RESERVACION), new Date(FECHA_INICIO), new Date(FECHA_SALIDA) ,CANT_ADULTOS,CANT_MENORES,ESTADO,HORA_INICIO,HORA_SALIDA,id])

    console.log(result);
    if (result.affectedRows==0) return res.status(404).json({
        message:"reserva no encontrado"
    }) 


    /*obteniendo los datos nuevos */
    
    const [rows] =await pool.query(`SELECT A.ID_RESERVA,A.ID_CLIENTE,B.NRO_DOCUMENTO AS NRO_DOCUMENTO_CLIENTE ,CONCAT(B.NOMBRES,' ', B.APELLIDOS) AS NOMBRE_CLIENTE ,B.CORREO AS CORREO_CLIENTE,
                                        B.DIRECCION AS  DIRECCION_CLIENTE ,B.TELEFONO AS TELEFONO_CLIENTE ,
                                        A.ID_USUARIO,CONCAT(C.NOMBRES,' ',C.APELLIDOS) AS NOMBRE_USUARIO,
                                        A.ID_HABITACION,
                                        F.NOMBRE_SEDE,F.DIRECCION,F.DISTRITO,G.NOMBRE_PISO,H.NOMBRE_CATEGORIA,
                                        A.FECHA_RESERVACION,A.FECHA_INICIO,A.FECHA_SALIDA,A.CANT_ADULTOS,A.CANT_MENORES,
                                        A.ESTADO,A.HORA_INICIO,A.HORA_SALIDA
                                        FROM reserva A INNER JOIN cliente B ON
                                        B.ID_CLIENTE=A.ID_CLIENTE
                                        INNER JOIN  usuario C ON
                                        C.ID_USUARIO=A.ID_USUARIO 
                                        INNER JOIN habitacion D ON 
                                        D.ID_HABITACION=A.ID_HABITACION
                                        INNER JOIN sede F ON 
                                        F.ID_SEDE=D.ID_SEDE 
                                        INNER JOIN piso G ON 
                                        G.ID_PISO=D.ID_PISO 
                                        INNER JOIN categoria H ON 
                                        H.ID_CATEGORIA=D.ID_CATEGORIA
                                        WHERE A.ID_RESERVA=?
                                        ;`,[id])
    // if (result.changedRows<=0) return res.status(404).json({
    //     message:"no se realizaron actualizaciones"
    // })
    const mesaje  = (result.changedRows==0)? {message:' no se realizo actualizaciones ' , data:rows[0]  }: {message:' se realizo actualizaciones ' , data:rows[0]  }
    res.json(mesaje)  
}




export const postReserva = async (req,res)=>{
    try {
        console.log(req.body);
        const {ID_CLIENTE, ID_USUARIO, ID_HABITACION, FECHA_RESERVACION, FECHA_INICIO, FECHA_SALIDA, CANT_ADULTOS, CANT_MENORES, ESTADO, HORA_INICIO, HORA_SALIDA}= req.body;    
        const [rows] =await pool.query(`INSERT INTO reserva( ID_CLIENTE, ID_USUARIO, ID_HABITACION, FECHA_RESERVACION, FECHA_INICIO, FECHA_SALIDA, CANT_ADULTOS, CANT_MENORES, ESTADO, HORA_INICIO, HORA_SALIDA) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
                                        , [ID_CLIENTE, ID_USUARIO, ID_HABITACION, new Date(FECHA_RESERVACION) , new Date(FECHA_INICIO) , FECHA_SALIDA, CANT_ADULTOS, CANT_MENORES, ESTADO, HORA_INICIO, HORA_SALIDA])
            res.json({
                id: rows.insertId,
                ID_CLIENTE:ID_CLIENTE,
                ID_USUARIO:ID_USUARIO
            });//insertId    

    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
    
};



export const deleteReserva= async (req,res)=>{
    const id =req.params.id;
    const [result] =await pool.query('DELETE FROM reserva WHERE ID_RESERVA=? ',[id])
// console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:" no se encontro reserva para eliminar"
    })
    res.status(200).json({message:'reserva eliminado'})
    // if (rows.length<=0) return res.status(404).json({
    //     message:"Empleado no encontrado"
    // })
}