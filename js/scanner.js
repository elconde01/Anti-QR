const qrReader = new Html5Qrcode("reader");

function startScanner(onScan) {
  qrReader.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    text => {
      qrReader.stop();
      onScan(text, true);
    },
    () => {}
  );
}

document.getElementById("scanImageBtn").addEventListener("click", () => {
  document.getElementById("imageInput").click();
});

document.getElementById("imageInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const img = await createImageBitmap(file);

    if ("BarcodeDetector" in window) {
      const detector = new BarcodeDetector({ formats: ["qr_code"] });
      const codes = await detector.detect(img);

      if (codes.length === 0) {
        alert("No se detectó ningún código QR.");
        return;
      }

      handleScannedCode(codes[0].rawValue);
    } else {
      alert("Tu navegador no soporta lectura desde imagen.");
    }
  } catch (err) {
    console.error(err);
    alert("Error procesando la imagen.");
  } finally {
    e.target.value = "";
  }
});
