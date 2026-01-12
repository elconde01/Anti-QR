const HISTORY_KEY = "qr_history";

function loadHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

function saveToHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function exportCSV() {
  const rows = loadHistory();
  if (!rows.length) return;

  const header = ["Codigo", "Riesgo", "Resultado", "Fecha"];
  const csv = [
    header.join(","),
    ...rows.map(r =>
      `"${r.content}","${r.level}","${r.reasons.join(" | ")}","${new Date(r.date).toLocaleString()}"`
    )
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "qr_historial.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function renderHistory() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "";

  loadHistory().forEach(item => {
    const tr = document.createElement("tr");
    tr.onclick = () => onScan(item.content, false);

    const tdCode = document.createElement("td");
    tdCode.textContent = item.content;

    const tdRisk = document.createElement("td");
    tdRisk.textContent = item.level;
    tdRisk.className =
      item.level === "Alto" ? "risk-high" :
      item.level === "Medio" ? "risk-medium" : "risk-low";

    const tdDesc = document.createElement("td");
    tdDesc.textContent = item.reasons.join(" | ");

    const tdDate = document.createElement("td");
    tdDate.textContent = new Date(item.date).toLocaleString();

    const tdCopy = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "Copiar";
    btn.className = "copy-btn";
    btn.onclick = e => {
      e.stopPropagation();
      navigator.clipboard.writeText(item.content);
    };
    tdCopy.appendChild(btn);

    tr.append(tdCode, tdRisk, tdDesc, tdDate, tdCopy);
    table.appendChild(tr);
  });
}
