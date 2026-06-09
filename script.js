document.documentElement.classList.add("reveal-enabled");

const translations = {
	es: {
		skip: "Saltar al contenido principal",
		navApproach: "Enfoque",
		navCases: "Casos",
		navPortfolio: "Portafolio",
		navEdgeSight: "Edge Sight AI",
		navContact: "Contacto",
		navToggleLabel: "Abrir navegación",
		navAria: "Secciones",
		languageAria: "Selector de idioma",
		heroPanelAria: "Síntesis de Scapder",
		methodAria: "Método Scapder",
		flowAria: "Flujo Edge Sight AI",
		footerAria: "Footer",
		edgesightImageAlt:
			"Vista de cámara con detección de personas y elementos de seguridad",
		ctaTalk: "Hablemos",
		ctaPortfolio: "Ver portafolio",
		heroSystem: "Your Data has a Voice",
		heroTitle: "Scapder",
		heroLead:
			"Transformamos datos complejos en inteligencia accionable para que equipos, operaciones y productos tomen mejores decisiones con modelos de IA aplicados al mundo real.",
		heroPanelKicker: "Transformar datos en inteligencia accionable",
		heroPanelOneLabel: "Origen",
		heroPanelOneValue: "Raíces académicas y científicas",
		heroPanelTwoLabel: "Método",
		heroPanelTwoValue: "Co-creación y transferencia",
		heroPanelThreeLabel: "Resultado",
		heroPanelThreeValue: "Capacidades internas de decisión",
		approachTitle: "No vendemos software genérico. Construimos capacidad.",
		approachLead:
			"Co-creamos con nuestros clientes y transferimos conocimiento a sus equipos. El objetivo no es dependencia tecnológica: es que la organización convierta sus propios datos en decisiones.",
		methodOneTitle: "Co-creación",
		methodOneCopy:
			"Modelos y productos diseñados con el contexto real del cliente.",
		methodTwoTitle: "Transferencia",
		methodTwoCopy:
			"Conocimiento técnico convertido en práctica operativa del equipo.",
		methodThreeTitle: "Capacidad interna",
		methodThreeCopy:
			"Sistemas que sostienen decisiones sin crear dependencia ciega.",
		proofLabel: "Experiencia aplicada en",
		proofOne: "construcción",
		proofTwo: "información legal",
		proofThree: "retail",
		proofFour: "logística",
		proofFive: "transporte marítimo",
		casesTitle: "Casos documentados en datos reales.",
		casesLead:
			"Los casos del overview muestran un patrón: partir de datos dispersos, modelar inteligencia aplicada y devolver decisiones accionables.",
		caseCeleusDomain: "Inmobiliario y construcción",
		caseCeleusTitle: "Priorizar prospectos con probabilidad científica.",
		caseCeleusCopy:
			"Scapder procesó 20,000+ registros bajo 300 variables de comportamiento e identificó 5 perfiles reales de comprador con clustering dinámico.",
		caseCeleusM1: "registros procesados",
		caseCeleusM2: "variables analizadas",
		caseCeleusM3: "perfiles identificados",
		caseLegisDomain: "Información legal",
		caseLegisTitle: "Contexto jurídico para reducir búsquedas fallidas.",
		caseLegisCopy:
			"Algoritmos de Machine Learning contextual redujeron búsquedas sin resultado desde 76% hasta un mínimo operativo documentado.",
		caseLegisM1: "búsquedas fallidas",
		caseLegisM2: "accesibilidad",
		caseLegisM3: "precisión de pertinencia",
		casePuppisDomain: "Retail de mascotas",
		casePuppisTitle: "Demanda geolocalizada sin depender de programación.",
		casePuppisCopy:
			"Scapder convirtió datos técnicos complejos en interfaces visuales intuitivas, procesando seis mil clientes mensuales.",
		casePuppisM1: "listas exactas",
		casePuppisM2: "clientes al mes",
		casePuppisM3: "autonomía visual",
		caseCanalName: "Canal de Panamá",
		caseCanalDomain: "Logística y transporte marítimo",
		caseCanalTitle: "Predecir rutas dinámicas con inteligencia artificial.",
		caseCanalCopy:
			"Miles de millones de registros históricos y operativos fueron transformados en enrutamiento inteligente y trayectorias dinámicas seguras.",
		caseCanalM1: "registros satelitales",
		caseCanalM2: "registros cada 15 min",
		caseCanalM3Strong: "Óptimo",
		caseCanalM3: "consumo en tránsito",
		portfolioTitle:
			"Tres plataformas. Una misión: transformar datos en decisiones.",
		edgeOneLiner:
			"Percepción operativa para infraestructuras de video físicas.",
		edgePillarTwo: "Tiempo Real",
		edgePillarThree: "Soberanía de Datos",
		sentientumCategory: "Audiencias Sintéticas · AI Agents",
		sentientumOneLiner: "Simulación predictiva para ensayar el futuro hoy.",
		sentientumPillarOne: "Simulación",
		sentientumPillarTwo: "Escala",
		sentientumPillarThree: "Sin riesgo",
		mlspecCategory: "MLOps · Gobernanza de IA",
		mlspecOneLiner: "Sistema operativo para escalar modelos de ML.",
		mlspecPillarOne: "Lab a producción",
		mlspecPillarTwo: "Gobernanza automática",
		mlspecPillarThree: "Agentes + humanos",
		edgesightTitle:
			"Tu infraestructura de video ya existe. Ahora puede pensar.",
		edgesightLead:
			"Edge Sight AI opera sobre cámaras existentes, procesa en el borde y detecta eventos en milisegundos sin sacar los datos del perímetro.",
		flowOne: "Cámaras existentes",
		flowTwo: "Edge AI local",
		flowThree: "Visión computacional",
		flowFour: "Detección en ms",
		flowFive: "Respuesta autónoma",
		capabilityTitle:
			"Un modelo repetible para convertir información en capacidad.",
		capabilityOneTitle: "Entender datos y contexto",
		capabilityOneCopy:
			"Mapear señales, restricciones y decisiones que el negocio necesita tomar.",
		capabilityTwoTitle: "Modelar inteligencia aplicada",
		capabilityTwoCopy:
			"Construir modelos ajustados a datos reales y no a abstracciones genéricas.",
		capabilityThreeTitle: "Integrar en operación real",
		capabilityThreeCopy:
			"Llevar la inteligencia al flujo donde se decide, detecta o prioriza.",
		capabilityFourTitle: "Transferir capacidades",
		capabilityFourCopy:
			"Acompañar al equipo para que el sistema se vuelva una práctica interna.",
		contactTitle: "Convierte tus datos en una capacidad interna de decisión.",
		contactLead:
			"Si tu organización tiene datos dispersos, infraestructura existente o modelos que necesitan llegar a operación, Scapder puede ayudarte a convertirlos en inteligencia accionable.",
		footerTagline: "Transformar datos en inteligencia accionable.",
		navTeam: "Equipo",
		teamTitle: "Equipo",
		teamLead: "El equipo que convierte datos complejos en inteligencia accionable.",
		teamAria: "Equipo Scapder",
		teamMember01Name: "Persona 01",
		teamMember01Role: "Rol",
		teamMember01ImageAlt: "Persona 01",
		teamMember02Name: "Persona 02",
		teamMember02Role: "Rol",
		teamMember02ImageAlt: "Persona 02",
		teamMember03Name: "Persona 03",
		teamMember03Role: "Rol",
		teamMember03ImageAlt: "Persona 03",
		teamMember04Name: "Persona 04",
		teamMember04Role: "Rol",
		teamMember04ImageAlt: "Persona 04",
	},
	en: {
		skip: "Skip to main content",
		navApproach: "Approach",
		navCases: "Cases",
		navPortfolio: "Portfolio",
		navEdgeSight: "Edge Sight AI",
		navContact: "Contact",
		navToggleLabel: "Open navigation",
		navAria: "Sections",
		languageAria: "Language selector",
		heroPanelAria: "Scapder summary",
		methodAria: "Scapder method",
		flowAria: "Edge Sight AI flow",
		footerAria: "Footer",
		edgesightImageAlt: "Camera view with people and safety element detection",
		ctaTalk: "Talk to us",
		ctaPortfolio: "View portfolio",
		heroSystem: "Your Data has a Voice",
		heroTitle: "Scapder",
		heroLead:
			"We transform complex data into actionable intelligence so teams, operations, and products can make better decisions with AI models applied to the real world.",
		heroPanelKicker: "Turning data into actionable intelligence",
		heroPanelOneLabel: "Origin",
		heroPanelOneValue: "Academic and scientific roots",
		heroPanelTwoLabel: "Method",
		heroPanelTwoValue: "Co-creation and transfer",
		heroPanelThreeLabel: "Outcome",
		heroPanelThreeValue: "Internal decision capabilities",
		approachTitle: "We do not sell generic software. We build capability.",
		approachLead:
			"We co-create with our clients and transfer knowledge to their teams. The goal is not technology dependency: it is helping the organization turn its own data into decisions.",
		methodOneTitle: "Co-creation",
		methodOneCopy:
			"Models and products designed around the client's real context.",
		methodTwoTitle: "Transfer",
		methodTwoCopy:
			"Technical knowledge converted into operational practice for the team.",
		methodThreeTitle: "Internal capability",
		methodThreeCopy:
			"Systems that sustain decisions without creating blind dependency.",
		proofLabel: "Applied experience in",
		proofOne: "construction",
		proofTwo: "legal information",
		proofThree: "retail",
		proofFour: "logistics",
		proofFive: "maritime transportation",
		casesTitle: "Documented cases built on real data.",
		casesLead:
			"The overview cases show a clear pattern: start with fragmented data, model applied intelligence, and return actionable decisions.",
		caseCeleusDomain: "Real estate and construction",
		caseCeleusTitle: "Prioritizing prospects with scientific probability.",
		caseCeleusCopy:
			"Scapder processed 20,000+ records under 300 behavioral variables and identified 5 real buyer profiles with dynamic clustering.",
		caseCeleusM1: "processed records",
		caseCeleusM2: "analyzed variables",
		caseCeleusM3: "identified profiles",
		caseLegisDomain: "Legal information",
		caseLegisTitle: "Legal context to reduce failed searches.",
		caseLegisCopy:
			"Contextual Machine Learning algorithms reduced searches with no results from 76% to a documented operational minimum.",
		caseLegisM1: "failed searches",
		caseLegisM2: "accessibility",
		caseLegisM3: "relevance precision",
		casePuppisDomain: "Pet retail",
		casePuppisTitle: "Geolocated demand without relying on programming.",
		casePuppisCopy:
			"Scapder converted complex technical data into intuitive visual interfaces, processing six thousand monthly clients.",
		casePuppisM1: "exact lists",
		casePuppisM2: "clients per month",
		casePuppisM3: "visual autonomy",
		caseCanalName: "Panama Canal",
		caseCanalDomain: "Logistics and maritime transportation",
		caseCanalTitle: "Predicting dynamic routes with artificial intelligence.",
		caseCanalCopy:
			"Billions of historical and operational records were transformed into intelligent routing and safe dynamic trajectories.",
		caseCanalM1: "satellite records",
		caseCanalM2: "records every 15 min",
		caseCanalM3Strong: "Optimal",
		caseCanalM3: "fuel consumption in transit",
		portfolioTitle:
			"Three platforms. One mission: turning data into decisions.",
		edgeOneLiner: "Operational perception for physical video infrastructure.",
		edgePillarTwo: "Real Time",
		edgePillarThree: "Data Sovereignty",
		sentientumCategory: "Synthetic Audiences · AI Agents",
		sentientumOneLiner: "Predictive simulation to rehearse the future today.",
		sentientumPillarOne: "Simulation",
		sentientumPillarTwo: "Scale",
		sentientumPillarThree: "No risk",
		mlspecCategory: "MLOps · AI Governance",
		mlspecOneLiner: "An operating system for scaling ML models.",
		mlspecPillarOne: "Lab to production",
		mlspecPillarTwo: "Automatic governance",
		mlspecPillarThree: "Agents + humans",
		edgesightTitle:
			"Your video infrastructure already exists. Now it can think.",
		edgesightLead:
			"Edge Sight AI works on existing cameras, processes at the edge, and detects events in milliseconds without moving data outside the perimeter.",
		flowOne: "Existing cameras",
		flowTwo: "Local Edge AI",
		flowThree: "Computer vision",
		flowFour: "Detection in ms",
		flowFive: "Autonomous response",
		capabilityTitle:
			"A repeatable model for turning information into capability.",
		capabilityOneTitle: "Understand data and context",
		capabilityOneCopy:
			"Map signals, constraints, and the decisions the business needs to make.",
		capabilityTwoTitle: "Model applied intelligence",
		capabilityTwoCopy:
			"Build models fitted to real data, not generic abstractions.",
		capabilityThreeTitle: "Integrate into real operations",
		capabilityThreeCopy:
			"Bring intelligence into the flow where teams decide, detect, or prioritize.",
		capabilityFourTitle: "Transfer capability",
		capabilityFourCopy:
			"Support the team until the system becomes an internal practice.",
		contactTitle: "Turn your data into an internal decision-making capability.",
		contactLead:
			"If your organization has fragmented data, existing infrastructure, or models that need to reach operations, Scapder can help turn them into actionable intelligence.",
		footerTagline: "Turning data into actionable intelligence.",
		navTeam: "Team",
		teamTitle: "Team",
		teamLead: "The team that turns complex data into actionable intelligence.",
		teamAria: "Scapder Team",
		teamMember01Name: "Team Member 01",
		teamMember01Role: "Role",
		teamMember01ImageAlt: "Team Member 01",
		teamMember02Name: "Team Member 02",
		teamMember02Role: "Role",
		teamMember02ImageAlt: "Team Member 02",
		teamMember03Name: "Team Member 03",
		teamMember03Role: "Role",
		teamMember03ImageAlt: "Team Member 03",
		teamMember04Name: "Team Member 04",
		teamMember04Role: "Role",
		teamMember04ImageAlt: "Team Member 04",
	},
};

