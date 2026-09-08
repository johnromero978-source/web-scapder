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
		sentientumDemoCta: "Conocer Sentientum",
		sentientumDemoLabel: "Conocer Sentientum",
		contactEmailLabel: "Email",
		contactWhatsAppLabel: "WhatsApp",
		contactFormName: "Nombre",
		contactFormEmail: "Email",
		contactFormPhone: "WhatsApp / teléfono",
		contactFormMessage: "Mensaje",
		contactFormSubmit: "Enviar mensaje",
		contactFormConsent:
			"Autorizo el tratamiento de mis datos para responder esta solicitud. La política es provisional mientras se completa la información del responsable. Consultas de privacidad: haroldsthid@scapder.com.",
		contactFormHelp:
			"Enviaremos tu solicitud al equipo de scapder.",
		contactFormPending: "Enviando mensaje…",
		contactFormSuccess: "Mensaje enviado. El equipo de scapder responderá pronto.",
		contactFormError: "No pudimos enviar el mensaje. Intenta de nuevo más tarde.",
		contactFormConfigError: "El formulario aún no está disponible. Intenta de nuevo más tarde.",
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
		stvVideoFallback:
			"Este recorrido está grabado en español. Las versiones en inglés y portugués están en producción.",
		stvStepZeroTitle: "La Constitución",
		stvStepZeroPlain:
			"Es darle a un guionista una sinopsis y una lista de nombres. El elenco lo arma él.",
		stvStepOneTitle: "El grafo",
		stvStepOnePlain:
			"Dibuja el organigrama invisible: quién conoce a quién, quién le responde a quién, antes de que nadie diga una palabra.",
		stvStepTwoTitle: "El elenco",
		stvStepTwoPlain:
			"Casting completo. A cada personaje se le escribe una historia y una agenda, porque nadie discute las veinticuatro horas.",
		stvStepThreeTitle: "La corrida",
		stvStepThreePlain:
			"Una obra de teatro con guión abierto: los actores improvisan dentro de su personaje, ronda tras ronda.",
		stvStepFourTitle: "El informe",
		stvStepFourPlain:
			"El informe que llevarías a un directorio: qué pasó, quién dijo qué, y con qué evidencia.",
		stvStepFiveTitle: "Las preguntas",
		stvStepFivePlain:
			"Terminada la función, podés sentarte con un personaje y preguntarle por qué hizo lo que hizo.",
		stvProofBody:
			"Cada afirmación del informe apunta a un mensaje concreto de un agente concreto. Si algo no se puede citar, el sistema lo marca en lugar de afirmarlo.",
		stvFactAgentsLabel: "Agentes",
		stvFactRoundsLabel: "Rondas",
		stvFactActionsLabel: "Acciones registradas",
		stvFactCitationLabel: "Afirmaciones con cita",
		modalCloseLabel: "Cerrar",
		stvModalLede: "Escribís un documento con las reglas de un mundo y la pregunta que querés poner a prueba. Sentientum arma la población que vive en ese mundo y la deja discutir.",
		stvModalStepsLabel: "Seis pasos. Uno solo lo escribís vos.",
		stvModalProofLabel: "Una corrida real, publicada sin editar",
		stvModalVideoCta: "Ver el recorrido",
		stvModalRunCta: "Abrir la corrida",
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
		sentientumDemoCta: "Explore Sentientum",
		sentientumDemoLabel: "Explore Sentientum",
		contactEmailLabel: "Email",
		contactWhatsAppLabel: "WhatsApp",
		contactFormName: "Name",
		contactFormEmail: "Email",
		contactFormPhone: "WhatsApp / phone",
		contactFormMessage: "Message",
		contactFormSubmit: "Send message",
		contactFormConsent:
			"I authorize the processing of my data to answer this request. The policy is provisional while the controller's information is completed. Privacy inquiries: haroldsthid@scapder.com.",
		contactFormHelp:
			"We will send your request to the scapder team.",
		contactFormPending: "Sending message…",
		contactFormSuccess: "Message sent. The scapder team will respond soon.",
		contactFormError: "We could not send the message. Please try again later.",
		contactFormConfigError: "The form is not available yet. Please try again later.",
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
		stvVideoFallback:
			"This walkthrough is recorded in Spanish. The English and Portuguese versions are in production.",
		stvStepZeroTitle: "The Constitution",
		stvStepZeroPlain:
			"It is handing a screenwriter a synopsis and a list of names. The cast is theirs to build.",
		stvStepOneTitle: "The graph",
		stvStepOnePlain:
			"It draws the invisible org chart: who knows whom, who answers to whom, before anyone says a word.",
		stvStepTwoTitle: "The cast",
		stvStepTwoPlain:
			"Full casting. Each character gets a history and a calendar, because nobody argues twenty-four hours a day.",
		stvStepThreeTitle: "The run",
		stvStepThreePlain:
			"A play with an open script: the actors improvise inside their character, round after round.",
		stvStepFourTitle: "The report",
		stvStepFourPlain:
			"The report you would take to a board: what happened, who said what, and on what evidence.",
		stvStepFiveTitle: "The questions",
		stvStepFivePlain:
			"Once the show is over, you can sit down with a character and ask why they did what they did.",
		stvProofBody:
			"Every claim in the report points at a concrete message from a concrete agent. When something cannot be cited, the system flags it instead of asserting it.",
		stvFactAgentsLabel: "Agents",
		stvFactRoundsLabel: "Rounds",
		stvFactActionsLabel: "Recorded actions",
		stvFactCitationLabel: "Claims with citations",
		modalCloseLabel: "Close",
		stvModalLede: "You write a document with the rules of a world and the question you want to put to the test. Sentientum builds the population that lives in that world and lets it argue.",
		stvModalStepsLabel: "Six steps. You write only one.",
		stvModalProofLabel: "A real run, published unedited",
		stvModalVideoCta: "Watch the walkthrough",
		stvModalRunCta: "Open the run",
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
		sentientumDemoCta: "Conhecer o Sentientum",
		sentientumDemoLabel: "Conhecer o Sentientum",
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
		contactFormSubmit: "Enviar mensagem",
		contactFormConsent:
			"Autorizo o tratamento dos meus dados para responder a esta solicitação. A política é provisória enquanto as informações do responsável são concluídas. Consultas de privacidade: haroldsthid@scapder.com.",
		contactFormHelp:
			"Enviaremos sua solicitação à equipe da scapder.",
		contactFormPending: "Enviando mensagem…",
		contactFormSuccess: "Mensagem enviada. A equipe da scapder responderá em breve.",
		contactFormError: "Não foi possível enviar a mensagem. Tente novamente mais tarde.",
		contactFormConfigError: "O formulário ainda não está disponível. Tente novamente mais tarde.",
		comparisonBaseLabel: "Sem caixas nem texto",
		comparisonOverlayLabel: "Com detecção visível",
		comparisonLabel: "Deslize para comparar",
		comparisonHelp:
			"A barra vertical revela a versão com detecção.",
		comparisonAria: "Ajustar a comparação do Edge Sight AI",
		stvVideoFallback:
			"Este percurso foi gravado em espanhol. As versões em inglês e português estão em produção.",
		stvStepZeroTitle: "A Constituição",
		stvStepZeroPlain:
			"É dar a um roteirista uma sinopse e uma lista de nomes. O elenco ele monta.",
		stvStepOneTitle: "O grafo",
		stvStepOnePlain:
			"Desenha o organograma invisível: quem conhece quem, quem responde a quem, antes de alguém dizer uma palavra.",
		stvStepTwoTitle: "O elenco",
		stvStepTwoPlain:
			"Casting completo. Cada personagem ganha uma história e uma agenda, porque ninguém discute vinte e quatro horas por dia.",
		stvStepThreeTitle: "A execução",
		stvStepThreePlain:
			"Uma peça de teatro com roteiro aberto: os atores improvisam dentro do personagem, rodada após rodada.",
		stvStepFourTitle: "O relatório",
		stvStepFourPlain:
			"O relatório que você levaria a um conselho: o que aconteceu, quem disse o quê, e com que evidência.",
		stvStepFiveTitle: "As perguntas",
		stvStepFivePlain:
			"Terminada a apresentação, você pode sentar com um personagem e perguntar por que fez o que fez.",
		stvProofBody:
			"Cada afirmação do relatório aponta para uma mensagem concreta de um agente concreto. Quando algo não pode ser citado, o sistema sinaliza em vez de afirmar.",
		stvFactAgentsLabel: "Agentes",
		stvFactRoundsLabel: "Rodadas",
		stvFactActionsLabel: "Ações registradas",
		stvFactCitationLabel: "Afirmações com citação",
		modalCloseLabel: "Fechar",
		stvModalLede: "Você escreve um documento com as regras de um mundo e a pergunta que quer colocar à prova. O Sentientum monta a população que vive nesse mundo e a deixa discutir.",
		stvModalStepsLabel: "Seis passos. Só um é escrito por você.",
		stvModalProofLabel: "Uma execução real, publicada sem edição",
		stvModalVideoCta: "Ver o percurso",
		stvModalRunCta: "Abrir a execução",
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

	updateSentientumVideoLink(lang);
}

