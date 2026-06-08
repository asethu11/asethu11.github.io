// white-paper-landscape-pages.jsx — 1920×1080 landscape variants
// Same chapters, same tokens — split layouts the wider format unlocks.

function WPLHead({ left, right = 'Point one zero' }) {
  return (
    <div className="wpl-head">
      <div>{left}</div>
      <div className="wpl-mark">{right}<span className="dot">.</span></div>
    </div>
  );
}

function WPLFoot({ page, total = 36, title = "The Founder's Playbook" }) {
  return (
    <div className="wpl-foot">
      <div>{String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      <div className="wpl-foot-title">{title}</div>
    </div>
  );
}

// ============================================================
// COVER (landscape)
// ============================================================
function WPLCover({
  eyebrow = 'A Point One Zero white paper',
  title = "The founder's playbook",
  brandWord = 'rebooted',
  brandWordTail = ' for 2026.',
  sub = "Building an AI-native startup, stage by stage. How research, agentic coding, and workflow automation are compressing the path from idea to scale.",
  authors = 'Maya Lindgren, Theo Aaron',
  date = 'May 2026',
  version = 'Vol. 01 · No. 03',
  number = 'WP-026-03'
}) {
  return (
    <article className="wpl-page wpl-cover">
      <div className="wpl-cover-left">
        <div className="wpl-mark"><span className="brand-dot"></span>point one zero</div>
        <div>
          <span className="wpl-cover-eyebrow"><span className="brand-dot"></span>{eyebrow}</span>
          <h1 className="wpl-cover-title">{title} <span className="brand-word">{brandWord}</span>{brandWordTail}</h1>
          <p className="wpl-cover-sub">{sub}</p>
        </div>
      </div>
      <div className="wpl-cover-right">
        <div className="meta">{number}<br/>{version}</div>
        <div className="credits">
          <div className="col">
            <span className="l">Authors</span>
            <span className="v">{authors}</span>
          </div>
          <div className="col">
            <span className="l">Published</span>
            <span className="v">{date}</span>
          </div>
          <div className="col">
            <span className="l">Reference</span>
            <span className="v mono">{number}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// TOC (landscape) — two column
// ============================================================
function WPLToc({
  page = 2,
  items = [
    { num: '01', t: 'The startup lifecycle, rebooted for 2026', d: 'AI compresses every stage between idea and exit.', pg: '03' },
    { num: '02', t: 'What it means to be a founder is changing', d: 'From individual contributor to orchestrator of agents.', pg: '05' },
    { num: '03', t: 'Idea stage', d: 'Research-oriented validation before the first line of code.', pg: '08' },
    { num: '04', t: 'MVP stage', d: 'Build the smallest defensible version, fast.', pg: '15' },
    { num: '05', t: 'Launch stage', d: 'Distribution, first revenue, and signal-to-noise on demand.', pg: '21' },
    { num: '06', t: 'Scale stage', d: 'Lean by design — automation as the operating model.', pg: '25' },
    { num: '07', t: 'Same job, new rules', d: 'Where the founder role still sits at the center.', pg: '31' },
    { num: '08', t: 'Resources', d: 'Tools, frameworks, and further reading.', pg: '33' },
  ]
}) {
  return (
    <article className="wpl-page">
      <WPLHead left="Contents" />
      <div className="wpl-body">
        <div className="wpl-toc-head">
          <h2>Contents</h2>
          <div className="meta">8 chapters · 36 pages</div>
        </div>
        <div className="wpl-toc-grid">
          {items.map((it, i) => (
            <div key={i} className="wpl-toc-item">
              <div className="num">{it.num}</div>
              <div className="title">
                <div className="t">{it.t}</div>
                <div className="d">{it.d}</div>
              </div>
              <div className="pg">{it.pg}</div>
            </div>
          ))}
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// CHAPTER DIVIDER (landscape)
// ============================================================
function WPLChapter({
  chapterNum = 'Chapter 03',
  title = 'Idea',
  brandWord = 'stage',
  lead = "Every startup founder starts from the same place: a problem they can't stop thinking about. Startup success in 2026 requires the discipline of not building until the evidence justifies it.",
  page = 8,
  meta = "Building an AI-native startup"
}) {
  return (
    <article className="wpl-page wpl-chapter">
      <div className="wpl-chapter-top">
        <div className="wpl-mark">point one zero<span className="dot">.</span></div>
        <div className="pg">{String(page).padStart(2, '0')} / 36</div>
      </div>
      <div className="wpl-chapter-body">
        <div className="left">
          <div className="wpl-chapter-num">{chapterNum}</div>
          <h1 className="wpl-chapter-title">{title}<br/><span className="brand-word">{brandWord}</span></h1>
        </div>
        <div className="right">
          <p className="wpl-chapter-lead">{lead}</p>
          <div className="wpl-chapter-rule"></div>
          <div className="wpl-chapter-meta">
            <span>The Founder's Playbook</span>
            <span>{meta}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// BODY — STANDARD (single column, generous whitespace)
// ============================================================
function WPLBodyStandard({
  page = 9,
  section = 'Chapter 03 · Idea stage',
  eyebrow = 'Idea stage · goal',
  heading = 'Research-oriented validation before a single line of code.',
  lead = "Every startup founder starts from the same place: a problem they can't stop thinking about. The Idea stage is where the work is research, customer discovery, competitive analysis, and honest evaluation of disconfirming evidence \u2014 all before generating the first line of production code.",
  paragraphs = [
    "Practically speaking, the Idea stage is a series of questions a founder has to answer in roughly this order. Is the problem real, specific, and frequent enough to build around? Who exactly has it, and is that a market? Is anyone else solving it, and if so, how well?",
    "What would a solution actually need to do, and does your idea do that? The results add up to a single, ultimate question: is this worth building?",
    "That means getting specific before getting moving. \u201CPeople struggle with expense reporting\u201D is an observation. \u201CFinance managers at mid-market companies spend four-plus hours a week reconciling submissions because their tools don't integrate with their accounting software\u201D is a testable hypothesis.",
  ]
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <p className="wpl-lead">{lead}</p>
        <div className="wpl-two-prose">
          <div>
            {paragraphs.slice(0, Math.ceil(paragraphs.length / 2)).map((p, i) => (
              <p key={i} className="wpl-p" style={i === 0 ? { marginTop: 0 } : {}}>{p}</p>
            ))}
          </div>
          <div>
            {paragraphs.slice(Math.ceil(paragraphs.length / 2)).map((p, i) => (
              <p key={i} className="wpl-p" style={i === 0 ? { marginTop: 0 } : {}}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — BODY + SIDEBAR PULL QUOTE
// ============================================================
function WPLBodyPullquote({
  page = 12,
  section = 'Chapter 03 · Idea stage',
  eyebrow = 'Idea stage · challenges',
  heading = 'Mistaking building for validating.',
  paragraphs = [
    "When technical blockers are lifted, an impassioned founder risks skipping the most important work in the journey: validating that their idea is genuinely a solution people will use.",
    "Even before the current era of agentic coding, 42% of startups failed because they built something nobody wanted. Agentic coding has collapsed the distance between \u201CI have an idea\u201D and \u201CI have a product\u201D \u2014 the failure rate is only going to climb.",
    "Until very recently, building required real dev time and budget. A technical co-founder, a contract dev shop, or a long enough runway to hire engineers. That natural gate forced validation. It's gone now \u2014 and the discipline has to come from somewhere else.",
  ],
  quote = "While there's never been a better time to be a founder with a synapse-shakingly good idea, the rapidity of spinning up a prototype that looks like a product presents an existential risk.",
  cite = 'Source · CB Insights, 2024'
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <div className="wpl-grid heavy-left">
          <div className="col">
            {paragraphs.map((p, i) => <p key={i} className="wpl-p">{p}</p>)}
          </div>
          <div className="col">
            <div className="wpl-sidebar-quote">
              <p className="q">{quote}</p>
              <div className="cite">{cite}</div>
            </div>
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — NUMBERED LIST
// ============================================================
function WPLBodyNumbered({
  page = 11,
  section = 'Chapter 03 · Idea stage',
  eyebrow = 'Exit criteria',
  heading = 'When you can answer yes to all three, the Idea stage is done.',
  intro = "You will never have certainty at this stage, and waiting for it is its own failure mode \u2014 but you need enough qualitative signal that committing to an MVP is a reasoned decision over an act of faith.",
  items = [
    { t: 'Is the problem real and specific?', d: 'You can name exactly who experiences it, how often, how severely it affects them, and what they currently do about it.' },
    { t: 'Does your solution address the actual problem?', d: 'Not the one you originally assumed \u2014 the one the validation process revealed. Sometimes these match. Often they don\'t.' },
    { t: 'Do you have enough signal to justify building?', d: 'Enough conviction to commit a quarter of runway. Not certainty. Enough.' },
  ]
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <div className="wpl-grid">
          <div className="col">
            <p className="wpl-lead" style={{ marginTop: 0 }}>{intro}</p>
          </div>
          <div className="col">
            <ol className="wpl-ol" style={{ marginTop: 0 }}>
              {items.map((it, i) => (
                <li key={i}>
                  <span className="wpl-li-title">{it.t}</span>
                  {it.d}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — STAT ROW (4 across)
// ============================================================
function WPLBodyStats({
  page = 4,
  section = 'Chapter 01 · The startup lifecycle, rebooted',
  eyebrow = 'By the numbers',
  heading = 'The compression is measurable across every stage.',
  intro = "The traditional growth arc assumed each new phase required a bigger team, a different skill set, and a fresh funding round. The 2026 arc punctures that assumption at every interval.",
  stats = [
    { n: '17', sx: 'hrs', l: 'Idea to production prototype on a recent engagement.' },
    { n: '10\u00D7', l: 'Faster to market than the median 2024 cohort.', brand: true },
    { n: '92+', l: 'Reusable AI agents in deployment across the cohort.' },
    { n: '47%', l: 'Reduction in first-year operating cost vs. traditional model.' },
  ],
  outro = "These aren't peak numbers \u2014 they're medians from the AI-native cohort we've observed across the last twelve months. The variance is narrower than you'd expect."
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <p className="wpl-lead">{intro}</p>
        <div className="wpl-stat-row">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div className={'n' + (s.brand ? ' brand' : '')}>{s.n}{s.sx && <span className="sx">{s.sx}</span>}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
        <p className="wpl-p" style={{ marginTop: '24px', maxWidth: '880px' }}>{outro}</p>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — BODY + FEATURED STAT
// ============================================================
function WPLBodyFeaturedStat({
  page = 26,
  section = 'Chapter 06 · Scale stage',
  eyebrow = 'The scale-stage reframe',
  heading = 'Lean is no longer scrappy. It is the operating model.',
  paragraphs = [
    "The scale stage used to mean hiring sales, expanding ops, building out infrastructure teams. Each step required raising again, hiring again, layering more management on top of management.",
    "An AI-native startup at scale looks structurally different. Workflow automation replaces a meaningful share of operational headcount. Agentic systems carry the load of an engineering team that you never built. The org chart stays small on purpose.",
    "The discipline at this stage is to resist the gravitational pull of traditional scale playbooks \u2014 and to keep extending leverage rather than headcount.",
  ],
  statN = '92+',
  statSuffix = '',
  statEyebrow = 'Featured number',
  statLabel = 'Reusable AI agents in deployment across the cohort we tracked.'
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <div className="wpl-grid heavy-left">
          <div className="col">
            {paragraphs.map((p, i) => <p key={i} className="wpl-p">{p}</p>)}
          </div>
          <div className="col">
            <div className="wpl-featured-stat">
              <div className="eyebrow">{statEyebrow}</div>
              <div className="n">{statN}{statSuffix && <span className="sx">{statSuffix}</span>}</div>
              <div className="l">{statLabel}</div>
            </div>
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — BODY + FIGURE
// ============================================================
function WPLBodyFigure({
  page = 6,
  section = 'Chapter 02 · What it means to be a founder',
  eyebrow = 'Fig. 02',
  heading = 'The lean startup org chart, redrawn.',
  paragraphs = [
    "Headcount used to be the proxy for organizational momentum and product maturity. Replacing it with capability-per-founder is the v2026 reframing.",
    "Each AI-native role consolidates work that previously took three or four hires. The org chart looks dramatically flatter, and the gap between intent and shipped work narrows.",
  ],
  figureLabel = 'DIAGRAM · ORG CHART COMPARISON',
  caption = 'Fig. 02 — Traditional vs. AI-native org footprint, year one.'
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <div className="wpl-grid">
          <div className="col">
            {paragraphs.map((p, i) => <p key={i} className="wpl-p">{p}</p>)}
          </div>
          <div className="col">
            <figure className="wpl-figure">
              <div className="frame" data-label={figureLabel}></div>
              <figcaption>
                <span className="label">Fig. 02</span>
                <span>{caption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — BODY + CALLOUT
// ============================================================
function WPLBodyCallout({
  page = 17,
  section = 'Chapter 04 · MVP stage',
  eyebrow = 'Operating principle',
  heading = 'Build the smallest defensible version. Then defend it.',
  paragraphs = [
    "The MVP is not the product. It's the smallest artifact that lets a real user try the real workflow and tell you whether it works.",
    "Defensible, here, means it solves enough of the problem that a user will keep coming back. Not delightful. Not polished. Just enough to test the loop.",
    "The temptation in 2026 is to over-build because over-building is cheap. Resist it. The cost is no longer the engineering \u2014 it's the calibration debt every extra feature adds before you've proven the core.",
  ],
  calloutEyebrow = 'The trap',
  calloutTitle = "Polish is not validation.",
  calloutBody = "A prototype that looks finished can borrow credibility it hasn't earned. Users will tell you the navigation is good when what you needed to learn was whether they'd pay."
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <div className="wpl-grid heavy-left">
          <div className="col">
            {paragraphs.map((p, i) => <p key={i} className="wpl-p">{p}</p>)}
          </div>
          <div className="col" style={{ justifyContent: 'center' }}>
            <aside className="wpl-callout">
              <div className="eyebrow">{calloutEyebrow}</div>
              <h4>{calloutTitle}</h4>
              <p>{calloutBody}</p>
            </aside>
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — BULLET LIST
// ============================================================
function WPLBodyBullets({
  page = 7,
  section = "Chapter 02 · What it means to be a founder",
  eyebrow = "AI capabilities for lean startups",
  heading = "Three areas in particular let a small team operate like a much larger org.",
  intro = "Early-stage startups in 2026 are radically different. They're extremely lean by design \u2014 often the founder alone, or a team with a few others. Centering both technical and organizational development on AI as infrastructure produces leverage that the headcount can't explain.",
  items = [
    { t: 'Conversational intelligence and research', d: 'Competitive analysis, market sizing, financial modeling, drafting investor memos and PRDs \u2014 the on-call expert across every domain.' },
    { t: 'Agentic coding', d: 'The engineer who is always available, never blocked. Plain-language direction, production-grade output, real test coverage.' },
    { t: 'Workflow automation', d: 'Recurring operational tasks configure themselves; the CRM updates as deals move, weekly reports compile, docs stay in sync with the product.' },
  ]
}) {
  return (
    <article className="wpl-page">
      <WPLHead left={section} />
      <div className="wpl-body">
        <span className="wpl-eyebrow">{eyebrow}</span>
        <h1 className="wpl-h1">{heading}</h1>
        <div className="wpl-grid">
          <div className="col">
            <p className="wpl-lead" style={{ marginTop: 0 }}>{intro}</p>
          </div>
          <div className="col">
            <ul className="wpl-ul" style={{ marginTop: 0 }}>
              {items.map((it, i) => (
                <li key={i}>
                  <span className="wpl-li-title">{it.t}</span>
                  {it.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// RESOURCES (landscape — 2 column)
// ============================================================
function WPLResources({
  page = 33,
  refs = [
    { t: 'The lean startup, fifteen years on', src: 'Harvard Business Review · 2025', url: 'hbr.org/2025/04/lean-15' },
    { t: 'Why 42% of startups fail: market need, revisited', src: 'CB Insights · 2024', url: 'cbinsights.com/research/startup-failure-2024' },
    { t: 'Agentic coding in production: lessons from twelve cohorts', src: 'Anthropic · 2026', url: 'anthropic.com/research/agentic-coding' },
    { t: 'The ten-person unicorn is no longer a story', src: 'a16z futures · 2026', url: 'a16z.com/futures/ten-person-unicorn' },
    { t: 'Day Zero: the founder as orchestrator', src: 'Point One Zero notes · 2026', url: 'pointonezero.com/notes/day-zero' },
    { t: 'Workflow automation primer for early-stage teams', src: 'Point One Zero docs · 2026', url: 'pointonezero.com/docs/workflow-primer' },
  ]
}) {
  return (
    <article className="wpl-page">
      <WPLHead left="Resources" />
      <div className="wpl-body">
        <span className="wpl-eyebrow">Further reading</span>
        <h1 className="wpl-h1">Resources & references.</h1>
        <p className="wpl-lead">The studies, frameworks, and tools cited across the playbook. Every link checked at time of publication.</p>
        <div className="wpl-refs-grid">
          {refs.map((r, i) => (
            <div key={i} className="wpl-ref">
              <div className="n">{String(i + 1).padStart(2, '0')}</div>
              <div className="body">
                <div className="t">{r.t}</div>
                <div className="src">{r.src} &middot; <span className="url">{r.url}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WPLFoot page={page} />
    </article>
  );
}

// ============================================================
// BACK COVER (landscape)
// ============================================================
function WPLBack({
  heading = "Ready to map the shortest path between idea and exit?",
  brandWord = "Let's talk.",
  sub = "Point One Zero partners with founders to build AI-native startups \u2014 from the first validated insight to the team that scales the win.",
  ctaText = 'hello@pointonezero.com',
  address = '25 Palmer Square\u00A0\u00A0Princeton, NJ 08542',
  phone = '(678) 901-4328',
  number = 'WP-026-03'
}) {
  return (
    <article className="wpl-page wpl-back">
      <div className="wpl-back-left">
        <div className="wpl-mark"><span className="brand-dot"></span>point one zero</div>
        <div>
          <h2>{heading} <span className="brand-word">{brandWord}</span></h2>
          <p>{sub}</p>
          <div className="wpl-back-cta">{ctaText} <span>&rarr;</span></div>
        </div>
        <div></div>
      </div>
      <div className="wpl-back-right">
        <div className="meta-num">{number}</div>
        <div className="credits">
          <div className="col">
            <span className="l">Office</span>
            <span className="v">{address}</span>
          </div>
          <div className="col">
            <span className="l">Phone</span>
            <span className="v">{phone}</span>
          </div>
          <div className="col">
            <span className="l">Published</span>
            <span className="v mono">2026 &middot; v1.0</span>
          </div>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, {
  WPLCover, WPLToc, WPLChapter,
  WPLBodyStandard, WPLBodyBullets, WPLBodyNumbered,
  WPLBodyPullquote, WPLBodyStats, WPLBodyFeaturedStat,
  WPLBodyFigure, WPLBodyCallout,
  WPLResources, WPLBack,
});
