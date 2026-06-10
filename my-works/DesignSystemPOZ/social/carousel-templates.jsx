// carousel-templates.jsx
// SM carousel slide components — 1080×1350 portrait, editorial-mature.
//
// Variants: Cover, Chapter, Definition, Stat, Quote, Editorial, TwoCol, CTA.
// Chrome:
//   - no top strip — slide content starts at top padding
//   - foot has three configurations:
//       cover  · page indicator only (larger, right-aligned)
//       cta    · wordmark + URL (mono)
//       std    · wordmark + fading hairline + page indicator
//
// All slides default to the light system; toggle by setting
// data-theme="dark" on the .car-frame if a campaign wants it.

const { Fragment } = React;

// ---------- Helpers ----------
// Use <span> rather than <Fragment> so host-injected tracking attrs
// (data-om-id, etc.) land on a real element instead of triggering
// React's "invalid prop on Fragment" warnings.
const splitBrand = (text, brandWord) => {
  if (!brandWord) return [text];
  const parts = text.split(brandWord);
  return parts.map((p, i) => (
    <span key={i} className="split-piece">
      {p}
      {i < parts.length - 1 && <span className="brand-word">{brandWord}</span>}
    </span>
  ));
};
const pad2 = (n) => String(n).padStart(2, '0');

// ---------- Frame (shared chrome) ----------
const Frame = ({ page, total, variant, ctaUrl, children }) => {
  const foot =
    variant === 'cover' ? 'cover'
    : variant === 'cta' ? 'cta'
    : 'std';
  return (
    <div className={`car-frame car-${variant}`}>
      <div className="car-body">{children}</div>
      <div className={`car-foot car-foot-${foot}`}>
        <div className="car-foot-rule"></div>
        <div className="car-foot-row">
          {foot !== 'cover' && (
            <span className="car-wordmark">point one zero</span>
          )}
          {foot === 'cta' ? (
            <span className="car-foot-url">{ctaUrl || 'pointonezero.com'}</span>
          ) : (
            <span className="car-page">
              {pad2(page)}<span className="sep">/</span>{pad2(total)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Cover ----------
// Note: eyebrow / vol props accepted for back-compat with existing callers; unused.
const CoverSlide = ({ headline, brandWord, lead, page, total }) => (
  <Frame page={page} total={total} variant="cover">
    <h1 className="car-display car-display-lg">{splitBrand(headline, brandWord)}</h1>
    {lead && <p className="car-lead">{lead}</p>}
  </Frame>
);

// ---------- Chapter divider ----------
const ChapterSlide = ({ chapter, name, intro, page, total }) => (
  <Frame page={page} total={total} variant="chapter">
    <div className="car-chapter-num">{chapter}</div>
    <h2 className="car-display car-display-md">{name}</h2>
    {intro && <p className="car-lead car-lead-narrow">{intro}</p>}
  </Frame>
);

// ---------- Definition (word + body) ----------
const DefinitionSlide = ({ word, definition, body, footnote, page, total }) => (
  <Frame page={page} total={total} variant="definition">
    <div className="car-word">{word}</div>
    <div className="car-rule-accent"></div>
    <p className="car-def-defn">{definition}</p>
    {body && <p className="car-body-text">{body}</p>}
    {footnote && <span className="car-footnote">{footnote}</span>}
  </Frame>
);

// ---------- Stat (number + label + body) ----------
const StatSlide = ({ value, suffix, label, body, source, featured, page, total }) => (
  <Frame page={page} total={total} variant="stat">
    <div className={`car-stat-num${featured ? ' is-featured' : ''}`}>
      <span className="car-stat-val">{value}</span>
      <span className="car-stat-suf">{suffix}</span>
    </div>
    <div className="car-stat-label">{label}</div>
    {body && <p className="car-body-text">{body}</p>}
    {source && <span className="car-footnote">{source}</span>}
  </Frame>
);

// ---------- Quote / pull ----------
const QuoteSlide = ({ quote, attribution, source, page, total }) => (
  <Frame page={page} total={total} variant="quote">
    <blockquote className="car-quote-text">
      <span className="car-quote-mark">“</span>{quote}
    </blockquote>
    <div className="car-quote-attr">
      <span className="car-quote-name">{attribution}</span>
      {source && <span className="car-quote-source">{source}</span>}
    </div>
  </Frame>
);

// ---------- Editorial paragraph (drop cap) ----------
const EditorialSlide = ({ paragraph, byline, brandWord, page, total }) => {
  const para = splitBrand(paragraph, brandWord);
  return (
    <Frame page={page} total={total} variant="editorial">
      <p className="car-editorial-text">{para}</p>
      {byline && <span className="car-footnote">{byline}</span>}
    </Frame>
  );
};

// ---------- Two-column (compare / before-after) ----------
const TwoColSlide = ({ leftLabel, leftBody, rightLabel, rightBody, page, total }) => (
  <Frame page={page} total={total} variant="twocol">
    <div className="car-twocol">
      <div className="car-col">
        <div className="car-col-label">{leftLabel}</div>
        <p className="car-col-body">{leftBody}</p>
      </div>
      <div className="car-col-divider"></div>
      <div className="car-col">
        <div className="car-col-label">{rightLabel}</div>
        <p className="car-col-body">{rightBody}</p>
      </div>
    </div>
  </Frame>
);

// ---------- CTA (closing) ----------
const CTASlide = ({ headline, brandWord, body, action, url, page, total }) => (
  <Frame page={page} total={total} variant="cta" ctaUrl={url}>
    <h2 className="car-display car-display-md">{splitBrand(headline, brandWord)}</h2>
    {body && <p className="car-lead car-lead-narrow">{body}</p>}
    <div className="car-cta-row">
      <span className="car-cta-btn">{action || "Let's talk"}</span>
    </div>
  </Frame>
);

// Expose for cross-file babel scope.
Object.assign(window, {
  Frame,
  CoverSlide,
  ChapterSlide,
  DefinitionSlide,
  StatSlide,
  QuoteSlide,
  EditorialSlide,
  TwoColSlide,
  CTASlide,
});