function applyLanguage(lang) {
	const dictionary = translations[lang] || translations.es;
	document.documentElement.lang = lang;

	document.querySelectorAll("[data-i18n]").forEach((node) => {
		const key = node.getAttribute("data-i18n");
		if (dictionary[key]) {
			node.textContent = dictionary[key];
		}
	});

	document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
		const key = node.getAttribute("data-i18n-aria-label");
		if (dictionary[key]) {
			node.setAttribute("aria-label", dictionary[key]);
		}
	});

	document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
		const key = node.getAttribute("data-i18n-alt");
		if (dictionary[key]) {
			node.setAttribute("alt", dictionary[key]);
		}
	});

	document.querySelectorAll(".language-option").forEach((button) => {
		const isActive = button.dataset.lang === lang;
		button.classList.toggle("is-active", isActive);
		button.setAttribute("aria-pressed", String(isActive));
	});

	window.localStorage.setItem("scapder-language", lang);
}

const savedLanguage = window.localStorage.getItem("scapder-language");
applyLanguage(savedLanguage === "en" ? "en" : "es");

document.querySelectorAll(".language-option").forEach((button) => {
	button.addEventListener("click", () => {
		applyLanguage(button.dataset.lang === "en" ? "en" : "es");
	});
});

const nav = document.getElementById("site-nav");
const navButton = document.querySelector(".hamburger");

