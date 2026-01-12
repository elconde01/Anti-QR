const scanBtn = document.getElementById("scanAgain");

function startApp() {
  document.getElementById("result").classList.add("hidden");
  scanBtn.classList.add("hidden");
  startScanner(onScan);
}

function onScan(result) {
  const analysis = analyzeQR(result);

  document.getElementById("qrContent").textContent = result;
  document.getElementById("riskLevel").textContent =
    `${analysis.level} (${analysis.score}/100)`;

  document.getElementById("riskLevel").className =
    analysis.level === "Bajo" ? "low" :
    analysis.level === "Medio" ? "medium" : "high";

  const list = document.getElementById("reasons");
  list.innerHTML = "";
  analysis.reasons.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    list.appendChild(li);
  });

  document.getElementById("result").classList.remove("hidden");
  scanBtn.classList.remove("hidden");

  saveToHistory({
    content: result,
    level: analysis.level,
    score: analysis.score,
    date: new Date().toISOString()
  });
}

scanBtn.onclick = startApp;
document.getElementById("clearHistory").onclick = clearHistory;

renderHistory();
startApp();
