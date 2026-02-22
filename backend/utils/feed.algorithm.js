const { hash } = require("./misinformationEngine");


function hexToFloat(hex) {
  return parseInt(hex.slice(0, 8), 16) / 0xffffffff;
}

function getEligibiltyScore(post, user) {
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
  return (eligibility > corruptionThreshold) * 1000000
}

module.exports.rankPosts = (posts, user) => {
  return posts.sort((a, b) => {
    const avgA = a.ratings.length ? a.ratings.reduce((sum, r) => sum + r.value, 0) / a.ratings.length : 3;

    const avgB = b.ratings.length ? b.ratings.reduce((sum, r) => sum + r.value, 0) / b.ratings.length : 3;

    const misinfoReportsA = a.reports.filter((r) => r.reason === "misinformation",).length;
    const misinfoReportsB = b.reports.filter((r) => r.reason === "misinformation",).length;

    const scoreA = (new Date(a.createdAt).getTime() - Date.now()) + misinfoReportsA * 1000000 - avgA * 500000 + getEligibiltyScore(a, user);

    const scoreB = (new Date(b.createdAt).getTime() - Date.now()) + misinfoReportsB * 1000000 - avgB * 500000 + getEligibiltyScore(b, user);
    return scoreB - scoreA;
  });
};
