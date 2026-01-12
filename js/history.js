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

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function renderHistory() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "";

  loadHistory().forEach(item => {
    const tr = document.createElement("tr");

    tr.onclick = () => onScan(item.content, false); // reanálisis SIN guardar

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
      copyToClipboard(item.content);
    };

    tdCopy.appendChild(btn);

    tr.append(tdCode, tdRisk, tdDesc, tdDate, tdCopy);
    table.appendChild(tr);
  });
}
