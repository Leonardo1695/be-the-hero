const connection = require ('../database/connection')

module.exports = {
    async index (req, res) {
        const ong_id = req.headers.authorization

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')
    
        return res.json(incidents)
    },

    async create (req, res) {
        const { ...data } = req.body
        const ong_id = req.headers.authorization
        data.ong_id = ong_id

        const [id] = await connection('incidents').insert(data)

        return res.json({ id })
    },

    async delete (req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' })
        }

        await connection('incidents').where('id', id).delete()

        return res.status(204).send()
    }
}