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
