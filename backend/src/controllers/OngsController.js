const connection = require ('../database/connection')
const { generateUniqueId } = require('../utils')

module.exports = {
    async index (req, res) {
        const ongs = await connection('ongs').select('*')
        teste()
        // await connection('ongs').select('*').delete()
    
        return res.json(ongs)
    },

    async create (req, res) {
        const { ...data } = req.body

        try {
            data.id = generateUniqueId()
            data.whatsapp = Number("" + 55 + data.whatsapp)
    
            await connection('ongs').insert(data)
        
            return res.json({ id: data.id })
        } catch (error) {
            return res.status(400).json({ status: 'erro!' })
        }
    },

    async delete (req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('ongs')
            .where('id', id)
            .first()

        if (!incident) {
            return res.status(404).json({ error: 'Incident not found.' })
        }

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' })
        }

        await connection('ongs').where('id', id).delete()

        return res.status(204).send()
    }
}