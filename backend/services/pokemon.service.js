exports.getPokemonRarity = async (name) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`)
    if (res.status != 200) return "common"

    const data = await res.json()

    if (data.is_legendary || data.is_mythical) return "legendary"

    const captureRate = data.capture_rate

    if (captureRate < 45) return "rare"
    if (captureRate < 120) return "uncommon"

    return "common"

  } catch (err) {
    console.log(err)
    return "common"
  }
}