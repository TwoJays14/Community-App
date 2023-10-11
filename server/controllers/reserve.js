const Reserve = require("../models/reserve")

async function create (req, res) {
    try {
        data = req.body
        const reserve = await Reserve.create(data)
        res.status(201).json(reserve)
    } catch (err) {
        res.status(400).json({error: err.message})
    }   
}

module.exports = { create }
