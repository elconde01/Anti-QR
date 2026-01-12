const history = [];

function addToHistory(code, analysis) {
  if (history.some(h => h.code === code)) return;

  const entry = {
    code,
    risk: analysis.risk,
    description: analysis.description,
    date: new Date().toLocaleString()
  };

  history.push(entry);
  renderHistory();
}

function renderHistory() {
  const tbody = document.getElementById("historyBody");
  tbody.innerHTML = "";

  history.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.code}</td>
      <td class="${riskClass(item.risk)}">${item.risk}</td>
      <td>${item.description}</td>
      <td>${item.date}</td>
      <td><button onclick="copyCode('${item.code}')">📋</button></td>
    `;

    tbody.appendChild(tr);
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
