const connection = require ('../database/connection')

module.exports = {
    async index (req, res) {
        const { page = 1 } = req.query

        // await connection('incidents').delete()

        const [count] = await connection('incidents')
            .count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'    
            ])
        
        res.header('X-Total-Count', count['count(*)'])
        return res.json(incidents)
    },

    async indexByOng (req, res) {
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

        if (!incident) {
            return res.status(404).json({ error: 'Incident not found.' })
        }

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' })
        }

        await connection('incidents').where('id', id).delete()

        return res.status(204).send()
    }
}