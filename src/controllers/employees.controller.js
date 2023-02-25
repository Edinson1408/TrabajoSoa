import { pool } from "../db.js";



export const getEmployess =  async(req,res)=> {
     const [rows] =await pool.query('SELECT * FROM employee ')
    res.json(rows)
}


export const postEmployess = async (req,res)=>{
    console.log(req.body);
    const {name,salary}= req.body;
   const [rows] =await pool.query('INSERT INTO employee (name,salary) VALUES (?,?)' 
                    , [name,salary])
    res.json({
        id: rows.insertId,
        name:name,
        salary:salary
    });//insertId
};


export const getEmploye = async (req,res)=>{
    const id =req.params.id;
    const [rows] =await pool.query('SELECT * FROM employee WHERE id=? ',[id])
    if (rows.length<=0) return res.status(404).json({
        message:"Empleado no encontrado"
    })
    
    res.json(rows[0])  
}

export const putEmployees = async (req,res)=>{
    
    const id =req.params.id;
    const {name,salary}= req.body;
    const [result] =await pool.query('UPDATE  employee SET name=IFNULL(?,name) , salary=IFNULL(?,salary)  WHERE id=? ',[name,salary,id])

    console.log(result);
    if (result.affectedRows==0) return res.status(404).json({
        message:"usuario no encontrado"
    })

    
    

    const [rows] =await pool.query('SELECT * FROM employee WHERE id=? ',[id])
    // if (result.changedRows<=0) return res.status(404).json({
    //     message:"no se realizaron actualizaciones"
    // })
   const mesaje  = (result.changedRows==0)? {message:' no se realizo actualizaciones ' , data:rows[0]  }: {message:' se realizo actualizaciones ' , data:rows[0]  }
    res.json(mesaje)  

}


export const deleteEmployees = async (req,res)=>{
    const id =req.params.id;
    const [result] =await pool.query('DELETE FROM employee WHERE id=? ',[id])
// console.log(result);
    if(result.affectedRows<=0) return res.status(404).json({
        message:" no se encontro ususario para eliminar"
    })
    res.status(204).json({message:'usuario eliminado'})
    // if (rows.length<=0) return res.status(404).json({
    //     message:"Empleado no encontrado"
    // })
}