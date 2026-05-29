const TYPES = ["realistic","investigative","artistic","social","enterprising","conventional"];

export function calculateResults(answers, professions) {
  const scores = Object.fromEntries(TYPES.map((t) => [t, 0]));
  answers.forEach((a) => {
    if (!a?.weights) return;
    TYPES.forEach((t) => { scores[t] += a.weights[t] || 0; });
  });
  const ranked = professions.map((p) => {
    const codes = p.hollandCodes || {};
    let dot = 0, magP = 0, magQ = 0;
    TYPES.forEach((t) => {
      const q = scores[t] || 0;
      const w = codes[t] || 0;
      dot += q * w; magP += q * q; magQ += w * w;
    });
    const sim = magQ && magP ? dot / (Math.sqrt(magP) * Math.sqrt(magQ)) : 0;
    return { profession: p, match: Math.round(sim * 100) };
  });
  ranked.sort((a, b) => b.match - a.match);
  return { scores, top: ranked.slice(0, 3) };
}
