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

    if (item.level === "Alto") tr.classList.add("high-risk");
    else if (item.level === "Medio") tr.classList.add("medium-risk");

    const tdDate = document.createElement("td");
    tdDate.textContent = new Date(item.date).toLocaleString();

    const tdContent = document.createElement("td");
    tdContent.textContent = item.content;
    tdContent.onclick = () => onScan(item.content);

    const tdAction = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "Copiar";
    btn.className = "copy-btn";
    btn.onclick = e => {
      e.stopPropagation();
      copyToClipboard(item.content);
    };

    tdAction.appendChild(btn);

    tr.appendChild(tdDate);
    tr.appendChild(tdContent);
    tr.appendChild(tdAction);
    table.appendChild(tr);
  });
}
