function Feed() {
  const pokemons = [
    { id: 1, name: "Pikachu", type: "Electric" },
    { id: 2, name: "Charizard", type: "Fire" },
    { id: 3, name: "Bulbasaur", type: "Grass" },
    { id: 4, name: "Squirtle", type: "Water" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-6">
      
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center tracking-widest">
        ⚡ POKÉDEX FEED ⚡
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-gray-800 border-2 border-yellow-400 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-red-500 mb-2">
              {pokemon.name}
            </h2>
            <p className="text-yellow-300 font-semibold">
              Type: {pokemon.type}
            </p>

            <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed