const Reserve = require("../models/reserve")

async function index(req, res) {
    try {
      const reserve = await Reserve.getAll();
      res.status(200).json(reserve);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

async function showID (req, res) {
    try {
        let id = parseInt(req.params.id)
        const reserve = await Reserve.getOneByID(id);
        res.status(200).json(reserve)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function create (req, res) {
    try {
        const reserve = await Reserve.create()
        res.status(201).json(reserve)
    } catch (err) {
        res.status(400).json({error: err.message})
    }   
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const reserve = await Reserve.getOneByID(id);
        const result = await reserve.destroy();
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = { index, showID, create, destroy }
