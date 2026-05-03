// src/components/SchoolsTab.jsx
// ─────────────────────────────────────────────────────
// Schools tab — lets the user select a neighborhood and
// see detailed district info: TEA rating, graduation rate,
// proficiency stats, middle schools, high schools,
// strengths, and a cross-neighborhood comparison bar.
//
// Props: none — reads from data files directly.
// ─────────────────────────────────────────────────────

import { useState }     from 'react'
import Bar              from './Bar'
import GradeBadge       from './GradeBadge'
import { NEIGHBORHOODS } from '../data/neighborhoods'
import { SCHOOL_DATA }  from '../data/schools'
import { gradeColor }   from '../utils/colors'

// ── Individual school row ──
function SchoolRow({ school, isLast }) {
  return (
    <div style={{
      marginBottom: 12,
      paddingBottom: 12,
      borderBottom: isLast ? 'none' : '1px solid var(--border-faint)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', flex: 1, paddingRight: 8 }}>
          {school.name}
        </span>
        <GradeBadge grade={school.grade} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-dimmer)' }}>{school.notes}</div>
    </div>
  )
}

export default function SchoolsTab() {
  // Default to Lewisville since it's the newest addition
  const [activeId, setActiveId] = useState('lewisville')

  const sd = SCHOOL_DATA[activeId]
  const sn = NEIGHBORHOODS.find(n => n.id === activeId)

  return (
    <div style={{ marginTop: 20 }}>
      {/* Neighborhood selector buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {NEIGHBORHOODS.map(n => {
          const isActive = n.id === activeId
          return (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              style={{
                background:  isActive ? n.color : 'var(--bg-surface)',
                color:       isActive ? '#000'  : 'var(--text-muted)',
                border:      `1px solid ${isActive ? n.color : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding:     '7px 14px',
                fontWeight:  600,
                fontSize:    12,
                cursor:      'pointer',
                transition:  'all 0.2s',
              }}
            >
              {n.emoji} {n.name}
            </button>
          )
        })}
      </div>

      {sd && sn && (
        <div>
          {/* ── District overview card ── */}
          <div className="card" style={{ border: `1px solid ${sn.color}33`, marginBottom: 16 }}>

            {/* District name + ratings */}
            <div className="flex-between">
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff' }}>
                  {sd.district}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 3 }}>{sd.stateRank}</div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {/* TEA rating badge */}
                <div style={{
                  textAlign: 'center',
                  background: gradeColor(sd.teaRating) + '18',
                  border: `1px solid ${gradeColor(sd.teaRating)}44`,
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 16px',
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: gradeColor(sd.teaRating), fontFamily: 'var(--font-display)' }}>
                    {sd.teaRating}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>TEA 2025</div>
                </div>

                {/* Graduation rate */}
                <div style={{
                  textAlign: 'center',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 16px',
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                    {sd.gradRate}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>Grad Rate</div>
                </div>
              </div>
            </div>

            {/* Proficiency bars */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
              {[
                { label: 'Math Proficiency',    value: sd.mathProficiency },
                { label: 'Reading Proficiency', value: sd.readingProficiency },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: 'var(--bg-deep)', borderRadius: 8, padding: 12 }}>
                  <div className="section-label" style={{ marginBottom: 6 }}>{label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bar score={parseInt(value)} color={sn.color} animate />
                    <span style={{ fontSize: 13, fontWeight: 700, color: sn.color, minWidth: 32 }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths / Watch out */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <div style={{
                background: '#00C89610',
                border: '1px solid #00C89630',
                borderRadius: 8, padding: 10,
              }}>
                <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, marginBottom: 4 }}>✅ STRENGTHS</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{sd.highlights}</div>
              </div>
              <div style={{
                background: '#F59E0B10',
                border: '1px solid #F59E0B30',
                borderRadius: 8, padding: 10,
              }}>
                <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 700, marginBottom: 4 }}>⚠️ WATCH OUT</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{sd.watch}</div>
              </div>
            </div>
          </div>

          {/* ── School lists ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {/* Middle Schools */}
            <div className="card">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 12 }}>
                🏫 Middle Schools
              </div>
              {sd.middleSchools.map((s, i) => (
                <SchoolRow key={s.name} school={s} isLast={i === sd.middleSchools.length - 1} />
              ))}
            </div>

            {/* High Schools */}
            <div className="card">
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 12 }}>
                🎓 High Schools
              </div>
              {sd.highSchools.map((s, i) => (
                <SchoolRow key={s.name} school={s} isLast={i === sd.highSchools.length - 1} />
              ))}
            </div>
          </div>

          {/* ── Cross-district comparison ── */}
          <div className="card" style={{ marginTop: 14 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 12 }}>
              📊 How All Districts Compare
            </div>
            {NEIGHBORHOODS.map(n => {
              const d = SCHOOL_DATA[n.id]
              const isActive = n.id === activeId
              return (
                <div
                  key={n.id}
                  onClick={() => setActiveId(n.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginBottom: 8, cursor: 'pointer',
                    opacity: isActive ? 1 : 0.55,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <span style={{
                    fontSize: 12,
                    width: 90,
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 400,
                  }}>
                    {n.name}
                  </span>
                  <Bar score={d.teaScore} color={n.color} animate />
                  <GradeBadge grade={d.teaRating} size={12} />
                  <span style={{ fontSize: 11, color: 'var(--text-dimmer)', minWidth: 28 }}>
                    {d.teaScore}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
