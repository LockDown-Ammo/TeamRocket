const fetch = require('node-fetch')

exports.getPokemonRarity = async (name) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`)
    if (!res.ok) return "common"

    const data = await res.json()

    if (data.is_legendary || data.is_mythical) return "legendary"

    const captureRate = data.capture_rate

    if (captureRate < 45) return "rare"
    if (captureRate < 120) return "uncommon"

    return "common"

  } catch (err) {
    return "common"
  }
}