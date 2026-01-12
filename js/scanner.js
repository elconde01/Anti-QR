let qrScanner;

function handleScannedCode(text) {
  const analysis = analyzeCode(text);
  addToHistory(text, analysis);
}

document.getElementById("startScan").onclick = () => {
  qrScanner = new Html5Qrcode("scanner");

  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    handleScannedCode
  );
};

document.getElementById("stopScan").onclick = () => {
  if (qrScanner) qrScanner.stop();
};

// Escaneo desde imagen
document.getElementById("scanImageBtn").onclick = () =>
  document.getElementById("imageInput").click();

document.getElementById("imageInput").addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;

  const img = await createImageBitmap(file);

  if ("BarcodeDetector" in window) {
    const detector = new BarcodeDetector({ formats: ["qr_code"] });
    const codes = await detector.detect(img);
    if (codes.length) handleScannedCode(codes[0].rawValue);
    else alert("No se detectó QR.");
  } else {
    alert("El navegador no soporta lectura desde imagen.");
  }

  e.target.value = "";
});