// One recording per language. They are the same URL today because only the
// Spanish walkthrough is recorded; the English and Portuguese entries exist so
// that publishing them is an edit here and nothing else. An entry equal to the
// Spanish one means "not recorded yet", which is why the note below appears.
const sentientumVideos = {
	es: "https://youtu.be/TUhzrgKe458",
	en: "https://youtu.be/TUhzrgKe458",
	pt: "https://youtu.be/TUhzrgKe458",
};

function updateSentientumVideoLink(lang) {
	const link = document.querySelector("[data-video-link]");
	if (!link) {
		return;
	}

	const href = sentientumVideos[lang] || sentientumVideos.es;
	link.href = href;

	// Told, not hidden: someone who picked English and gets a Spanish video
	// should learn that from the page rather than from the first ten seconds
	// of the video.
	const note = document.querySelector("[data-video-note]");
	if (note) {
		note.hidden = lang === "es" || href !== sentientumVideos.es;
	}
}

const savedLanguage = window.localStorage.getItem("scapder-language");
applyLanguage(savedLanguage === "en" || savedLanguage === "pt" ? savedLanguage : "es");

document.querySelectorAll(".language-option").forEach((button) => {
	button.addEventListener("click", () => {
		applyLanguage(button.dataset.lang === "en" || button.dataset.lang === "pt" ? button.dataset.lang : "es");
	});
});

