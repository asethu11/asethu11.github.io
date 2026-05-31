/* Abseth Portfolio UI kit — components. Exports to window for index.html. */
const { useState, useEffect, useRef } = React;

/* ---- Sticky vertical "human-coded" badge ---- */
function HumanCodedBadge() {
  return (
    <div className="human-coded-badge">
      <span>site coded by a human in vanilla HTML, CSS, and JavaScript.</span>
    </div>
  );
}

/* ---- Theme toggle (light/dark) ---- */
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return (
    <button className="theme-toggle" aria-label="Toggle theme" onClick={() => setDark(d => !d)}>
      {dark ? '☾' : '☀'}
    </button>
  );
}

/* ---- Hero: typed cursor, name, intro, word-loader, socials ---- */
const TYPED_WORDS = ['hello.', 'hola.', 'bonjour.', 'namaste.'];
function Hero({ onCopyEmail }) {
  const [word, setWord] = useState('');
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const full = TYPED_WORDS[wi];
    if (word.length < full.length) {
      const t = setTimeout(() => setWord(full.slice(0, word.length + 1)), 120);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => { setWord(''); setWi((wi + 1) % TYPED_WORDS.length); }, 1800);
    return () => clearTimeout(hold);
  }, [word, wi]);

  return (
    <header className="header">
      <div className="logo">
        <div className="flex">
          <p className="header-sub-title" style={{ minWidth: '1ch' }}>{word}</p>
          <p className="header-sub-title blink">|</p>
        </div>
        <h1 className="hero-name">i'm abhishek.</h1>
        <h4 className="uh-bee">uh-bee-shake</h4>
      </div>

      <p className="introduction-text">
        I design products.<br /><br />
        Currently focused on <b>AI-native products</b> built with LLMs, RAG systems, and agentic
        workflows. Designing core experiences for enterprise products with <b>220K+ users</b>.<br /><br />
        Strengths in simplifying complex workflows &amp; data-heavy systems, and scaling features/products
        from 0→1 and 1→N.
      </p>

      <WordLoader />
      <br />

      <p className="introduction-text" style={{ marginTop: '1rem' }}>
        I'm kinda cool.{' '}
        <a href="about.html" className="headtag">Read more about me here<span className="arr">--&gt;</span></a>
      </p>

      <div className="socials">
        <div className="social-icons">
          <a href="https://github.com/asethu11" target="_blank" aria-label="GitHub"><i className="fab fa-github"></i></a>
          <a href="#" onClick={(e) => { e.preventDefault(); onCopyEmail(); }} aria-label="Copy email"><i className="fas fa-envelope"></i></a>
          <a href="https://medium.com/@mailsofabhishek" target="_blank" aria-label="Medium"><i className="fab fa-medium"></i></a>
        </div>
        <a href="https://www.linkedin.com/in/asethu/" target="_blank" id="linkedin">
          <p id="linked">Your <i className="fab fa-linkedin" id="linklog"></i> just called—said it needs me --&gt;</p>
        </a>
      </div>
    </header>
  );
}

/* ---- Animated "Previously in" rotating words ---- */
function WordLoader() {
  return (
    <div className="card" style={{ overflowY: 'hidden' }}>
      <div className="loader">
        <p className="ploader">Previously in</p>
        <div className="words">
          <span className="word">Conversion-focused B2C</span>
          <span className="word">SaaS</span>
          <span className="word">VR/XR Simulations</span>
          <span className="word">Healthcare</span>
          <span className="word">Conversion-focused B2C</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Main work: large project card with 3D tilt + reveal badge ---- */
function ProjectCard({ img, badge, title, description }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale(1.01)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div className="headerproject">
      <a>
        <div className="grey-background headerprojectbg" ref={ref}
             onMouseMove={onMove} onMouseLeave={reset} style={{ transformStyle: 'preserve-3d' }}>
          <img src={img} alt={title} className="project-image" />
          {badge && <div className="thumb-badge">{badge}</div>}
        </div>
      </a>
      <div className="project-text">
        <div className="project-title"><h3>{title}</h3></div>
        <p className="project-description">{description}</p>
        <a className="link">Visit --&gt;</a>
      </div>
    </div>
  );
}

Object.assign(window, { HumanCodedBadge, ThemeToggle, Hero, WordLoader, ProjectCard });
