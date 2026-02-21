module.exports.rankPosts = (posts) => {
  return posts.sort((a, b) => {
    const avgA = a.ratings.length ? a.ratings.reduce((sum, r) => sum + r.value, 0) / a.ratings.length : 3;

    const avgB = b.ratings.length ? b.ratings.reduce((sum, r) => sum + r.value, 0) / b.ratings.length : 3;

    const misinfoReportsA = a.reports.filter((r) => r.reason === "Misinformation",).length;
    const misinfoReportsB = b.reports.filter((r) => r.reason === "Misinformation",).length;

    const scoreA = (new Date(a.createdAt).getTime() - Date.now()) + misinfoReportsA * 1000000 - avgA * 500000;

    const scoreB = (new Date(b.createdAt).getTime() - Date.now()) + misinfoReportsB * 1000000 - avgB * 500000;

    return scoreB - scoreA;
  });
};
