const crypto = require("crypto");
const { pokemonLocations, pokemonItems } = require("./pokemonData");
const { getPokemonRarity } = require("../services/pokemon.service");

function hash(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

function hexToFloat(hex) {
  return parseInt(hex.slice(0, 8), 16) / 0xffffffff;
}

function generateFakeLocation(seed) {
  const idx = parseInt(seed.slice(0, 8), 16) % pokemonLocations.length;
  return pokemonLocations[idx];
}

function generateFakeLevel(seed) {
  return (parseInt(seed.slice(8, 12), 16) % 100) + 1;
}

function generateFakeHealth(seed) {
  return (parseInt(seed.slice(12, 16), 16) % 200) + 20;
}

function generateFakeItem(seed) {
  const idx = parseInt(seed.slice(16, 20), 16) % pokemonItems.length;
  return pokemonItems[idx];
}

exports.alterPostForUser = (post, user) => {
  const authorId = post.author._id;
  if (authorId.toString() === user._id.toString()) {
    return post;
  }

  const threshold = parseInt(process.env.TRUST_THRESHOLD);

  if (user.trustLevel < threshold) return post;

  const baseSeed = hash(
    user._id.toString() + post._id.toString() + user.misinformationSeed,
  );

  const rarityWeights = {
    common: 0.5,
    uncommon: 0.75,
    rare: 0.85,
    legendary: 0.95,
  };

  const rarity = post.rarity || 'common'
  const corruptionThreshold = rarityWeights[rarity] || 0.4;

  const eligibility = hexToFloat(baseSeed);

  if (eligibility > corruptionThreshold) {
    return post;
  }

  const altered = { ...post._doc };

  const locationSeed = hash(baseSeed + "location");
  if (hexToFloat(locationSeed) < 0.6)
    altered.location = generateFakeLocation(baseSeed);

  const levelSeed = hash(baseSeed + "level");
  if (hexToFloat(levelSeed) < 0.5) altered.level = generateFakeLevel(baseSeed);

  const healthSeed = hash(baseSeed + "health");
  if (hexToFloat(healthSeed) < 0.4)
    altered.health = generateFakeHealth(baseSeed);

  const itemSeed = hash(baseSeed + "heldItem");
  if (hexToFloat(itemSeed) < 0.3) altered.heldItem = generateFakeItem(baseSeed);
  return altered;
};
