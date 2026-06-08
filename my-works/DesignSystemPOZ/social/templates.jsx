/* eslint-disable */
/*
 * Social template primitives — Point One Zero
 *
 * Every template renders at TRUE pixel size (1200×630, 1080×1080, etc.)
 * so the artboards in DesignCanvas can be exported straight to PNG at
 * native resolution. Type, color, and atmosphere all read from the
 * shared design tokens in colors_and_type.css.
 *
 * Layout rule per template: a single brand-dot eyebrow at top, the
 * message in display weight, the wordmark at the bottom. One blue
 * word per template, max — every other accent is a focus ring or
 * the dot itself.
 */

const TOK = {
  canvas: 'var(--canvas)',
  surface1: 'var(--surface-1)',
  surface2: 'var(--surface-2)',
  surface3: 'var(--surface-3)',
  border: 'var(--border-subtle)',
  fg: 'var(--foreground)',
  fgMuted: 'var(--foreground-muted)',
  fgSubtle: 'var(--foreground-subtle)',
  brand: 'var(--brand)',
  brandGlow: 'var(--brand-glow)',
  font: 'var(--font-sans)',
};

// ───────── shared sub-components ─────────

function BrandDot({ size = 8 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: 9999,
        background: TOK.brand,
        boxShadow: TOK.brandGlow,
        flex: 'none',
      }}
    />
  );
}

function Eyebrow({ children, size = 22, dot = true }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.5,
        fontFamily: TOK.font,
        fontSize: size,
        fontWeight: 510,
        letterSpacing: size * 0.031,
        textTransform: 'uppercase',
        color: TOK.fgSubtle,
      }}
    >
      {dot && <BrandDot size={size * 0.42} />}
      {children}
    </span>
  );
}

function Wordmark({ size = 28, subtitle, color = TOK.fg }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.7,
        fontFamily: TOK.font,
        fontSize: size,
        fontWeight: 510,
        letterSpacing: -size * 0.012,
        color,
      }}
    >
      <span>point one zero</span>
      {subtitle && (
        <span
          style={{
            paddingLeft: size * 0.6,
            borderLeft: `1px solid ${TOK.border}`,
            fontFamily: 'var(--font-mono)',
            fontSize: size * 0.7,
            color: TOK.fgSubtle,
            letterSpacing: 0,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}

function Atmosphere({ position = 'top', strength = 1 }) {
  const op = 0.14 * strength;
  const gradients = {
    top: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,159,239,${op}), transparent 65%), radial-gradient(ellipse 90% 35% at 50% 8%, rgba(0,159,239,${op * 0.4}), transparent 80%)`,
    bottom: `radial-gradient(ellipse 70% 40% at 50% 100%, rgba(0,159,239,${op}), transparent 75%)`,
    left: `radial-gradient(ellipse 50% 100% at 0% 50%, rgba(0,159,239,${op}), transparent 70%)`,
    center: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,159,239,${op * 0.8}), transparent 70%)`,
  };
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: gradients[position],
        pointerEvents: 'none',
      }}
    />
  );
}

function FrameBase({ w, h, children, pad = 64, atmosphere = null, dir = 'column' }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: TOK.canvas,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: TOK.font,
        color: TOK.fg,
        display: 'flex',
        flexDirection: dir,
        padding: pad,
        boxSizing: 'border-box',
      }}
    >
      {atmosphere && <Atmosphere position={atmosphere} />}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: dir, width: '100%', height: '100%', flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ───────── LANDSCAPE: OG / share / Twitter post / YouTube thumb ─────────

function OGCard({ eyebrow = 'An AI-native firm', headline, brandWord, url = 'pointonezero.com', w = 1200, h = 630 }) {
  // Inline split for the highlighted word
  const parts = headline.split(brandWord || '___NOMATCH___');
  return (
    <FrameBase w={w} h={h} pad={72} atmosphere="top">
      <Eyebrow size={22}>{eyebrow}</Eyebrow>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <h2
          style={{
            fontSize: 84,
            lineHeight: 1.0,
            letterSpacing: -3.0,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            maxWidth: 980,
            textWrap: 'balance',
          }}
        >
          {parts[0]}
          {brandWord && <span style={{ color: TOK.brand }}>{brandWord}</span>}
          {parts[1]}
        </h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Wordmark size={28} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: TOK.fgSubtle }}>{url}</span>
      </div>
    </FrameBase>
  );
}

function ArticleShare({ eyebrow = 'Field notes', section = 'v0.4.0', headline, brandWord, w = 1200, h = 627 }) {
  const parts = headline.split(brandWord || '___NOMATCH___');
  return (
    <FrameBase w={w} h={h} pad={72} atmosphere="top">
      <Eyebrow size={22}>{eyebrow} · {section}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            color: TOK.brand,
            fontSize: 60,
            lineHeight: 0.5,
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          “
        </span>
        <h2
          style={{
            fontSize: 76,
            lineHeight: 1.04,
            letterSpacing: -2.6,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            maxWidth: 980,
            textWrap: 'balance',
          }}
        >
          {parts[0]}
          {brandWord && <span style={{ color: TOK.brand }}>{brandWord}</span>}
          {parts[1]}
        </h2>
      </div>
      <Wordmark size={28} subtitle="Notes" />
    </FrameBase>
  );
}

