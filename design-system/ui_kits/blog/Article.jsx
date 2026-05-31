/* Abseth Blog UI kit (blogs.abseth.com) — article chrome + content components. */
const { useState, useEffect } = React;

/* ---- Back button (fixed top-left) ---- */
function BackButton({ label = 'Blogs' }) {
  return (
    <a href="#" className="back-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

/* ---- Theme toggle (fixed bottom-right) ---- */
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

/* ---- Sticky table of contents with reading-progress fill + scroll-spy ---- */
function TOC({ items }) {
  const [active, setActive] = useState(items[0] && items[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
      // scroll-spy
      let current = items[0] && items[0].id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 120) current = it.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const jump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
  };

  return (
    <aside className="toc-sticky" aria-label="Table of contents">
      <div className="toc-wrapper">
        <h3 className="toc-title">Contents</h3>
        <div className="reading-progress" style={{ top: 44, bottom: 44 }} aria-hidden="true">
          <div className="reading-progress-fill" style={{ height: (progress * 100) + '%' }}></div>
        </div>
        <nav className="toc-nav">
          <ul className="toc-list">
            {items.map(it => (
              <li key={it.id}>
                <a href={'#' + it.id} className={active === it.id ? 'active' : ''} onClick={(e) => jump(e, it.id)}>{it.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="toc-top" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top</a>
      </div>
    </aside>
  );
}

/* ---- Content building blocks ---- */
function Callout({ bordered, children }) {
  return <div className={bordered ? 'callout-border' : 'callout'}>{children}</div>;
}
function RefBadge({ n, href = '#' }) {
  return <a href={href} className="ref-inline" target="_blank">{n}</a>;
}
function CodeBlock({ children }) {
  return <pre><code>{children}</code></pre>;
}

Object.assign(window, { BackButton, ThemeToggle, TOC, Callout, RefBadge, CodeBlock });
