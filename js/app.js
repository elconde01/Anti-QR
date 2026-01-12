const scanBtn = document.getElementById("scanAgain");
const clearBtn = document.getElementById("clearHistory");
const exportBtn = document.getElementById("exportCSV");

function startApp() {
  document.getElementById("result").classList.add("hidden");
  startScanner(onScan);
}

function onScan(content, save) {
  const analysis = analyzeQR(content);

  document.getElementById("qrType").textContent = analysis.type;
  document.getElementById("qrContent").textContent = content;
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

  if (save) {
    saveToHistory({
      content,
      level: analysis.level,
      score: analysis.score,
      reasons: analysis.reasons,
      date: new Date().toISOString()
    });
  }
}

scanBtn.onclick = startApp;
clearBtn.onclick = clearHistory;
exportBtn.onclick = exportCSV;

renderHistory();
startApp();
