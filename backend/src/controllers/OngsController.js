const connection = require ('../database/connection')
const crypto = require('crypto')

module.exports = {
    async index (req, res) {
        const ongs = await connection('ongs').select('*')
    
        return res.json(ongs)
    },

    async create (req, res) {
        const { ...data } = req.body
    
        console.log(data)
    
        data.id = crypto.randomBytes(4).toString('HEX')
    
        await connection('ongs').insert(data)
    
        return res.json({ status: 'success!' })
    }
}