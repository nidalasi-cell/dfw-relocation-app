// src/components/Tabs.jsx
// ─────────────────────────────────────────────────────
// Tab navigation bar for switching between the three
// main views: Rankings, Schools, Jamatkhanas.
//
// Props:
//  - activeTab:   string — currently active tab id
//  - onChange:    function(tabId: string)
// ─────────────────────────────────────────────────────

const TABS = [
  { id: 'rankings',     label: '📊 Rankings' },
  { id: 'schools',      label: '📚 Schools' },
  { id: 'jamatkhanas',  label: '🕌 Jamatkhanas' },
]

export default function Tabs({ activeTab, onChange }) {
  return (
    <nav style={{
      display: 'flex',
      gap: 3,
      marginTop: 20,
      background: 'var(--bg-surface)',
      borderRadius: 9,
      padding: 3,
      width: 'fit-content',
      border: '1px solid var(--border-subtle)',
      // Horizontal scroll on very small screens
      overflowX: 'auto',
    }}>
      {TABS.map(({ id, label }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              background:  isActive ? 'var(--accent)' : 'transparent',
              color:       isActive ? '#000' : 'var(--text-faint)',
              border:      'none',
              borderRadius: 6,
              padding:     '7px 14px',
              fontWeight:  700,
              fontSize:    12,
              cursor:      'pointer',
              transition:  'all 0.2s',
              whiteSpace:  'nowrap',
            }}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}
