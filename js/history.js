const history = [];

function addToHistory(code, analysis) {
  if (history.some(h => h.code === code)) return;

  history.push({
    code,
    risk: analysis.risk,
    description: analysis.description,
    date: new Date().toLocaleString()
  });

  renderHistory();
}

function renderHistory() {
  const container = document.getElementById("historyBody");
  container.innerHTML = "";

  history.forEach(item => {
    const card = document.createElement("div");
    card.className = "history-card";

    card.innerHTML = `
      <div class="history-code">${item.code}</div>

      <div class="history-meta">
        <strong class="${riskClass(item.risk)}">${item.risk}</strong><br>
        ${item.description}<br>
        🕒 ${item.date}
      </div>

      <div class="history-actions">
        <button onclick="copyCode('${item.code}')">📋 Copiar</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function riskClass(risk) {
  if (risk === "Alto") return "risk-high";
  if (risk === "Medio") return "risk-medium";
  return "risk-low";
}

function copyCode(code) {
  navigator.clipboard.writeText(code);
}

document.getElementById("clearHistory").onclick = () => {
  history.length = 0;
  renderHistory();
};

document.getElementById("exportCSV").onclick = () => {
  let csv = "Codigo,Riesgo,Descripcion,Fecha\n";

  history.forEach(h => {
    csv += `"${h.code}","${h.risk}","${h.description}","${h.date}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "historial_qr.csv";
  a.click();
};
