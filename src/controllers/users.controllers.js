const pool = require('../database')

const getAllUsers = async (req, res, next) => {
   try{
    const allTasks = await pool.query("SELECT * FROM USERS") 
    res.json(allTasks.rows)
   }catch{
    next(error);
   }
};
const getUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    
        if (result.rows.length === 0) 
            res.status(404).json({
            message: 'Usuario no encontrado'
        });
    
        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
    
}
const createUser = async (req, res, next) => {
    const { mail, pass } = req.body;
    try {
        const result = await pool.query("INSERT INTO users (mail, pass) VALUES ($1, $2) RETURNING *", [
            mail, 
            pass
        ]);
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *",[id])
    
        if(result.rowCount === 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
    
        res.sendStatus(204);
    }catch(error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {mail, pass} = req.body;
    
        const result = await pool.query("UPDATE users SET mail = $1, pass = $2 WHERE id = $3 RETURNING *", [mail, pass, id])
        if (result.rows.length === 0) {
            res.status(404).json ({
                message: "Usuario no encontrado",
            })
        }
        res.json(result.rows[0])

    }catch (error) {
        next(error)
    }
    
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}