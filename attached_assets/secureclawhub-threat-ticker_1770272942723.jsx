import { useState, useEffect } from "react";

/*
  SecureClawHub — Live Threat Ticker
  
  This is a drop-in replacement for the "Latest Intercept" section 
  in the hero banner. It cycles through real, verified OpenClaw 
  security threats every 10 minutes (600,000ms).
  
  All threats are sourced from real advisories (Feb 2026):
  - The Hacker News
  - SecurityWeek  
  - Koi Security / ClawHavoc report
  - Cisco AI Threat Research
  - SOCRadar CVE analysis
  - Belgium CCB advisory
*/

const THREAT_ALERTS = [
  {
    id: "cve-2026-25253",
    severity: "CRITICAL",
    label: "CVE-2026-25253",
    title: "1-Click RCE via WebSocket token hijack in OpenClaw Gateway",
    detail: "Cross-site WebSocket hijacking allows full gateway compromise. Visiting a malicious page exfiltrates auth tokens and enables sandbox escape + arbitrary code execution.",
    source: "DepthFirst / The Hacker News",
    date: "Feb 3, 2026",
    cvss: "8.8",
    link: "https://thehackernews.com/2026/02/openclaw-bug-enables-one-click-remote.html",
    color: "#ff2e4d",
  },
  {
    id: "clawhavoc-341",
    severity: "HIGH",
    label: "ClawHavoc",
    title: "341 malicious skills discovered on ClawHub stealing credentials",
    detail: "Koi Security audit of 2,857 ClawHub skills found 335 deploying Atomic Stealer (AMOS) malware via fake prerequisites. Targets macOS and Windows systems.",
    source: "Koi Security",
    date: "Feb 4, 2026",
    cvss: null,
    link: "https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html",
    color: "#ff6b35",
  },
  {
    id: "supply-chain-400",
    severity: "HIGH",
    label: "Supply Chain",
    title: "400+ malware packages targeting OpenClaw crypto traders via ClawHub",
    detail: "Coordinated campaign published 28 initial + 386 follow-up malicious skills disguised as crypto trading tools. All share C2 infrastructure at 91.92.242.30.",
    source: "OpenSourceMalware / SecurityAffairs",
    date: "Feb 2, 2026",
    cvss: null,
    link: "https://securityaffairs.com/187562/malware/moltbot-skills-exploited-to-distribute-400-malware-packages-in-days.html",
    color: "#ff6b35",
  },
  {
    id: "cisco-elon-skill",
    severity: "CRITICAL",
    label: "Skill Exploit",
    title: '"What Would Elon Do?" skill contained 9 vulnerabilities including data exfiltration',
    detail: "Cisco AI Defense found the #1-ranked ClawHub skill was malware: silent data exfiltration to external servers + direct prompt injection to bypass safety guidelines.",
    source: "Cisco AI Threat Research",
    date: "Jan 30, 2026",
    cvss: null,
    link: "https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare",
    color: "#ff2e4d",
  },
  {
    id: "cve-2026-21636",
    severity: "HIGH",
    label: "CVE-2026-21636",
    title: "Permission model bypass vulnerability in OpenClaw Node.js runtime",
    detail: "Security patch required: Node.js 22.12.0+ needed to prevent permission model bypass. Update immediately if running OpenClaw in production.",
    source: "OpenClaw Security Advisory",
    date: "Jan 2026",
    cvss: null,
    link: "https://github.com/openclaw/openclaw/security",
    color: "#ff6b35",
  },
];

const CYCLE_INTERVAL = 600000; // 10 minutes in ms

// ─── Severity Badge ─────────────────────────────────────────
function SeverityBadge({ severity, cvss }) {
  const colors = {
    CRITICAL: {
      bg: "rgba(255, 46, 77, 0.15)",
      border: "rgba(255, 46, 77, 0.4)",
      text: "#ff2e4d",
      glow: "0 0 12px rgba(255, 46, 77, 0.3)",
    },
    HIGH: {
      bg: "rgba(255, 107, 53, 0.15)",
      border: "rgba(255, 107, 53, 0.4)",
      text: "#ff6b35",
      glow: "0 0 12px rgba(255, 107, 53, 0.3)",
    },
  };
  const c = colors[severity] || colors.HIGH;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "2px 10px",
        borderRadius: "4px",
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        boxShadow: c.glow,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: c.text,
          animation: "threatPulse 2s ease-in-out infinite",
        }}
      />
      {severity}
      {cvss && (
        <span style={{ opacity: 0.7, fontSize: "9px" }}>CVSS {cvss}</span>
      )}
    </span>
  );
}

// ─── Main Threat Ticker Component ───────────────────────────
export default function ThreatTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % THREAT_ALERTS.length);
        setIsTransitioning(false);
      }, 400);
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const threat = THREAT_ALERTS[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(255, 46, 77, 0.04)",
        border: "1px solid rgba(255, 46, 77, 0.12)",
        borderRadius: "8px",
        padding: "16px 20px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        overflow: "hidden",
        transition: "border-color 0.6s ease",
        borderColor: isTransitioning
          ? "rgba(255, 46, 77, 0.3)"
          : "rgba(255, 46, 77, 0.12)",
      }}
    >
      {/* Keyframe animation injected inline */}
      <style>{`
        @keyframes threatPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Subtle scanline effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255, 46, 77, 0.4), transparent)",
          animation: "scanline 4s linear infinite",
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
            }}
          >
            Latest Intercept
          </span>
          <SeverityBadge severity={threat.severity} cvss={threat.cvss} />
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {THREAT_ALERTS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setIsTransitioning(false);
                }, 200);
              }}
              style={{
                width: i === currentIndex ? 16 : 6,
                height: 6,
                borderRadius: "3px",
                background:
                  i === currentIndex
                    ? threat.color
                    : "rgba(255, 255, 255, 0.15)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
              aria-label={`View threat ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Threat content */}
      <div
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(4px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Label + Title */}
        <div style={{ marginBottom: "6px" }}>
          <span
            style={{
              color: threat.color,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {threat.label}:
          </span>{" "}
          <span
            style={{
              color: "rgba(255, 255, 255, 0.88)",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {threat.title}
          </span>
        </div>

        {/* Detail text */}
        <p
          style={{
            color: "rgba(255, 255, 255, 0.45)",
            fontSize: "11px",
            lineHeight: 1.6,
            margin: "0 0 10px 0",
          }}
        >
          {threat.detail}
        </p>

        {/* Footer: source + date + link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.3)",
            }}
          >
            {threat.source} · {threat.date}
          </span>
          <a
            href={threat.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "10px",
              color: threat.color,
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "1")}
            onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
          >
            View Advisory →
          </a>
        </div>
      </div>
    </div>
  );
}
