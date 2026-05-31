/* Abseth Portfolio UI kit — list sections: other projects, side-quests, writings, footer. */
const { useState: useStateB } = React;

const ARROW_SVG = (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
  </svg>
);

/* ---- Other projects: list + sticky hover preview ---- */
function OtherProjects({ items }) {
  const [active, setActive] = useStateB(0);
  return (
    <div className="other-projects">
      <h2 className="section-t">Other projects</h2>
      <div className="columns-container">
        <div className="projects">
          {items.map((p, i) => (
            <a className="project-row" key={i} onMouseEnter={() => setActive(i)}>
              <p className="project-row-title">{p.title}</p>
              <div className="project-row-sub-title">
                {p.tags.map((t, j) => (
                  <React.Fragment key={j}>
                    <p className="project-tag">{t}</p>
                    {j < p.tags.length - 1 && <p className="project-tag">·</p>}
                  </React.Fragment>
                ))}
              </div>
            </a>
          ))}
        </div>
        <div className="preview-container">
          {items.map((p, i) => (
            <div className={'project-preview' + (i === active ? ' active' : '')} key={i}>
              <img src={p.preview} alt={p.title + ' preview'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Side-quests: media rows with rotating play affordance ---- */
function SideQuests({ items }) {
  return (
    <div className="section-keynotes">
      <h2 className="section-t">Side-quests and other media</h2>
      <div className="keynotes">
        {items.map((s, i) => (
          <a className="video" key={i}>
            <div className="image-background" style={{ backgroundImage: s.bg ? `url(${s.bg})` : 'none' }}>
              <div className="play">{ARROW_SVG}</div>
            </div>
            <div className="video-text">
              <h3 className="video-title">{s.title}</h3>
              <p className="video-description" dangerouslySetInnerHTML={{ __html: s.desc }} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---- Writings list ---- */
function Writings({ items }) {
  return (
    <div className="section-writings">
      <div className="section-header-row">
        <h2 className="section-t">Blogs and writings</h2>
        <a href="https://blogs.abseth.com" className="view-all-link">View all →</a>
      </div>
      <div className="writings">
        {items.map((w, i) => (
          <a className="article" key={i}>
            <div>
              <p className="article-title">{w.title}</p>
              <p className="article-date">{w.date}</p>
            </div>
            <p className="arrow">--&gt;</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a href="#top" className="headtag">back to top<span className="arr"> ↑</span></a>
      <p className="footer-text">© 2025. All rights reserved. Coded by a human in vanilla HTML, CSS, and JavaScript.</p>
    </footer>
  );
}

Object.assign(window, { OtherProjects, SideQuests, Writings, Footer });
