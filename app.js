startScanner(result => {
  const analysis = analyzeQR(result);

  document.getElementById("qrContent").textContent = result;
  document.getElementById("riskLevel").textContent =
    `${analysis.level} (${analysis.score}/100)`;

  const riskClass =
    analysis.level === "Bajo" ? "low" :
    analysis.level === "Medio" ? "medium" : "high";

  document.getElementById("riskLevel").className = riskClass;

  const list = document.getElementById("reasons");
  list.innerHTML = "";

  analysis.reasons.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    list.appendChild(li);
  });

  document.getElementById("result").classList.remove("hidden");
});
