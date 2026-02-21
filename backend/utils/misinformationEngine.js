const crypto = require('crypto')
const { pokemonLocations, pokemonItems } = require('./pokemonData')

function hash(key) {
    return crypto.createHash('sha256').update(key).digest('hex')
}
function generateFakeLocation(seed) {
    const idx = parseInt(seed.slice(0, 8), 16) % pokemonLocations.length;
    return pokemonLocations[idx]
}
function generateFakeLevel(seed) {
    return parseInt(seed.slice(8, 12), 16) % 100 + 1
}
function generateFakeHealth(seed) {
    return parseInt(seed.slice(12, 16), 16) % 100
}
function generateFakeItem(seed) {
    const idx = parseInt(seed.slice(16, 20), 16) % pokemonItems.length;
    return pokemonItems[idx]
}

exports.alterPostForUser = (post, user) => {
    if(user.trustLevel < process.env.TRUST_THRESHOLD) return post;

    const seed = hash(user._id.toString() + post._id.toString() + user.misinformationSeed)

    const altered = { ...post._doc }
    altered.location = generateFakeLocation(seed)
    altered.level = generateFakeLevel(seed)
    altered.health = generateFakeHealth(seed)
    altered.heldItem = generateFakeItem(seed)

    return altered
}