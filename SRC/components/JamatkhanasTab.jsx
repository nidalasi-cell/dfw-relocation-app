// src/components/JamatkhanasTab.jsx
// ─────────────────────────────────────────────────────
// Jamatkhanas tab — displays a card for each of the 6
// DFW Ismaili Jamatkhanas with address, rating, phone,
// notes, and a bar chart of drive times from each neighborhood.
//
// Props: none — reads from data files directly.
// ─────────────────────────────────────────────────────

import { JAMATKHANAS }   from '../data/jamatkhanas'
import { NEIGHBORHOODS } from '../data/neighborhoods'
import { DRIVE_TIMES }   from '../data/driveTimes'
import { driveTimeToScore } from '../utils/scoring'
import { driveTimeColor }   from '../utils/colors'

export default function JamatkhanasTab() {
  return (
    <div style={{ marginTop: 20 }}>
      <p style={{ fontSize: 12, color: 'var(--text-dimmer)', margin: '0 0 14px' }}>
        All 6 confirmed DFW Ismaili Jamatkhanas with estimated drive times from each neighborhood
      </p>

      <div className="auto-grid">
        {JAMATKHANAS.map(jk => (
          <JKCard key={jk.id} jk={jk} />
        ))}
      </div>
    </div>
  )
}

function JKCard({ jk }) {
  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <div style={{ fontSize: 22 }}>🕌</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#fff', lineHeight: 1.3 }}>
            {jk.name}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 1 }}>
            {jk.address}
          </div>
        </div>
      </div>

      {jk.rating && (
        <div style={{ fontSize: 11, color: '#F59E0B', marginBottom: 4 }}>
          ⭐ {jk.rating} rated
        </div>
      )}
      {jk.phone && (
        <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 4 }}>
          📞 {jk.phone}
        </div>
      )}
      <div style={{ fontSize: 11, color: 'var(--text-dimmer)', marginBottom: 10, fontStyle: 'italic' }}>
        {jk.note}
      </div>

      {/* Drive time bars */}
      <div style={{ borderTop: '1px solid var(--border-faint)', paddingTop: 9 }}>
        <div className="section-label" style={{ marginBottom: 5 }}>Drive Times</div>
        {NEIGHBORHOODS.map(n => {
          const mins = DRIVE_TIMES[n.id]?.[jk.id]
          const color = driveTimeColor(mins)
          const score = driveTimeToScore(mins)
          return (
            <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 85 }}>{n.name}</span>
              <div style={{
                flex: 1,
                background: 'var(--bg-sunken)',
                borderRadius: 3, height: 4, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${score}%`,
                  background: color,
                  borderRadius: 3,
                }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 36, textAlign: 'right' }}>
                {mins}m
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