if (nav && navButton) {
	navButton.addEventListener("click", () => {
		const isOpen = nav.classList.toggle("is-open");
		navButton.setAttribute("aria-expanded", String(isOpen));
	});

	document.querySelectorAll(".nav a").forEach((link) => {
		link.addEventListener("click", () => {
			nav.classList.remove("is-open");
			navButton.setAttribute("aria-expanded", "false");
		});
	});
}

/* ── Scroll Reveal ── */

(function () {
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	);

	function revealOnScroll() {
		if (prefersReducedMotion.matches) {
			document.querySelectorAll("[data-reveal]").forEach(function (el, i) {
				el.classList.add("no-motion");
				el.style.transitionDelay = (i * 30) + "ms";
			});
			return;
		}

		var revealEls = document.querySelectorAll("[data-reveal]");
		if (!revealEls.length) return;

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry, idx) {
					if (!entry.isIntersecting) return;
					var el = entry.target;
					var siblings =
						el.parentNode.querySelectorAll("[data-reveal]");
					var index = Array.prototype.indexOf.call(
						siblings,
						el
					);
					el.style.transitionDelay = (index * 72) + "ms";
					el.classList.add("is-revealed");
					observer.unobserve(el);
				});
			},
			{ rootMargin: "0px 0px -48px 0px", threshold: 0.12 }
		);

		revealEls.forEach(function (el) {
			observer.observe(el);
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", revealOnScroll);
	} else {
		revealOnScroll();
	}

	prefersReducedMotion.addEventListener("change", function () {
		if (prefersReducedMotion.matches) {
			document.querySelectorAll("[data-reveal]").forEach(function (el) {
				el.classList.add("no-motion");
			});
		}
	});
})();
