function analyzeQR(content) {
  let score = 0;
  const reasons = [];

  if (!content.startsWith("http")) {
    return {
      score: 0,
      level: "Bajo",
      reasons: ["No es una URL. Riesgo mínimo."]
    };
  }

  const url = content.toLowerCase();

  if (!url.startsWith("https://")) {
    score += 20;
    reasons.push("No utiliza HTTPS");
  }

  if (url.match(/\b\d{1,3}(\.\d{1,3}){3}\b/)) {
    score += 30;
    reasons.push("Usa IP directa en lugar de dominio");
  }

  if (url.match(/bit\.ly|tinyurl|t\.co|cutt\.ly/)) {
    score += 15;
    reasons.push("Usa acortador de URL");
  }

  if (url.includes("xn--")) {
    score += 30;
    reasons.push("Dominio con punycode (posible phishing)");
  }

  if (url.match(/\b(login|verify|account|secure|update)\b/)) {
    score += 20;
    reasons.push("Palabras típicas de phishing");
  }

  const tlds = [".xyz", ".top", ".ru", ".tk", ".click"];
  if (tlds.some(tld => url.includes(tld))) {
    score += 15;
    reasons.push("TLD frecuentemente usado en estafas");
  }

  let level = "Bajo";
  if (score > 30) level = "Medio";
  if (score > 60) level = "Alto";

  return { score, level, reasons };
}
