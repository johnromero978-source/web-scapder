(function () {
  const detectTabs = document.querySelectorAll(".detection-tabs [role=\"tab\"]");
  const detectChips = document.querySelectorAll(".detection-chip");
  const detectCount = document.getElementById("detection-count");
  const detectViewport = document.querySelector(".detection-viewport");
  const detectOverlay = document.querySelector(".detection-overlay");

  function updateDetectCount() {
    if (!detectCount) return;
    const visible = [...detectChips].filter(function (c) {
      return !c.classList.contains("hidden-by-filter");
    }).length;
    detectCount.textContent = visible + " detecciones activas";
  }

  function filterByScenario(scenario) {
    detectChips.forEach(function (chip) {
      if (scenario === "all" || chip.dataset.scenario === scenario) {
        chip.classList.remove("hidden-by-filter");
      } else {
        chip.classList.add("hidden-by-filter");
      }
    });
    updateDetectCount();
  }

  function createDetectionSpark(xPct, yPct) {
    if (!detectOverlay) return;

    var activeTab = document.querySelector(".detection-tabs [aria-selected=\"true\"]");
    var scenario = activeTab ? activeTab.dataset.scenario : "person";
    var label = scenario === "vehicle" ? "Vehículo" : scenario === "object" ? "Objeto" : "Persona";
    var confidence = (90 + Math.random() * 9.9).toFixed(1);

    var spark = document.createElement("div");
    spark.className = "detection-chip click-spark";
    spark.setAttribute("aria-hidden", "true");
    spark.style.left = xPct + "%";
    spark.style.top = yPct + "%";
    spark.innerHTML =
      "<span class=\"detection-label\">" + label + "</span>" +
      "<span class=\"detection-confidence\">" + confidence + "%</span>";

    detectOverlay.appendChild(spark);

    spark.addEventListener("animationend", function () {
      spark.remove();
    });
  }

  if (detectTabs.length) {
    detectTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        detectTabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        filterByScenario(tab.dataset.scenario);
      });

      tab.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();

        var tabs = [...detectTabs];
        var currentIndex = tabs.indexOf(tab);
        var direction = e.key === "ArrowRight" ? 1 : -1;
        var nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];

        nextTab.focus();
        nextTab.click();
      });
    });
    var initialTab = document.querySelector(".detection-tabs [aria-selected=\"true\"]");
    filterByScenario(initialTab ? initialTab.dataset.scenario : "person");
  }

  if (detectViewport && detectOverlay) {
    detectViewport.addEventListener("click", function (e) {
      if (e.target.closest(".detection-chip")) return;

      var rect = detectViewport.getBoundingClientRect();
      var xPct = ((e.clientX - rect.left) / rect.width) * 100;
      var yPct = ((e.clientY - rect.top) / rect.height) * 100;

      createDetectionSpark(xPct, yPct);
    });

    detectViewport.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      createDetectionSpark(50, 50);
    });
  }

  var heatmapSlider = document.getElementById("heatmap-slider");
  var heatmapStage = document.querySelector(".heatmap-stage");
  if (heatmapSlider && heatmapStage) {
    heatmapSlider.addEventListener("input", function () {
      heatmapStage.style.setProperty("--heatmap-progress", heatmapSlider.value);
    });
    heatmapStage.style.setProperty("--heatmap-progress", heatmapSlider.value);
  }
})();

const form = document.getElementById("demo-form");
const message = document.getElementById("form-message");

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = "";
    message.className = "form-message";

    const fields = [...form.querySelectorAll("input[required]")];
    let hasError = false;

    fields.forEach((field) => {
      field.classList.remove("input-error");
      if (!field.value.trim() || !field.checkValidity()) {
        hasError = true;
        field.classList.add("input-error");
      }
    });

    if (hasError) {
      message.textContent = "Completa todos los campos obligatorios con información válida.";
      message.classList.add("error");
      return;
    }

    message.textContent = "Gracias. El equipo de Scapder te contactará pronto.";
    message.classList.add("success");
    form.reset();
  });
}

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}
