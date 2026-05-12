import './LeadershipLabPage.css'

type PricingRow = { range: string; value: string }

const objectives = [
  'Compreendem os principais componentes de sistemas de IA modernos.',
  'Entendem como agentes e workflows operam.',
  'Identificam oportunidades reais de aplicação no negócio.',
  'Constroem protótipos funcionais.',
  'Desenvolvem repertório técnico-executivo.',
  'Ampliam sua capacidade de liderar em contextos AI-native.',
]

const differentials = [
  {
    title: 'Profundidade aplicada',
    description:
      'Traduzimos conceitos arquiteturais complexos em linguagem executiva clara e prática.',
  },
  {
    title: 'Hands-on real',
    description:
      'Os participantes experimentam, constroem e operam agentes e workflows durante a jornada.',
  },
  {
    title: 'Visão organizacional',
    description:
      'A IA é apresentada como capacidade operacional integrada ao trabalho cotidiano da empresa.',
  },
  {
    title: 'Curadoria premium',
    description:
      'Facilitação especializada, stack preparada e experiência desenhada para alta liderança.',
  },
]

const executiveSessionPricing: PricingRow[] = [
  { range: 'Até 20 participantes', value: 'R$ 29.120' },
  { range: 'Até 30 participantes', value: 'R$ 39.200' },
  { range: 'Até 50 participantes', value: 'R$ 61.600' },
]

const leadershipLabPricing: PricingRow[] = [
  { range: 'Até 10 participantes', value: 'R$ 17.920' },
  { range: 'Até 20 participantes', value: 'R$ 29.120' },
  { range: 'Até 30 participantes', value: 'R$ 40.040' },
  { range: 'Até 50 participantes', value: 'R$ 61.880' },
]

const aiNativeSprintPricing: PricingRow[] = [
  { range: 'Até 10 participantes', value: 'R$ 50.960' },
  { range: 'Até 20 participantes', value: 'R$ 81.900' },
  { range: 'Até 30 participantes', value: 'R$ 112.840' },
]

const agentStations = [
  { name: 'Sales Agent', description: 'CRM, follow-up e priorização.' },
  { name: 'Meeting Brain', description: 'Transcrição, síntese e gestão de tarefas.' },
  { name: 'Knowledge Agent', description: 'Busca inteligente em documentos e políticas internas.' },
  { name: 'Ops Agent', description: 'Monitoramento operacional e geração de insights.' },
  {
    name: 'Multi-Agent Workflow',
    description: 'Planner, Researcher, Reviewer e Executor Agents operando em conjunto.',
  },
]

const sprintWeeks = [
  {
    week: 'Semana 1',
    title: 'Paradigma & Estratégia',
    description: 'Transformações organizacionais, liderança e IA aplicada.',
  },
  {
    week: 'Semana 2',
    title: 'Stack & Arquitetura',
    description: 'Fundamentos técnicos e sistemas inteligentes.',
  },
  {
    week: 'Semana 3',
    title: 'Agent Lab',
    description: 'Construção prática de agentes e workflows.',
  },
  {
    week: 'Semana 4',
    title: 'Workflow Corporativo',
    description: 'Aplicação em desafios reais da organização.',
  },
]

