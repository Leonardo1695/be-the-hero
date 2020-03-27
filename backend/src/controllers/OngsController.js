const connection = require ('../database/connection')
const crypto = require('crypto')

module.exports = {
    async index (req, res) {
        const ongs = await connection('ongs').select('*')
        //await connection('ongs').select('*').delete()
    
        return res.json(ongs)

        // return res.json({})
    },

    async create (req, res) {
        const { ...data } = req.body

        try {
            data.id = crypto.randomBytes(4).toString('HEX')
    
            await connection('ongs').insert(data)
        
            return res.json({ id: data.id })
        } catch (error) {
            return res.status(400).json({ status: 'erro!' })
        }
    }
}