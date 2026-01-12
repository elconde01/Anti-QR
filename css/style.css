function detectQRType(content) {
  if (content.startsWith("WIFI:")) return "WiFi";
  if (content.startsWith("SMSTO:") || content.startsWith("SMS:")) return "SMS";
  if (content.startsWith("https://wa.me") || content.startsWith("whatsapp://"))
    return "WhatsApp";
  if (content.startsWith("http")) return "URL";
  return "Texto";
}

function analyzeQR(content) {
  const type = detectQRType(content);
  let score = 0;
  const reasons = [];

  if (type !== "URL") {
    return {
      type,
      score: 0,
      level: "Bajo",
      reasons: [`QR de tipo ${type}. No ejecuta enlaces web.`]
    };
  }

  const url = content.toLowerCase();

  if (!url.startsWith("https://")) {
    score += 20;
    reasons.push("No utiliza HTTPS");
  }

  if (url.match(/\b\d{1,3}(\.\d{1,3}){3}\b/)) {
    score += 30;
    reasons.push("Usa IP directa");
  }

  if (url.match(/bit\.ly|tinyurl|t\.co|cutt\.ly/)) {
    score += 15;
    reasons.push("Usa acortador de URL");
  }

  if (url.includes("xn--")) {
    score += 30;
    reasons.push("Punycode detectado");
  }

  if (url.match(/\b(login|verify|account|secure|update)\b/)) {
    score += 20;
    reasons.push("Palabras típicas de phishing");
  }

  const tlds = [".xyz", ".top", ".ru", ".tk", ".click"];
  if (tlds.some(tld => url.includes(tld))) {
    score += 15;
    reasons.push("Dominio con TLD sospechoso");
  }

  let level = "Bajo";
  if (score > 30) level = "Medio";
  if (score > 60) level = "Alto";

  return { type, score, level, reasons };
}