function VideoThumb({ kicker = 'Talk · 12 min', headline, brandWord, w = 1280, h = 720 }) {
  const parts = headline.split(brandWord || '___NOMATCH___');
  return (
    <FrameBase w={w} h={h} pad={80} atmosphere="bottom">
      <Eyebrow size={24}>{kicker}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 8 }}>
        <h2
          style={{
            fontSize: 130,
            lineHeight: 1.05,
            letterSpacing: -5.6,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            maxWidth: 1000,
            textWrap: 'balance',
          }}
        >
          {parts[0]}
          {brandWord && <span style={{ color: TOK.brand }}>{brandWord}</span>}
          {parts[1]}
        </h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Wordmark size={32} />
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 22px',
            border: `1px solid ${TOK.border}`,
            background: TOK.surface2,
            borderRadius: 9999,
            fontSize: 18,
            fontWeight: 510,
            color: TOK.fg,
          }}
        >
          <span style={{ display: 'inline-block', width: 0, height: 0, borderLeft: `10px solid ${TOK.fg}`, borderTop: '6px solid transparent', borderBottom: '6px solid transparent' }} />
          Watch
        </span>
      </div>
    </FrameBase>
  );
}

// ───────── SQUARE 1:1 ─────────

function SquareStat({ eyebrow = 'Outcomes', value, suffix, label, w = 1080, h = 1080 }) {
  return (
    <FrameBase w={w} h={h} pad={72}>
      <Eyebrow size={22}>{eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            fontSize: 320,
            lineHeight: 0.88,
            letterSpacing: -16,
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            color: TOK.fg,
            display: 'flex',
            alignItems: 'baseline',
            gap: 4,
          }}
        >
          {value}
          {suffix && (
            <span style={{ fontSize: 100, color: TOK.fgSubtle, letterSpacing: -3, fontWeight: 600 }}>
              {suffix}
            </span>
          )}
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: TOK.font,
            fontSize: 24,
            fontWeight: 510,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: TOK.fgMuted,
          }}
        >
          {label}
        </div>
      </div>
      <Wordmark size={28} />
    </FrameBase>
  );
}

function SquareQuote({ eyebrow = 'Field notes', quote, attribution, w = 1080, h = 1080 }) {
  return (
    <FrameBase w={w} h={h} pad={84}>
      <Eyebrow size={22}>{eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            color: TOK.brand,
            fontSize: 100,
            lineHeight: 0.5,
            marginBottom: 32,
            fontWeight: 600,
          }}
        >
          “
        </span>
        <blockquote
          style={{
            fontSize: 76,
            lineHeight: 1.08,
            letterSpacing: -2.6,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {quote}
        </blockquote>
        <div
          style={{
            marginTop: 40,
            fontFamily: TOK.font,
            fontSize: 20,
            fontWeight: 510,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            color: TOK.fgSubtle,
          }}
        >
          — {attribution}
        </div>
      </div>
      <Wordmark size={28} />
    </FrameBase>
  );
}

function SquareAnnouncement({ eyebrow = 'New', kicker, headline, brandWord, sub, w = 1080, h = 1080 }) {
  const parts = headline.split(brandWord || '___NOMATCH___');
  return (
    <FrameBase w={w} h={h} pad={84} atmosphere="top">
      <Eyebrow size={22}>{eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {kicker && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 22,
              color: TOK.brand,
              marginBottom: 32,
              letterSpacing: 0,
            }}
          >
            {kicker}
          </div>
        )}
        <h2
          style={{
            fontSize: 92,
            lineHeight: 1.0,
            letterSpacing: -3.6,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {parts[0]}
          {brandWord && <span style={{ color: TOK.brand }}>{brandWord}</span>}
          {parts[1]}
        </h2>
        {sub && (
          <p
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: TOK.fgMuted,
              maxWidth: 760,
              margin: '32px 0 0',
              textWrap: 'pretty',
            }}
          >
            {sub}
          </p>
        )}
      </div>
      <Wordmark size={28} />
    </FrameBase>
  );
}

// ───────── PORTRAIT 4:5 — hiring / event ─────────

function PortraitHiring({ eyebrow = "We're hiring", role, location, type = 'Full-time · hybrid', w = 1080, h = 1350 }) {
  return (
    <FrameBase w={w} h={h} pad={80} atmosphere="top">
      <Eyebrow size={22}>{eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2
          style={{
            fontSize: 100,
            lineHeight: 0.96,
            letterSpacing: -4,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {role}
        </h2>
        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 24, color: TOK.fgMuted }}>{location}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: TOK.fgSubtle }}>{type}</span>
        </div>
        <div
          style={{
            marginTop: 56,
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: 10,
            padding: '14px 26px',
            background: TOK.surface3,
            color: TOK.fg,
            borderRadius: 9999,
            fontSize: 20,
            fontWeight: 510,
          }}
        >
          Apply →
        </div>
      </div>
      <Wordmark size={28} />
    </FrameBase>
  );
}