// ── Detail dialogs ──
//
// Opened from a product card. Keyboard and screen-reader behaviour is the part
// worth writing by hand: Escape closes, focus moves into the panel and returns
// to the card that opened it, and Tab is kept inside while it is open — a
// dialog you can Tab out of silently is a dialog that is not one.
document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
	const modal = document.getElementById(trigger.dataset.modalOpen);
	if (!modal) {
		return;
	}

	const panel = modal.querySelector(".modal-panel");
	const focusable = () =>
		[...modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
			(node) => node.offsetParent !== null,
		);

	const close = () => {
		modal.hidden = true;
		document.body.style.removeProperty("overflow");
		trigger.focus();
	};

	const onKeydown = (event) => {
		if (modal.hidden) {
			return;
		}

		if (event.key === "Escape") {
			close();
			return;
		}

		if (event.key !== "Tab") {
			return;
		}

		const nodes = focusable();
		if (nodes.length === 0) {
			return;
		}

		const first = nodes[0];
		const last = nodes[nodes.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	trigger.addEventListener("click", () => {
		modal.hidden = false;
		// The page behind must not scroll under the dialog.
		document.body.style.overflow = "hidden";
		if (panel) {
			panel.scrollTop = 0;
		}
		const [firstFocusable] = focusable();
		if (firstFocusable) {
			firstFocusable.focus();
		}
	});

	modal.querySelectorAll("[data-modal-close]").forEach((node) => {
		node.addEventListener("click", close);
	});

	document.addEventListener("keydown", onKeydown);
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
	const submitButton = contactForm.querySelector("[data-contact-submit]");
	const status = contactForm.querySelector("[data-contact-status]");
	const startedAt = contactForm.querySelector("[data-form-started-at]");
	const endpoint = document
		.querySelector('meta[name="scapder-contact-endpoint"]')
		?.content.trim();
	let isSubmitting = false;

	const resetStartedAt = () => {
		if (startedAt) startedAt.value = String(Date.now());
	};

	const setStatus = (message, type = "", shouldFocus = false) => {
		if (!status) return;
		status.textContent = message;
		status.dataset.type = type;
		if (message && shouldFocus) status.focus();
	};

	resetStartedAt();

	contactForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (isSubmitting || !contactForm.reportValidity()) return;

		const currentLanguage = document.documentElement.lang.startsWith("pt")
			? "pt"
			: document.documentElement.lang === "en"
				? "en"
				: "es";
		const dictionary = translations[currentLanguage] || translations.es;

		if (!endpoint) {
			setStatus(dictionary.contactFormConfigError, "error", true);
			return;
		}

		const formData = new FormData(contactForm);
		const payload = {
			submissionId: crypto.randomUUID(),
			name: String(formData.get("name") || ""),
			email: String(formData.get("email") || ""),
			phone: String(formData.get("phone") || ""),
			message: String(formData.get("message") || ""),
			website: String(formData.get("website") || ""),
			formStartedAt: Number(formData.get("formStartedAt")),
			consent: formData.get("consent") === "on",
			language: currentLanguage,
		};

		isSubmitting = true;
		if (submitButton) submitButton.disabled = true;
		contactForm.setAttribute("aria-busy", "true");
		setStatus(dictionary.contactFormPending);

		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
				signal: AbortSignal.timeout(10000),
			});

			if (!response.ok) throw new Error("Contact request failed");

			contactForm.reset();
			resetStartedAt();
			setStatus(dictionary.contactFormSuccess, "success", true);
		} catch {
			setStatus(dictionary.contactFormError, "error", true);
		} finally {
			isSubmitting = false;
			if (submitButton) submitButton.disabled = false;
			contactForm.removeAttribute("aria-busy");
		}
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
