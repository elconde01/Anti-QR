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
    li.textContent = `[${item.level}] ${item.content}`;
    list.appendChild(li);
  });
}