function PricingTable({ rows }: { rows: PricingRow[] }) {
  return (
    <div className="lab-pricing">
      <div className="lab-pricing-header">
        <span>Participantes</span>
        <span>Investimento</span>
      </div>
      {rows.map((row) => (
        <div className="lab-pricing-row" key={row.range}>
          <span>{row.range}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function LeadershipLabPage() {
  return (
    <div className="lab-root">
      <header className="lab-nav">
        <div className="lab-nav-inner">
          <div className="lab-brand">
            <span className="lab-brand-primary">Mastertech</span>
            <span className="lab-brand-divider">×</span>
            <span className="lab-brand-secondary">Agentic People</span>
          </div>
          <nav className="lab-nav-links">
            <a href="#jornada">Jornada</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#formatos">Formatos</a>
            <a href="#contato" className="lab-nav-cta">
              Falar com o time
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="lab-hero">
          <div className="lab-container">
            <span className="lab-eyebrow">AI-Native Leadership Lab</span>
            <h1 className="lab-hero-title">
              Liderança para organizações compostas por
              <span className="lab-accent"> humanos e inteligência artificial.</span>
            </h1>
            <p className="lab-hero-subtitle">
              Uma jornada executiva prática para transformar IA em capacidade organizacional
              aplicada à rotina da empresa.
            </p>
            <div className="lab-hero-actions">
              <a href="#formatos" className="lab-btn lab-btn-primary">
                Explorar formatos
              </a>
              <a href="#contato" className="lab-btn lab-btn-ghost">
                Conversar com a curadoria
              </a>
            </div>
            <div className="lab-hero-meta">
              <div>
                <span className="lab-meta-label">Formato</span>
                <span className="lab-meta-value">Presencial · Imersivo · Hands-on</span>
              </div>
              <div>
                <span className="lab-meta-label">Stack principal</span>
                <span className="lab-meta-value">Anthropic · Claude · MCP</span>
              </div>
              <div>
                <span className="lab-meta-label">Público</span>
                <span className="lab-meta-value">Executivos, heads e gerências</span>
              </div>
            </div>
          </div>
        </section>

        <section id="jornada" className="lab-section">
          <div className="lab-container lab-grid-2">
            <div>
              <span className="lab-section-tag">Visão geral</span>
              <h2 className="lab-section-title">
                Uma experiência executiva premium para quem vai liderar a próxima camada
                operacional das organizações.
              </h2>
            </div>
            <div className="lab-section-body">
              <p>
                O AI-Native Leadership Lab é desenhado para lideranças que desejam compreender,
                experimentar e aplicar inteligência artificial de forma estratégica, prática e
                integrada ao trabalho real.
              </p>
              <p>
                A jornada combina <strong>visão organizacional</strong>,{' '}
                <strong>profundidade arquitetural</strong>,{' '}
                <strong>experimentação hands-on</strong>,{' '}
                <strong>construção de agentes</strong> e{' '}
                <strong>desenho de workflows inteligentes</strong>.
              </p>
              <p>
                Mais do que conhecer ferramentas, as lideranças aprendem a operar novos modelos
                de trabalho compostos por humanos e IA.
              </p>
            </div>
          </div>
        </section>

        <section className="lab-section lab-section-muted">
          <div className="lab-container">
            <div className="lab-section-header">
              <span className="lab-section-tag">Objetivos da jornada</span>
              <h2 className="lab-section-title">O que as lideranças levam ao final.</h2>
            </div>
            <ul className="lab-objectives">
              {objectives.map((item, index) => (
                <li key={item}>
                  <span className="lab-objective-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lab-section">
          <div className="lab-container lab-grid-2">
            <div>
              <span className="lab-section-tag">Público-alvo</span>
              <h2 className="lab-section-title">
                Para lideranças que perceberam: IA virou camada operacional da organização.
              </h2>
            </div>
            <div className="lab-section-body">
              <p>
                A experiência é especialmente relevante para executivos, heads e gerências que
                precisarão liderar equipes compostas por humanos e sistemas inteligentes, tomar
                decisões sobre integração de IA na rotina da empresa e desenvolver novos modelos
                de trabalho mais fluidos, distribuídos e aumentados por tecnologia.
              </p>
              <p>
                Essas lideranças precisarão experimentar na prática como agentes, workflows e
                sistemas inteligentes operam — porque orquestrar esse novo contexto exigirá
                repertório aplicado, vocabulário técnico e familiaridade operacional.
              </p>
              <ul className="lab-bullets">
                <li>Ampliar maturidade organizacional em IA.</li>
                <li>Desenvolver visão estratégica e arquitetural.</li>
                <li>Compreender aplicações reais no cotidiano corporativo.</li>
                <li>Construir capacidade prática para liderar transformações AI-native.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="diferenciais" className="lab-section lab-section-muted">
          <div className="lab-container">
            <div className="lab-section-header">
              <span className="lab-section-tag">Diferenciais</span>
              <h2 className="lab-section-title">
                Profundidade técnica e linguagem executiva, no mesmo espaço.
              </h2>
            </div>
            <div className="lab-cards">
              {differentials.map((item) => (
                <article className="lab-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lab-section">
          <div className="lab-container lab-grid-2">
            <div>
              <span className="lab-section-tag">Stack e infraestrutura</span>
              <h2 className="lab-section-title">
                A Mastertech leva a stack já configurada. O foco fica na aplicação.
              </h2>
              <p className="lab-section-lead">
                A experiência prioriza a stack da Anthropic como base principal de
                experimentação. Isso oferece fluidez operacional, consistência entre as
                experiências e ambiente técnico previamente preparado.
              </p>
            </div>
            <div className="lab-stack">
              <div className="lab-stack-block">
                <h4>Anthropic Ecosystem</h4>
                <ul>
                  <li>Claude</li>
                  <li>Claude Projects</li>
                  <li>MCP — Model Context Protocol</li>
                  <li>Workflows conectados</li>
                  <li>Context orchestration</li>
                </ul>
              </div>
              <div className="lab-stack-block">
                <h4>Ferramentas complementares</h4>
                <ul>
                  <li>ChatGPT</li>
                  <li>Ferramentas de prototipação</li>
                  <li>Ambientes de automação e integração preparados pela equipe</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="formatos" className="lab-section lab-section-dark">
          <div className="lab-container">
            <div className="lab-section-header">
              <span className="lab-section-tag lab-tag-light">Formatos</span>
              <h2 className="lab-section-title">
                Três formatos. Da sensibilização estratégica à transformação aplicada.
              </h2>
            </div>

            <article className="lab-format">
              <header className="lab-format-header">
                <div>
                  <span className="lab-format-index">Formato 01</span>
                  <h3 className="lab-format-title">Executive Session</h3>
                  <p className="lab-format-sub">
                    Sensibilização estratégica + laboratório executivo.
                  </p>
                </div>
                <div className="lab-format-specs">
                  <div>
                    <span>Duração</span>
                    <strong>4 horas presenciais</strong>
                  </div>
                  <div>
                    <span>Indicado para</span>
                    <strong>
                      Kickoffs executivos, fóruns de liderança, semanas de inovação e
                      alinhamento organizacional.
                    </strong>
                  </div>
                </div>
              </header>

              <div className="lab-format-grid">
                <div>
                  <h4>O que está mudando nas organizações</h4>
                  <ul>
                    <li>Organizações AI-native</li>
                    <li>Agentes</li>
                    <li>Workflows inteligentes</li>
                    <li>Copilotos</li>
                    <li>Transformação operacional</li>
                  </ul>
                </div>
                <div>
                  <h4>Anatomia de sistemas de IA</h4>
                  <ul>
                    <li>Memória</li>
                    <li>Contexto</li>
                    <li>Tool calling</li>
                    <li>RAG</li>
                    <li>MCP</li>
                    <li>Multi-agent systems</li>
                  </ul>
                </div>
                <div>
                  <h4>Demonstrações práticas</h4>
                  <ul>
                    <li>Agentes corporativos</li>
                    <li>Automações</li>
                    <li>Workflows</li>
                    <li>Copilotos executivos</li>
                  </ul>
                </div>
                <div>
                  <h4>Experiência guiada</h4>
                  <ul>
                    <li>Interação com agentes</li>
                    <li>Exploração de casos reais</li>
                    <li>Identificação de oportunidades</li>
                  </ul>
                </div>
              </div>

              <PricingTable rows={executiveSessionPricing} />
            </article>

            <article className="lab-format">
              <header className="lab-format-header">
                <div>
                  <span className="lab-format-index">Formato 02</span>
                  <h3 className="lab-format-title">Leadership Lab</h3>
                  <p className="lab-format-sub">Imersão executiva hands-on.</p>
                </div>
                <div className="lab-format-specs">
                  <div>
                    <span>Duração</span>
                    <strong>8 horas presenciais</strong>
                  </div>
                  <div>
                    <span>Participantes</span>
                    <strong>Até 30 lideranças</strong>
                  </div>
                </div>
              </header>

              <div className="lab-modules">
                <div className="lab-module">
                  <span>Módulo 1</span>
                  <h4>AI-Native Organizations</h4>
                  <p>
                    Transformação do trabalho, novas estruturas organizacionais e integração
                    humano + IA.
                  </p>
                </div>
                <div className="lab-module">
                  <span>Módulo 2</span>
                  <h4>Stack & Architecture</h4>
                  <p>
                    Funcionamento de agentes, workflows, memória, integração e sistemas
                    multiagentes.
                  </p>
                </div>
                <div className="lab-module">
                  <span>Módulo 3</span>
                  <h4>Agent Store Experience</h4>
                  <p>Laboratório vivo com estações de agentes aplicados à rotina corporativa.</p>
                </div>
                <div className="lab-module">
                  <span>Módulo 4</span>
                  <h4>Build Your Workflow</h4>
                  <p>Construção prática de fluxos, agentes e automações aplicadas ao negócio.</p>
                </div>
              </div>

              <div className="lab-format-subsection">
                <h4 className="lab-format-subtitle">Agent Store Experience</h4>
                <p className="lab-format-sub-text">
                  Os participantes circulam por estações práticas como:
                </p>
                <div className="lab-stations">
                  {agentStations.map((station) => (
                    <div className="lab-station" key={station.name}>
                      <h5>{station.name}</h5>
                      <p>{station.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lab-format-subsection">
                <h4 className="lab-format-subtitle">Entregáveis</h4>
                <ul className="lab-bullets lab-bullets-grid">
                  <li>Protótipos funcionais</li>
                  <li>Mapas de oportunidades</li>
                  <li>Workflows desenhados</li>
                  <li>Repertório técnico comum</li>
                  <li>Visão arquitetural inicial</li>
                  <li>Direcionamentos para próximos ciclos</li>
                </ul>
              </div>

              <PricingTable rows={leadershipLabPricing} />
            </article>

            <article className="lab-format">
              <header className="lab-format-header">
                <div>
                  <span className="lab-format-index">Formato 03</span>
                  <h3 className="lab-format-title">AI-Native Sprint</h3>
                  <p className="lab-format-sub">Jornada completa de transformação aplicada.</p>
                </div>
                <div className="lab-format-specs">
                  <div>
                    <span>Duração</span>
                    <strong>24 horas</strong>
                  </div>
                  <div>
                    <span>Estrutura</span>
                    <strong>4 semanas</strong>
                  </div>
                  <div>
                    <span>Participantes</span>
                    <strong>Até 30 lideranças</strong>
                  </div>
                </div>
              </header>

              <div className="lab-timeline">
                {sprintWeeks.map((item) => (
                  <div className="lab-timeline-item" key={item.week}>
                    <span className="lab-timeline-week">{item.week}</span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="lab-format-subsection">
                <h4 className="lab-format-subtitle">Entregas finais</h4>
                <p className="lab-format-sub-text">
                  Cada grupo desenvolve um workflow, um agente, uma automação ou um sistema
                  multiagente aplicado ao contexto da empresa.
                </p>
              </div>

              <div className="lab-format-subsection">
                <h4 className="lab-format-subtitle">Resultados esperados</h4>
                <ul className="lab-bullets lab-bullets-grid">
                  <li>Alinhamento executivo</li>
                  <li>Maturidade organizacional em IA</li>
                  <li>Capacidade de experimentação</li>
                  <li>Visão técnica aplicada</li>
                  <li>Linguagem comum entre áreas</li>
                  <li>Repertório para tomada de decisão</li>
                </ul>
              </div>

              <PricingTable rows={aiNativeSprintPricing} />
            </article>
          </div>
        </section>

        <section className="lab-section">
          <div className="lab-container lab-grid-2">
            <div>
              <span className="lab-section-tag">Observações</span>
              <h2 className="lab-section-title">O que está incluso nos investimentos.</h2>
              <p className="lab-section-lead">
                Deslocamentos, locação de espaço e customizações específicas podem ser orçados
                separadamente, conforme o contexto da empresa.
              </p>
            </div>
            <ul className="lab-bullets lab-bullets-large">
              <li>Facilitação especializada</li>
              <li>Curadoria executiva</li>
              <li>Infraestrutura preparada</li>
              <li>Stack configurada</li>
              <li>Ambientes de experimentação</li>
              <li>Materiais de apoio</li>
              <li>Experiências hands-on</li>
              <li>Condução completa da jornada pela equipe Mastertech + Agentic People</li>
            </ul>
          </div>
        </section>

        <section id="contato" className="lab-cta">
          <div className="lab-container">
            <div className="lab-cta-inner">
              <span className="lab-section-tag lab-tag-light">Mastertech + Agentic People</span>
              <h2 className="lab-cta-title">
                Uma experiência executiva que une profundidade técnica, visão organizacional e
                desenvolvimento de liderança para o futuro do trabalho.
              </h2>
              <p className="lab-cta-text">
                Vamos desenhar a jornada certa para a sua organização — do kickoff executivo à
                imersão completa.
              </p>
              <div className="lab-cta-actions">
                <a href="mailto:contato@mastertech.com.br" className="lab-btn lab-btn-light">
                  Falar com a curadoria
                </a>
                <a href="#formatos" className="lab-btn lab-btn-outline-light">
                  Revisar formatos
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="lab-footer">
        <div className="lab-container lab-footer-inner">
          <div className="lab-brand">
            <span className="lab-brand-primary">Mastertech</span>
            <span className="lab-brand-divider">×</span>
            <span className="lab-brand-secondary">Agentic People</span>
          </div>
          <p>
            AI-Native Leadership Lab · Liderança para organizações compostas por humanos e
            inteligência artificial.
          </p>
        </div>
      </footer>
    </div>
  )
}
