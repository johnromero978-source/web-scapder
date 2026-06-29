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
		heroPanelAria: "Síntesis de scapder",
		methodAria: "Método scapder",
		flowAria: "Flujo Edge Sight AI",
		footerAria: "Footer",
		edgesightImageAlt:
			"Vista de cámara con detección de personas y elementos de seguridad",
		ctaTalk: "Hablemos",
		ctaPortfolio: "Ver portafolio",
		heroSystem: "Your Data has a Voice",
		heroTitle: "scapder",
		heroLead:
			"Transformamos datos complejos en inteligencia accionable para que equipos, operaciones y productos tomen mejores decisiones con modelos de IA aplicados al mundo real.",
		heroPanelKicker: "Transformar datos en inteligencia accionable",
		heroPanelOneLabel: "Origen",
		heroPanelOneValue: "Raíces académicas y científicas",
		heroPanelTwoLabel: "Método",
		heroPanelTwoValue: "Co-creación y transferencia",
		heroPanelThreeLabel: "Resultado",
		heroPanelThreeValue: "Capacidades internas de decisión",
		approachTitle:
			'<span class="heading-sentence">No vendemos software genérico.</span><span class="heading-sentence">Construimos capacidad.</span>',
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
			"scapder procesó 20,000+ registros bajo 300 variables de comportamiento e identificó 5 perfiles reales de comprador con clustering dinámico.",
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
			"scapder convirtió datos técnicos complejos en interfaces visuales intuitivas, procesando seis mil clientes mensuales.",
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
			'<span class="heading-sentence">Tres plataformas.</span><span class="heading-sentence">Una misión: transformar datos en decisiones.</span>',
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
			'<span class="heading-sentence">Tu infraestructura de video ya existe.</span><span class="heading-sentence">Ahora puede pensar.</span>',
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
			"Si tu organización tiene datos dispersos, infraestructura existente o modelos que necesitan llegar a operación, scapder puede ayudarte a convertirlos en inteligencia accionable.",
		footerTagline: "Transformar datos en inteligencia accionable.",
		sentientumDemoCta: "Ver demo",
		sentientumDemoLabel: "Abrir la demo de Sentientum",
		contactEmailLabel: "Email",
		contactWhatsAppLabel: "WhatsApp",
		contactFormName: "Nombre",
		contactFormEmail: "Email",
		contactFormPhone: "WhatsApp / teléfono",
		contactFormMessage: "Mensaje",
		contactFormEmailButton: "Enviar por email",
		contactFormWhatsAppButton: "Enviar por WhatsApp",
		contactFormHelp:
			"El mensaje se abre con tus datos en tu cliente de correo o WhatsApp.",
		comparisonBaseLabel: "Sin cajas ni texto",
		comparisonOverlayLabel: "Con detección visible",
		comparisonLabel: "Desliza para comparar",
		comparisonHelp:
			"La barra vertical revela la versión con detección.",
		comparisonAria: "Ajustar la comparación de Edge Sight AI",
		edgesightBaseImageAlt:
			"Vista de cámara sin cajas ni texto, con mapa de calor",
		navTeam: "Equipo",
		teamTitle: "Equipo",
		teamLead: "El equipo que convierte datos complejos en inteligencia accionable.",
		teamAria: "Equipo scapder",
		teamMember01Name: "Harold Sthid Piravaguen",
		teamMember01Role: "CEO",
		teamMember01ImageAlt: "Harold Sthid Piravaguen",
		teamMember01LinkedInLabel: "Abrir el perfil de LinkedIn de Harold Sthid Piravaguen",
		teamMember02Name: "Lisset Velasquez",
		teamMember02Role: "Legal Advisor and Human Resources",
		teamMember02ImageAlt: "Lisset Velasquez",
		teamMember02LinkedInLabel: "Abrir el perfil de LinkedIn de Lisset Velasquez",
		teamMember03Name: "Hugo Ardiles",
		teamMember03Role: "CTO",
		teamMember03ImageAlt: "Hugo Ardiles",
		teamMember03LinkedInLabel: "Abrir el perfil de LinkedIn de Hugo Ardiles",
		teamMember04Name: "Joshua De La Pava",
		teamMember04Role: "Product & Business Development",
		teamMember04ImageAlt: "Joshua De La Pava",
		teamMember04LinkedInLabel: "Abrir el perfil de LinkedIn de Joshua De La Pava",
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
		heroPanelAria: "scapder summary",
		methodAria: "scapder method",
		flowAria: "Edge Sight AI flow",
		footerAria: "Footer",
		edgesightImageAlt: "Camera view with people and safety element detection",
		ctaTalk: "Talk to us",
		ctaPortfolio: "View portfolio",
		heroSystem: "Your Data has a Voice",
		heroTitle: "scapder",
		heroLead:
			"We transform complex data into actionable intelligence so teams, operations, and products can make better decisions with AI models applied to the real world.",
		heroPanelKicker: "Turning data into actionable intelligence",
		heroPanelOneLabel: "Origin",
		heroPanelOneValue: "Academic and scientific roots",
		heroPanelTwoLabel: "Method",
		heroPanelTwoValue: "Co-creation and transfer",
		heroPanelThreeLabel: "Outcome",
		heroPanelThreeValue: "Internal decision capabilities",
		approachTitle:
			'<span class="heading-sentence">We do not sell generic software.</span><span class="heading-sentence">We build capability.</span>',
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
			"scapder processed 20,000+ records under 300 behavioral variables and identified 5 real buyer profiles with dynamic clustering.",
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
			"scapder converted complex technical data into intuitive visual interfaces, processing six thousand monthly clients.",
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
			'<span class="heading-sentence">Three platforms.</span><span class="heading-sentence">One mission: turning data into decisions.</span>',
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
			'<span class="heading-sentence">Your video infrastructure already exists.</span><span class="heading-sentence">Now it can think.</span>',
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
			"If your organization has fragmented data, existing infrastructure, or models that need to reach operations, scapder can help turn them into actionable intelligence.",
		footerTagline: "Turning data into actionable intelligence.",
		sentientumDemoCta: "View demo",
		sentientumDemoLabel: "Open the Sentientum demo",
		contactEmailLabel: "Email",
		contactWhatsAppLabel: "WhatsApp",
		contactFormName: "Name",
		contactFormEmail: "Email",
		contactFormPhone: "WhatsApp / phone",
		contactFormMessage: "Message",
		contactFormEmailButton: "Send by email",
		contactFormWhatsAppButton: "Send by WhatsApp",
		contactFormHelp:
			"The message opens with your details in your email app or WhatsApp.",
		comparisonBaseLabel: "No boxes or text",
		comparisonOverlayLabel: "With visible detection",
		comparisonLabel: "Slide to compare",
		comparisonHelp:
			"The vertical bar reveals the detection version.",
		comparisonAria: "Adjust the Edge Sight AI comparison",
		edgesightBaseImageAlt:
			"Camera view without boxes or text, with a heat map",
		navTeam: "Team",
		teamTitle: "Team",
		teamLead: "The team that turns complex data into actionable intelligence.",
		teamAria: "scapder Team",
		teamMember01Name: "Harold Sthid Piravaguen",
		teamMember01Role: "CEO",
		teamMember01ImageAlt: "Harold Sthid Piravaguen",
		teamMember01LinkedInLabel: "Open the LinkedIn profile of Harold Sthid Piravaguen",
		teamMember02Name: "Lisset Velasquez",
		teamMember02Role: "Legal Advisor and Human Resources",
		teamMember02ImageAlt: "Lisset Velasquez",
		teamMember02LinkedInLabel: "Open the LinkedIn profile of Lisset Velasquez",
		teamMember03Name: "Hugo Ardiles",
		teamMember03Role: "CTO",
		teamMember03ImageAlt: "Hugo Ardiles",
		teamMember03LinkedInLabel: "Open the LinkedIn profile of Hugo Ardiles",
		teamMember04Name: "Joshua De La Pava",
		teamMember04Role: "Product & Business Development",
		teamMember04ImageAlt: "Joshua De La Pava",
		teamMember04LinkedInLabel: "Open the LinkedIn profile of Joshua De La Pava",
	},
	pt: {
		skip: "Pular para o conteúdo principal",
		navApproach: "Abordagem",
		navCases: "Casos",
		navPortfolio: "Portfólio",
		navEdgeSight: "Edge Sight AI",
		navContact: "Contato",
		navToggleLabel: "Abrir navegação",
		navAria: "Seções",
		languageAria: "Seletor de idioma",
		heroPanelAria: "Resumo da scapder",
		methodAria: "Método da scapder",
		flowAria: "Fluxo do Edge Sight AI",
		footerAria: "Rodapé",
		edgesightImageAlt:
			"Vista de câmera com detecção de pessoas e elementos de segurança",
		edgesightBaseImageAlt:
			"Vista de câmera sem caixas nem texto, com mapa de calor",
		ctaTalk: "Vamos conversar",
		ctaPortfolio: "Ver portfólio",
		heroSystem: "Your Data has a Voice",
		heroTitle: "scapder",
		heroLead:
			"Transformamos dados complexos em inteligência acionável para que equipes, operações e produtos tomem melhores decisões com modelos de IA aplicados ao mundo real.",
		heroPanelKicker: "Transformar dados em inteligência acionável",
		heroPanelOneLabel: "Origem",
		heroPanelOneValue: "Raízes acadêmicas e científicas",
		heroPanelTwoLabel: "Método",
		heroPanelTwoValue: "Cocriação e transferência",
		heroPanelThreeLabel: "Resultado",
		heroPanelThreeValue: "Capacidades internas de decisão",
		approachTitle:
			'<span class="heading-sentence">Não vendemos software genérico.</span><span class="heading-sentence">Construímos capacidade.</span>',
		approachLead:
			"Cocriamos com nossos clientes e transferimos conhecimento para suas equipes. O objetivo não é dependência tecnológica: é fazer a organização transformar seus próprios dados em decisões.",
		methodOneTitle: "Cocriação",
		methodOneCopy:
			"Modelos e produtos desenhados com o contexto real do cliente.",
		methodTwoTitle: "Transferência",
		methodTwoCopy:
			"Conhecimento técnico convertido em prática operacional da equipe.",
		methodThreeTitle: "Capacidade interna",
		methodThreeCopy:
			"Sistemas que sustentam decisões sem criar dependência cega.",
		proofLabel: "Experiência aplicada em",
		proofOne: "construção",
		proofTwo: "informação jurídica",
		proofThree: "varejo",
		proofFour: "logística",
		proofFive: "transporte marítimo",
		casesTitle: "Casos documentados em dados reais.",
		casesLead:
			"Os casos do overview mostram um padrão: partir de dados dispersos, modelar inteligência aplicada e devolver decisões acionáveis.",
		caseCeleusDomain: "Imobiliário e construção",
		caseCeleusTitle: "Priorizar prospects com probabilidade científica.",
		caseCeleusCopy:
			"scapder processou 20,000+ registros sob 300 variáveis de comportamento e identificou 5 perfis reais de comprador com clustering dinâmico.",
		caseCeleusM1: "registros processados",
		caseCeleusM2: "variáveis analisadas",
		caseCeleusM3: "perfis identificados",
		caseLegisDomain: "Informação jurídica",
		caseLegisTitle: "Contexto jurídico para reduzir buscas sem resultado.",
		caseLegisCopy:
			"Algoritmos de Machine Learning contextual reduziram buscas sem resultado de 76% para um mínimo operacional documentado.",
		caseLegisM1: "buscas sem resultado",
		caseLegisM2: "acessibilidade",
		caseLegisM3: "precisão de relevância",
		casePuppisDomain: "Varejo pet",
		casePuppisTitle: "Demanda geolocalizada sem depender de programação.",
		casePuppisCopy:
			"scapder converteu dados técnicos complexos em interfaces visuais intuitivas, processando seis mil clientes mensais.",
		casePuppisM1: "listas exatas",
		casePuppisM2: "clientes por mês",
		casePuppisM3: "autonomia visual",
		caseCanalName: "Canal do Panamá",
		caseCanalDomain: "Logística e transporte marítimo",
		caseCanalTitle: "Prever rotas dinâmicas com inteligência artificial.",
		caseCanalCopy:
			"Bilhões de registros históricos e operacionais foram transformados em roteamento inteligente e trajetórias dinâmicas seguras.",
		caseCanalM1: "registros de satélite",
		caseCanalM2: "registros a cada 15 min",
		caseCanalM3Strong: "Ótimo",
		caseCanalM3: "consumo em trânsito",
		portfolioTitle:
			'<span class="heading-sentence">Três plataformas.</span><span class="heading-sentence">Uma missão: transformar dados em decisões.</span>',
		edgeOneLiner: "Percepção operacional para infraestruturas físicas de vídeo.",
		edgePillarTwo: "Tempo real",
		edgePillarThree: "Soberania de dados",
		sentientumCategory: "Audiências Sintéticas · Agentes de IA",
		sentientumOneLiner: "Simulação preditiva para ensaiar o futuro hoje.",
		sentientumPillarOne: "Simulação",
		sentientumPillarTwo: "Escala",
		sentientumPillarThree: "Sem risco",
		sentientumDemoCta: "Ver demo",
		sentientumDemoLabel: "Abrir a demo do Sentientum",
		mlspecCategory: "MLOps · Governança de IA",
		mlspecOneLiner: "Sistema operacional para escalar modelos de ML.",
		mlspecPillarOne: "Lab para produção",
		mlspecPillarTwo: "Governança automática",
		mlspecPillarThree: "Agentes + humanos",
		edgesightTitle:
			'<span class="heading-sentence">Sua infraestrutura de vídeo já existe.</span><span class="heading-sentence">Agora ela pode pensar.</span>',
		edgesightLead:
			"Edge Sight AI opera sobre câmeras existentes, processa na borda e detecta eventos em milissegundos sem tirar os dados do perímetro.",
		flowOne: "Câmeras existentes",
		flowTwo: "Edge AI local",
		flowThree: "Visão computacional",
		flowFour: "Detecção em ms",
		flowFive: "Resposta autônoma",
		capabilityTitle:
			"Um modelo repetível para converter informação em capacidade.",
		capabilityOneTitle: "Entender dados e contexto",
		capabilityOneCopy:
			"Mapear sinais, restrições e decisões que o negócio precisa tomar.",
		capabilityTwoTitle: "Modelar inteligência aplicada",
		capabilityTwoCopy:
			"Construir modelos ajustados a dados reais e não a abstrações genéricas.",
		capabilityThreeTitle: "Integrar na operação real",
		capabilityThreeCopy:
			"Levar a inteligência para o fluxo onde se decide, detecta ou prioriza.",
		capabilityFourTitle: "Transferir capacidades",
		capabilityFourCopy:
			"Acompanhar a equipe até que o sistema se torne uma prática interna.",
		contactTitle: "Transforme seus dados em uma capacidade interna de decisão.",
		contactLead:
			"Se a sua organização tem dados dispersos, infraestrutura existente ou modelos que precisam chegar à operação, a scapder pode ajudar a transformá-los em inteligência acionável.",
		footerTagline: "Transformar dados em inteligência acionável.",
		navTeam: "Equipe",
		teamTitle: "Equipe",
		teamLead: "A equipe que transforma dados complexos em inteligência acionável.",
		teamAria: "Equipe da scapder",
		teamMember01Name: "Harold Sthid Piravaguen",
		teamMember01Role: "CEO",
		teamMember01ImageAlt: "Harold Sthid Piravaguen",
		teamMember01LinkedInLabel:
			"Abrir o perfil do LinkedIn de Harold Sthid Piravaguen",
		teamMember02Name: "Lisset Velasquez",
		teamMember02Role: "Assessora Jurídica e Recursos Humanos",
		teamMember02ImageAlt: "Lisset Velasquez",
		teamMember02LinkedInLabel:
			"Abrir o perfil do LinkedIn de Lisset Velasquez",
		teamMember03Name: "Hugo Ardiles",
		teamMember03Role: "CTO",
		teamMember03ImageAlt: "Hugo Ardiles",
		teamMember03LinkedInLabel:
			"Abrir o perfil do LinkedIn de Hugo Ardiles",
		teamMember04Name: "Joshua De La Pava",
		teamMember04Role: "Produto e desenvolvimento de negócios",
		teamMember04ImageAlt: "Joshua De La Pava",
		teamMember04LinkedInLabel:
			"Abrir o perfil do LinkedIn de Joshua De La Pava",
		contactEmailLabel: "Email",
		contactWhatsAppLabel: "WhatsApp",
		contactFormName: "Nome",
		contactFormEmail: "Email",
		contactFormPhone: "WhatsApp / telefone",
		contactFormMessage: "Mensagem",
		contactFormEmailButton: "Enviar por e-mail",
		contactFormWhatsAppButton: "Enviar por WhatsApp",
		contactFormHelp:
			"A mensagem é aberta com seus dados no seu cliente de e-mail ou no WhatsApp.",
		comparisonBaseLabel: "Sem caixas nem texto",
		comparisonOverlayLabel: "Com detecção visível",
		comparisonLabel: "Deslize para comparar",
		comparisonHelp:
			"A barra vertical revela a versão com detecção.",
		comparisonAria: "Ajustar a comparação do Edge Sight AI",
	},
};

