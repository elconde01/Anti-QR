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

function renderHistory() {
  const list = document.getElementById("history");
  list.innerHTML = "";

  loadHistory().forEach(item => {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.textContent = `[${item.level}] (${item.type}) ${item.content}`;

    li.onclick = () => {
      onScan(item.content);
    };

    list.appendChild(li);
  });
}

function exportToCSV() {
  const history = loadHistory();
  if (!history.length) return;

  const header = "Fecha,Tipo,Riesgo,Score,Contenido\n";
  const rows = history.map(h =>
    `"${h.date}","${h.type}","${h.level}","${h.score}","${h.content.replace(/"/g, '""')}"`
  ).join("\n");

  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "qr_history.csv";
  a.click();

  URL.revokeObjectURL(url);
}
