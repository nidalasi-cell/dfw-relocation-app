// src/components/Slider.jsx
// ─────────────────────────────────────────────────────
// A labeled range slider for one scoring criterion.
// Used in the Rankings tab's "Your Priorities" panel.
//
// Props:
//  - criterion: object { id, label, icon, desc } from criteria.js
//  - value:     current weight number (0–100)
//  - onChange:  function(newValue: number)
// ─────────────────────────────────────────────────────

export default function Slider({ criterion, value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {/* Label row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}>
        <span style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}>
          <span>{criterion.icon}</span>
          <span style={{ fontWeight: 500 }}>{criterion.label}</span>
        </span>

        {/* Live weight readout */}
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--accent)',
          background: 'var(--accent-dim)',
          borderRadius: 'var(--radius-sm)',
          padding: '1px 6px',
          fontFamily: 'monospace',
        }}>
          {value}%
        </span>
      </div>

      {/* Range input — accent color set globally via CSS var */}
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={e => onChange(+e.target.value)}
      />

      {/* Helper description */}
      <div style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 1 }}>
        {criterion.desc}
      </div>
    </div>
  )
}