function applyLanguage(lang) {
	const dictionary = translations[lang] || translations.es;
	document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;

	document.querySelectorAll("[data-i18n]").forEach((node) => {
		const key = node.getAttribute("data-i18n");
		if (dictionary[key]) {
			node.textContent = dictionary[key];
		}
	});

	document.querySelectorAll("[data-i18n-html]").forEach((node) => {
		const key = node.getAttribute("data-i18n-html");
		if (dictionary[key]) {
			node.innerHTML = dictionary[key];
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
applyLanguage(savedLanguage === "en" || savedLanguage === "pt" ? savedLanguage : "es");

document.querySelectorAll(".language-option").forEach((button) => {
	button.addEventListener("click", () => {
		applyLanguage(button.dataset.lang === "en" || button.dataset.lang === "pt" ? button.dataset.lang : "es");
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

const comparison = document.querySelector("[data-comparison]");
const comparisonRange = document.querySelector("[data-comparison-range]");

if (comparison && comparisonRange) {
	const updateComparison = () => {
		const value = Number(comparisonRange.value || 50);
		comparison.style.setProperty("--comparison", `${value}%`);
	};

	comparisonRange.addEventListener("input", updateComparison);
	updateComparison();
}

const contactForm = document.querySelector("[data-contact-form]");

	if (contactForm) {
		contactForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const currentLanguage = document.documentElement.lang.startsWith("pt")
			? "pt"
			: document.documentElement.lang === "en"
				? "en"
				: "es";
		const dictionary = translations[currentLanguage] || translations.es;
		const submitter = event.submitter;
		const channel = submitter?.dataset.channel === "whatsapp" ? "whatsapp" : "email";
		const formData = new FormData(contactForm);
		const name = String(formData.get("name") || "").trim();
		const email = String(formData.get("email") || "").trim();
		const phone = String(formData.get("phone") || "").trim();
		const message = String(formData.get("message") || "").trim();
		const payload = [
			`${dictionary.contactFormName}: ${name}`,
			`${dictionary.contactFormEmail}: ${email}`,
			`${dictionary.contactFormPhone}: ${phone || "—"}`,
			"",
			message,
		].join("\n");

		if (channel === "whatsapp") {
			const url = `https://wa.me/573001234567?text=${encodeURIComponent(payload)}`;
			window.open(url, "_blank", "noopener,noreferrer");
			return;
		}

		const subjectBase = currentLanguage === "en" ? "Contact from scapder" : currentLanguage === "pt" ? "Contato com scapder" : "Contacto desde scapder";
		const subject = encodeURIComponent(`${subjectBase}${name ? ` — ${name}` : ""}`);
		const body = encodeURIComponent(payload);
		window.location.href = `mailto:john.romero@scapder.org?subject=${subject}&body=${body}`;
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
