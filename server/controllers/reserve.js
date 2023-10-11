const Reserve = require("../models/reserve")

async function create (req, res) {
    try {
        const reserve = await Reserve.create()
        res.status(201).json(reserve)
    } catch (err) {
        res.status(400).json({error: err.message})
    }   
}

module.exports = { create }
