function analyzeCode(text) {
  let risk = "Bajo";
  let description = "No se detectaron patrones peligrosos.";

  if (/http:/i.test(text)) {
    risk = "Alto";
    description = "URL insegura (HTTP).";
  } else if (/bit\.ly|tinyurl|t\.co/i.test(text)) {
    risk = "Medio";
    description = "URL acortada. Puede ocultar el destino real.";
  } else if (/^WIFI:/i.test(text)) {
    risk = "Medio";
    description = "QR de WiFi. Puede forzar conexión.";
  } else if (/^SMSTO:|^SMS:/i.test(text)) {
    risk = "Medio";
    description = "QR de SMS. Puede enviar mensajes sin aviso.";
  } else if (/wa\.me|whatsapp/i.test(text)) {
    risk = "Medio";
    description = "QR de WhatsApp.";
  }

  return { risk, description };
}
