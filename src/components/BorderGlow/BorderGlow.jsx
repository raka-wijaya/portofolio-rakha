import { useRef, useCallback, useState, useEffect } from 'react';

function parseHSL(hslStr) {
  if (!hslStr) return { h: 22, s: 70, l: 60 };
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 22, s: 70, l: 60 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  // Outer-only luminous beam glow — ZERO inset shadows to keep card completely clean
  const layers = [
    [0, 0, 2, 0, 90, false],
    [0, 0, 4, 1, 60, false],
    [0, 0, 8, 1, 35, false],
    [0, 0, 16, 2, 15, false],
  ];
  return layers.map(([x, y, blur, spread, alpha]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(', ');
}

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x) { return x * x * x; }

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors) {
  const gradients = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

function isLightColor(color) {
  if (!color) return true;
  if (color.includes('var(--card)') || color.includes('#ffffff') || color.includes('white')) return true;
  const value = color.trim().replace('#', '');
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
  const hex = value.length === 3 ? value.split('').map(char => char + char).join('') : value;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDark = () => {
      const isDarkClass =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.body.classList.contains('dark');
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return isDarkClass || mediaQuery.matches;
    };
    setIsDark(checkDark());
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setIsDark(checkDark());
    mediaQuery.addEventListener('change', handler);
    const observer = new MutationObserver(handler);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => {
      mediaQuery.removeEventListener('change', handler);
      observer.disconnect();
    };
  }, []);
  return isDark;
};

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor,
  backgroundColor,
  borderRadius = 16,
  glowRadius = 15,
  glowIntensity = 0.6,
  coneSpread = 18,
  animated = false,
  colors,
  fillOpacity = 0,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  const isDark = useDarkMode();

  const effectiveBg = backgroundColor ?? (isDark ? '#121212' : '#ffffff');
  // Bright white-hot core highlight with theme color glow (exact laser-line effect)
  const effectiveColors = colors ?? (isDark
    ? ['#ffffff', '#ffffff', '#fbcb97', '#e78a53']
    : ['#ffffff', '#ffffff', '#fbcb97', '#d87943']);
  const effectiveGlowColor = glowColor ?? (isDark ? '22 80 65' : '22 75 55');

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  }, [getEdgeProximity, getCursorAngle]);

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    setSweepActive(true);
    setCursorAngle(angleStart);

    animateValue({ duration: 500, onUpdate: v => setEdgeProximity(v / 100) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart);
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart);
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => setEdgeProximity(v / 100),
      onEnd: () => setSweepActive(false),
    });
  }, [animated]);

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible = isHovered || sweepActive;
  const borderOpacity = isVisible
    ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity))
    : 0;
  const glowOpacity = isVisible
    ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
    : 0;

  const meshGradients = buildMeshGradients(effectiveColors);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;
  const lightSurface = isLightColor(effectiveBg);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative grid isolate border border-[var(--border)] font-sans ${className}`}
      style={{
        background: effectiveBg,
        borderColor: lightSurface ? 'var(--border, #e5e7eb)' : 'var(--border, #222222)',
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        boxShadow: lightSurface
          ? '0 1px 3px 0 rgb(0 0 0 / 0.04)'
          : '0 4px 6px -1px rgb(0 0 0 / 0.3)',
      }}
    >
      {/* Laser-sharp glowing border line */}
      <div
        className="absolute inset-0 rounded-[inherit] -z-[1] pointer-events-none"
        style={{
          border: '1.5px solid transparent',
          background: [
            `linear-gradient(${effectiveBg} 0 100%) padding-box`,
            'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
            ...borderBg,
          ].join(', '),
          opacity: borderOpacity,
          maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 12}%, transparent ${100 - coneSpread - 12}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 12}%, transparent ${100 - coneSpread - 12}%, black ${100 - coneSpread}%)`,
          transition: isVisible ? 'opacity 0.2s ease-out' : 'opacity 0.6s ease-in-out',
        }}
      />

      {/* Mesh gradient fill — Only active if fillOpacity > 0 (kept 0 by default so card stays 100% clean) */}
      {fillOpacity > 0 && (
        <div
          className="absolute inset-0 rounded-[inherit] -z-[1] pointer-events-none"
          style={{
            border: '1px solid transparent',
            background: fillBg.join(', '),
            maskImage: [
              'linear-gradient(to bottom, black, black)',
              'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
              `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
            ].join(', '),
            WebkitMaskImage: [
              'linear-gradient(to bottom, black, black)',
              'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
              `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
            ].join(', '),
            maskComposite: 'subtract, add',
            WebkitMaskComposite: 'source-out, source-over',
            opacity: borderOpacity * fillOpacity,
            transition: isVisible ? 'opacity 0.2s ease-out' : 'opacity 0.6s ease-in-out',
          }}
        />
      )}

      {/* Tight outer border glow — Casts outward ONLY, never inward */}
      <span
        className="absolute pointer-events-none z-[1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from ${angleDeg} at center, black 3%, transparent 12%, transparent 88%, black 97%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 3%, transparent 12%, transparent 88%, black 97%)`,
          opacity: glowOpacity,
          transition: isVisible ? 'opacity 0.2s ease-out' : 'opacity 0.6s ease-in-out',
        }}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(effectiveGlowColor, glowIntensity),
          }}
        />
      </span>

      {/* Card Content — Pure clean background */}
      <div className="flex flex-col relative z-[2] w-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
