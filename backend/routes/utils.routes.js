const express = require('express')
const { pokemonTypes, pokemonLocations, pokemonItems } = require('../utils/pokemonData')
const router = express.Router()

function fetchTypes(req, res) {
    return res.json({
        success: true,
        types: pokemonTypes
    })
}

function fetchLocations(req, res) {
    return res.json({
        success: true,
        locations: pokemonLocations
    })
}

function fetchItems(req, res) {
    return res.json({
        success: true,
        items: pokemonItems
    })
}
router.get('/types', fetchTypes)
router.get('/locations', fetchLocations)
router.get('/items', fetchItems)

module.exports = router