// ───────── STORY 9:16 ─────────

function StoryLink({ eyebrow = 'Field notes · New', headline, brandWord, sub, w = 1080, h = 1920 }) {
  const parts = headline.split(brandWord || '___NOMATCH___');
  return (
    <FrameBase w={w} h={h} pad={72} atmosphere="top">
      <div style={{ paddingTop: 120 }}>
        <Eyebrow size={22}>{eyebrow}</Eyebrow>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2
          style={{
            fontSize: 96,
            lineHeight: 1.0,
            letterSpacing: -3.6,
            fontWeight: 600,
            color: TOK.fg,
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {parts[0]}
          {brandWord && <span style={{ color: TOK.brand }}>{brandWord}</span>}
          {parts[1]}
        </h2>
        {sub && (
          <p
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: TOK.fgMuted,
              maxWidth: 760,
              margin: '36px 0 0',
            }}
          >
            {sub}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, paddingBottom: 80 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 28px',
            background: TOK.surface3,
            color: TOK.fg,
            borderRadius: 9999,
            fontSize: 20,
            fontWeight: 510,
          }}
        >
          Read the note
        </span>
        <Wordmark size={22} />
      </div>
    </FrameBase>
  );
}

function StoryStat({ eyebrow = 'Outcomes', value, suffix, label, w = 1080, h = 1920 }) {
  return (
    <FrameBase w={w} h={h} pad={72}>
      <div style={{ paddingTop: 120 }}>
        <Eyebrow size={22}>{eyebrow}</Eyebrow>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            fontSize: 380,
            lineHeight: 0.85,
            letterSpacing: -18,
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            color: TOK.fg,
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
          }}
        >
          {value}
          {suffix && (
            <span style={{ fontSize: 120, color: TOK.fgSubtle, letterSpacing: -3, fontWeight: 600 }}>{suffix}</span>
          )}
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: TOK.font,
            fontSize: 28,
            fontWeight: 510,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            color: TOK.fgMuted,
            textAlign: 'center',
            maxWidth: 720,
          }}
        >
          {label}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 96 }}>
        <Wordmark size={24} />
      </div>
    </FrameBase>
  );
}

function StoryFrame({ w = 1080, h = 1920 }) {
  // POINT / ONE / ZERO type-only — quiet brand portrait
  const tagStyle = {
    fontFamily: TOK.font,
    fontSize: 168,
    lineHeight: 1.0,
    letterSpacing: -8,
    fontWeight: 600,
    color: TOK.fg,
  };
  const sub = {
    fontFamily: 'var(--font-mono)',
    fontSize: 18,
    color: TOK.fgSubtle,
    marginTop: 8,
  };
  return (
    <FrameBase w={w} h={h} pad={84}>
      <div style={{ paddingTop: 120 }}>
        <Eyebrow size={22}>The frame</Eyebrow>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 64 }}>
        <div>
          <div style={tagStyle}>POINT</div>
          <div style={sub}>The intersection · strategy, design, AI</div>
        </div>
        <div>
          <div style={tagStyle}>ONE</div>
          <div style={sub}>The collective · agile pods</div>
        </div>
        <div>
          <div style={tagStyle}>ZERO</div>
          <div style={sub}>The model · zero-based, AI-native</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: 64 }}>
        <Wordmark size={24} />
      </div>
    </FrameBase>
  );
}

// ───────── BANNERS — LinkedIn cover, Twitter header, FB cover ─────────

function ProfileBanner({ headline, brandWord, sub, w, h, padX = 96 }) {
  const parts = headline.split(brandWord || '___NOMATCH___');
  return (
    <FrameBase w={w} h={h} pad={0} atmosphere="left" dir="row">
      <div
        style={{
          flex: 1,
          padding: `0 ${padX}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '60%' }}>
          <Eyebrow size={16}>Point One Zero</Eyebrow>
          <div
            style={{
              fontFamily: TOK.font,
              fontSize: h > 300 ? 84 : 56,
              lineHeight: 1.0,
              letterSpacing: -2.4,
              fontWeight: 600,
              color: TOK.fg,
              textWrap: 'balance',
            }}
          >
            {parts[0]}
            {brandWord && <span style={{ color: TOK.brand }}>{brandWord}</span>}
            {parts[1]}
          </div>
          {sub && (
            <div style={{ fontSize: 20, color: TOK.fgMuted, marginTop: 8 }}>{sub}</div>
          )}
        </div>
        <Wordmark size={h > 300 ? 28 : 22} />
      </div>
    </FrameBase>
  );
}

Object.assign(window, {
  OGCard,
  ArticleShare,
  VideoThumb,
  SquareStat,
  SquareQuote,
  SquareAnnouncement,
  PortraitHiring,
  StoryLink,
  StoryStat,
  StoryFrame,
  ProfileBanner,
});
