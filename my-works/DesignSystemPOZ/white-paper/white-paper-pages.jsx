// white-paper-pages.jsx — page templates for the Point One Zero white paper
// Each page is a 1080×1440 portrait artboard.
// Exports to window so the main index can drop them into <DCArtboard> slots.

// ---------------- Frame chrome ----------------
function WPHead({ left, right = 'Point one zero', section }) {
  return (
    <div className="wp-head">
      <div>{left}</div>
      {section && <div style={{ color: 'var(--foreground-subtle)' }}>{section}</div>}
      <div className="wp-mark">{right}<span className="dot">.</span></div>
    </div>
  );
}

function WPFoot({ page, total = 36, title = "The Founder's Playbook" }) {
  return (
    <div className="wp-foot">
      <div>{String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      <div className="wp-foot-title">{title}</div>
    </div>
  );
}

// ============================================================
// COVER
// ============================================================
function WPCover({
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
    <article className="wp-page wp-cover">
      <div className="wp-cover-top">
        <div className="wp-mark"><span className="brand-dot"></span>point one zero</div>
        <div className="wp-meta">{number}<br/>{version}</div>
      </div>
      <div className="wp-cover-middle">
        <span className="wp-cover-eyebrow"><span className="brand-dot"></span>{eyebrow}</span>
        <h1 className="wp-cover-title">{title}<br/><span className="brand-word">{brandWord}</span>{brandWordTail}</h1>
        <p className="wp-cover-sub">{sub}</p>
      </div>
      <div className="wp-cover-bottom">
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
    </article>
  );
}

// ============================================================
// TABLE OF CONTENTS
// ============================================================
function WPToc({
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
    <article className="wp-page">
      <WPHead left="Contents" />
      <div className="wp-body">
        <div className="wp-toc-head">
          <h2>Contents</h2>
          <div className="meta">8 chapters · 36 pages</div>
        </div>
        <div className="wp-toc-list">
          {items.map((it, i) => (
            <div key={i} className="wp-toc-item">
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
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// CHAPTER DIVIDER
// ============================================================
function WPChapter({
  chapterNum = 'Chapter 03',
  title = 'Idea',
  brandWord = 'stage',
  lead = "Every startup founder starts from the same place: a problem they can't stop thinking about. Startup success in 2026 requires the discipline of not building until the evidence justifies it.",
  page = 8
}) {
  return (
    <article className="wp-page wp-chapter">
      <div className="wp-chapter-top">
        <div className="wp-mark">point one zero<span className="dot">.</span></div>
        <div className="pg">{String(page).padStart(2, '0')} / 36</div>
      </div>
      <div className="wp-chapter-body">
        <div className="wp-chapter-num">{chapterNum}</div>
        <h1 className="wp-chapter-title">{title} <span className="brand-word">{brandWord}</span></h1>
        <p className="wp-chapter-lead">{lead}</p>
      </div>
      <div className="wp-chapter-bottom">
        <div>The Founder's Playbook</div>
        <div>Building an AI-native startup</div>
      </div>
    </article>
  );
}

// ============================================================
// BODY — STANDARD (opener with drop cap)
// ============================================================
function WPBodyStandard({
  page = 9,
  section = 'Chapter 03 · Idea stage',
  eyebrow = 'Idea stage · goal',
  heading = 'Research-oriented validation before a single line of code.',
  paragraphs = [
    'Every startup founder starts from the same place: a problem they can\'t stop thinking about. This is the phase where idea meets reality — startup success in 2026 requires the discipline of not building until the evidence justifies it.',
    'The work is research, customer discovery, competitive analysis, and honest evaluation of disconfirming evidence — all before asking Claude Code to generate the first line of production code.',
    "Practically speaking, the Idea stage is a series of questions a founder has to answer in roughly this order. Is the problem real, specific, and frequent enough to build around? Who exactly has it, and is that a market? Is anyone else solving it, and if so, how and how well?",
    "What would a solution actually need to do, and does my idea do that? The results add up to a single, ultimate question: is this worth building?",
  ]
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        {paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? 'wp-opener' : ''}>{p}</p>
        ))}
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — NUMBERED LIST
// ============================================================
function WPBodyNumbered({
  page = 11,
  section = 'Chapter 03 · Idea stage',
  eyebrow = 'Exit criteria',
  heading = 'When you can answer yes to all three, the Idea stage is done.',
  intro = "You will never have certainty at this stage, and waiting for it is its own failure mode — but you need enough qualitative signal that committing to an MVP is a reasoned decision over an act of faith.",
  items = [
    { t: 'Is the problem real and specific?', d: 'You can name exactly who experiences it, how often, how severely it affects them, and what they currently do about it.' },
    { t: 'Does your solution address the actual problem?', d: 'Not the one you originally assumed — the one the validation process revealed. Sometimes these match. Often they don\'t.' },
    { t: 'Do you have enough signal to justify building?', d: 'Enough conviction to commit a quarter of runway. Not certainty. Enough.' },
  ]
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <p className="wp-lead">{intro}</p>
        <ol className="wp-ol">
          {items.map((it, i) => (
            <li key={i}>
              <span className="wp-li-title">{it.t}</span>
              {it.d}
            </li>
          ))}
        </ol>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — BULLET LIST
// ============================================================
function WPBodyBullets({
  page = 7,
  section = "Chapter 02 · What it means to be a founder",
  eyebrow = "AI capabilities for lean startups",
  heading = "Three areas in particular let a small team operate like a much larger org.",
  intro = "Early-stage startups in 2026 are radically different. They're extremely lean by design — often the founder alone, or a team with a few others. Centering both technical and organizational development on AI as infrastructure produces leverage that the headcount can't explain.",
  items = [
    'Conversational intelligence and research — competitive analysis, market sizing, financial modeling, drafting investor memos and PRDs.',
    'Agentic coding — the engineer who is always available, never blocked. Plain-language direction, production-grade output.',
    'Workflow automation — recurring operational tasks configure themselves; the CRM updates as deals move, weekly reports compile, docs stay in sync with the product.',
  ]
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <p className="wp-lead">{intro}</p>
        <ul className="wp-ul">
          {items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — PULL QUOTE
// ============================================================
function WPBodyPullquote({
  page = 12,
  section = 'Chapter 03 · Idea stage',
  eyebrow = 'Idea stage · challenges',
  heading = 'Mistaking building for validating.',
  before = "When technical blockers are lifted, an impassioned founder risks skipping the most important work in the journey: validating that their idea is genuinely a solution people will use.",
  quote = "42% of startups failed because they built something nobody wanted. Agentic coding has collapsed the distance between \u201CI have an idea\u201D and \u201CI have a product\u201D — that failure rate is only going to climb.",
  cite = 'Source · CB Insights, Top reasons startups fail',
  after = "Until very recently, building required real dev time and budget. Getting even a basic prototype together meant a technical co-founder, a contract dev shop, or a long enough runway to hire engineers. That natural gate forced validation. It's gone now."
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <p>{before}</p>
        <div className="wp-pullquote">
          <p className="q">{quote}</p>
          <div className="cite">{cite}</div>
        </div>
        <p>{after}</p>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — STAT ROW
// ============================================================
function WPBodyStats({
  page = 4,
  section = 'Chapter 01 · The startup lifecycle, rebooted',
  eyebrow = 'By the numbers',
  heading = 'The compression is measurable.',
  intro = "The traditional growth arc assumed each new phase required a bigger team, a different skill set, and a fresh funding round. The 2026 arc punctures that assumption at every interval.",
  stats = [
    { n: '17', sx: 'hrs', l: 'Idea to production prototype on a recent engagement.' },
    { n: '10\u00D7', l: 'Faster to market than the median 2024 cohort.', brand: true },
    { n: '47%', l: 'Reduction in first-year operating cost vs. traditional model.' },
  ],
  outro = "These aren't peak numbers — they're medians from the AI-native cohort we've observed across the last twelve months. The variance is narrower than you'd expect."
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <p className="wp-lead">{intro}</p>
        <div className="wp-stat-row">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div className={'n' + (s.brand ? ' brand' : '')}>{s.n}{s.sx && <span className="sx">{s.sx}</span>}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
        <p>{outro}</p>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — TWO COLUMN
// ============================================================
function WPBodyTwoCol({
  page = 32,
  section = 'Chapter 07 · Same job, new rules',
  eyebrow = 'Synthesis',
  heading = 'The founder role didn\u2019t shrink. It moved up the stack.',
  leftPars = [
    "Historically, founders spent the bulk of their time in execution mode: writing code, managing people, handling day-to-day operational work. The job rewarded throughput.",
    "In an AI-native startup, that role inverts. Less individual contributor, much more orchestrator — directing specialized agents that read files, run commands, execute code, browse the web.",
  ],
  rightPars = [
    "The founder's attention shifts up the stack toward the higher-order work: generating ideas and directing the systems (AI agents, tools, and whatever small team exists) that carry those ideas out.",
    "Timing and orchestration are everything. The leverage is real, but it doesn't run on autopilot. The founder still has to know which tool to apply, and when to stop applying it.",
  ]
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <div className="wp-two-col">
          <div className="col">
            {leftPars.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="col">
            {rightPars.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — FIGURE / DIAGRAM PLACEHOLDER
// ============================================================
function WPBodyFigure({
  page = 6,
  section = 'Chapter 02 · What it means to be a founder',
  eyebrow = 'Fig. 02',
  heading = 'The lean startup org chart, redrawn.',
  intro = "Headcount used to be the proxy for organizational momentum and product maturity. Replacing it with capability-per-founder is the v2026 reframing.",
  figureLabel = 'DIAGRAM · ORG CHART COMPARISON',
  caption = 'Fig. 02 — Traditional vs. AI-native org footprint, year one.'
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <p className="wp-lead">{intro}</p>
        <figure className="wp-figure">
          <div className="frame" data-label={figureLabel}></div>
          <figcaption>
            <span className="label">Fig. 02</span>
            <span>{caption}</span>
          </figcaption>
        </figure>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — FEATURED STAT + COPY
// ============================================================
function WPBodyFeaturedStat({
  page = 26,
  section = 'Chapter 06 · Scale stage',
  eyebrow = 'The scale-stage reframe',
  heading = 'Lean is no longer scrappy. It is the operating model.',
  paragraphs = [
    "The scale stage used to mean hiring sales, expanding ops, building out infrastructure teams. Each step required raising again, hiring again, layering more management.",
    "An AI-native startup at scale looks structurally different. Workflow automation replaces a meaningful share of operational headcount. Agentic systems carry the load of an engineering team that you never built. The org chart stays small on purpose.",
    "The discipline at this stage is to resist the gravitational pull of traditional scale playbooks — and to keep extending leverage rather than headcount.",
  ],
  statN = '92+',
  statSuffix = '',
  statEyebrow = 'Featured number',
  statLabel = 'Reusable AI agents in deployment across the cohort we tracked.',
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', marginTop: '24px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {paragraphs.map((p, i) => <p key={i} style={i === 0 ? { marginTop: 0 } : {}}>{p}</p>)}
          </div>
          <div className="wp-featured-stat">
            <div className="eyebrow">{statEyebrow}</div>
            <div className="n">{statN}{statSuffix && <span className="sx">{statSuffix}</span>}</div>
            <div className="l">{statLabel}</div>
          </div>
        </div>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BODY — CALLOUT
// ============================================================
function WPBodyCallout({
  page = 17,
  section = 'Chapter 04 · MVP stage',
  eyebrow = 'Operating principle',
  heading = 'Build the smallest defensible version. Then defend it.',
  paragraphs = [
    "The MVP is not the product. It's the smallest artifact that lets a real user try the real workflow and tell you whether it works.",
    "Defensible, here, means it solves enough of the problem that a user will keep coming back. Not delightful. Not polished. Just enough to test the loop.",
    "The temptation in 2026 is to over-build because over-building is cheap. Resist it. The cost is no longer the engineering — it's the calibration debt every extra feature adds before you've proven the core."
  ],
  calloutEyebrow = 'The trap',
  calloutTitle = "Polish is not validation.",
  calloutBody = "A prototype that looks finished can borrow credibility it hasn't earned. Users will tell you the navigation is good when what you needed to learn was whether they'd pay."
}) {
  return (
    <article className="wp-page">
      <WPHead left={section} />
      <div className="wp-body">
        <span className="wp-eyebrow">{eyebrow}</span>
        <h1 className="wp-h1">{heading}</h1>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        <aside className="wp-callout">
          <div className="eyebrow">{calloutEyebrow}</div>
          <h4>{calloutTitle}</h4>
          <p>{calloutBody}</p>
        </aside>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// RESOURCES / REFERENCES
// ============================================================
function WPResources({
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
    <article className="wp-page">
      <WPHead left="Resources" />
      <div className="wp-body">
        <span className="wp-eyebrow">Further reading</span>
        <h1 className="wp-h1">Resources & references.</h1>
        <p className="wp-lead">The studies, frameworks, and tools cited across the playbook. Every link checked at time of publication.</p>
        <div className="wp-refs" style={{ marginTop: '32px' }}>
          {refs.map((r, i) => (
            <div key={i} className="ref">
              <div className="n">{String(i + 1).padStart(2, '0')}</div>
              <div className="body">
                <div className="t">{r.t}</div>
                <div className="src">{r.src} &middot; <span className="url">{r.url}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WPFoot page={page} />
    </article>
  );
}

// ============================================================
// BACK COVER
// ============================================================
function WPBack({
  heading = "Ready to map the shortest path between idea and exit?",
  brandWord = "Let's talk.",
  sub = "Point One Zero partners with founders to build AI-native startups — from the first validated insight to the team that scales the win.",
  ctaText = 'hello@pointonezero.com',
  address = '25 Palmer Square\u00A0\u00A0Princeton, NJ 08542',
  phone = '(678) 901-4328',
  number = 'WP-026-03'
}) {
  return (
    <article className="wp-page wp-back">
      <div className="wp-back-top">
        <div className="wp-mark"><span className="brand-dot"></span>point one zero</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-subtle)' }}>{number}</div>
      </div>
      <div className="wp-back-middle">
        <h2>{heading} <span className="brand-word">{brandWord}</span></h2>
        <p>{sub}</p>
        <div className="wp-back-cta">{ctaText} <span>&rarr;</span></div>
      </div>
      <div className="wp-back-bottom">
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
    </article>
  );
}

// Export all to window for the main file
Object.assign(window, {
  WPCover, WPToc, WPChapter,
  WPBodyStandard, WPBodyNumbered, WPBodyBullets,
  WPBodyPullquote, WPBodyStats, WPBodyTwoCol,
  WPBodyFigure, WPBodyFeaturedStat, WPBodyCallout,
  WPResources, WPBack,
});
