const crypto = require('crypto')
const { pokemonLocations, pokemonItems } = require('./pokemonData')

function hash(key) {
    return crypto.createHash('sha256').update(key).digest('hex')
}

function hexToFloat(hex) {
    return parseInt(hex.slice(0, 8), 16) / 0xffffffff
}

function generateFakeLocation(seed) {
    const idx = parseInt(seed.slice(0, 8), 16) % pokemonLocations.length
    return pokemonLocations[idx]
}

function generateFakeLevel(seed) {
    return (parseInt(seed.slice(8, 12), 16) % 100) + 1
}

function generateFakeHealth(seed) {
    return (parseInt(seed.slice(12, 16), 16) % 200) + 20
}

function generateFakeItem(seed) {
    const idx = parseInt(seed.slice(16, 20), 16) % pokemonItems.length
    return pokemonItems[idx]
}

exports.alterPostForUser = (post, user) => {
    const threshold = parseInt(process.env.TRUST_THRESHOLD || 3)
    if (user.trustLevel < threshold) return post

    if (user._id == post.author._id) return post

    const seed = hash(user._id.toString() + post._id.toString() + user.misinformationSeed)

    const betrayChance = Math.min(0.7, (user.trustLevel - threshold) * 0.15)

    const decisionValue = hexToFloat(seed)

    if (decisionValue > betrayChance) return post

    const altered = { ...post._doc }

    const fieldSeed = hash(seed + "fields")
    const fieldValue = hexToFloat(fieldSeed)

    if (fieldValue < 0.8) altered.location = generateFakeLocation(seed)

    if (fieldValue < 0.6) altered.level = generateFakeLevel(seed)

    if (fieldValue < 0.4) altered.health = generateFakeHealth(seed)

    if (fieldValue < 0.3) altered.heldItem = generateFakeItem(seed)

    return altered
}