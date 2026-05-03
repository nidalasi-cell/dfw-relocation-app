// src/components/RankingsTab.jsx
// ─────────────────────────────────────────────────────
// The main Rankings tab.
// Left panel: priority weight sliders.
// Right panel: live-ranked neighborhood cards.
//
// Props:
//  - weights:    current weight map { criterionId: number }
//  - setWeight:  function(id, value) to update one weight
//  - ranked:     array of scored+ranked neighborhoods
// ─────────────────────────────────────────────────────

import { useState }       from 'react'
import Bar                from './Bar'
import Slider             from './Slider'
import GradeBadge         from './GradeBadge'
import { CRITERIA }       from '../data/criteria'
import { JAMATKHANAS }    from '../data/jamatkhanas'
import { DRIVE_TIMES }    from '../data/driveTimes'
import { SCHOOL_DATA }    from '../data/schools'
import { driveTimeColor } from '../utils/colors'

// ── Expanded detail panel shown when a card is clicked ──
function NeighborhoodDetail({ neighborhood }) {
  const n = neighborhood
  return (
    <div style={{ marginTop: 12, borderTop: '1px solid var(--border-faint)', paddingTop: 12 }}>

      {/* All 6 JK drive times */}
      <div className="section-label" style={{ marginBottom: 6 }}>🕌 All 6 JK Drive Times</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px', marginBottom: 12 }}>
        {JAMATKHANAS.map(jk => {
          const mins = DRIVE_TIMES[n.id]?.[jk.id]
          return (
            <div key={jk.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                {jk.address.split(',')[1]?.trim() ?? jk.id}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: driveTimeColor(mins) }}>
                {mins}m
              </span>
            </div>
          )
        })}
      </div>

      {/* Schools quick view */}
      <div style={{ marginBottom: 10 }}>
        <div className="section-label" style={{ marginBottom: 5 }}>📚 Schools Quick View</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>{SCHOOL_DATA[n.id]?.district}</span>
          {' — TEA '}
          <GradeBadge grade={SCHOOL_DATA[n.id]?.teaRating} size={11} />
          {'  Grad rate: '}
          <span style={{ color: 'var(--accent)' }}>{SCHOOL_DATA[n.id]?.gradRate}</span>
        </div>
      </div>

      {/* Per-criterion breakdown bars */}
      {CRITERIA.filter(c => c.id !== 'jamatkhana').map(c => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
          <span style={{ fontSize: 12, width: 16 }}>{c.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: n.color }}>{n.scores[c.id]}</span>
            </div>
            <Bar score={n.scores[c.id]} color={n.color} animate />
            <div style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 1 }}>
              {n.details[c.id]}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Single neighborhood card ──
function NeighborhoodCard({ neighborhood, rank, isSelected, onToggle, animateBars }) {
  const n = neighborhood
  return (
    <div
      onClick={() => onToggle(n.id)}
      style={{
        background:   isSelected ? 'var(--bg-sunken)' : 'var(--bg-surface)',
        border:       `1px solid ${isSelected ? n.color + '55' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        padding:      '13px 15px',
        cursor:       'pointer',
        transition:   'all 0.2s',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* Top pick ribbon */}
      {rank === 0 && (
        <div style={{
          position:          'absolute',
          top: 0, right: 0,
          background:        n.color,
          color:             '#000',
          fontSize:          8,
          fontWeight:        700,
          padding:           '3px 8px',
          borderBottomLeftRadius: 7,
          letterSpacing:     1,
        }}>
          ★ TOP PICK
        </div>
      )}

      {/* Card header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        {/* Emoji icon */}
        <div style={{
          width: 32, height: 32,
          borderRadius: 8,
          background: n.color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, flexShrink: 0,
        }}>
          {n.emoji}
        </div>

        {/* Name + subtitle */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#fff' }}>{n.name}</span>
            <span style={{
              fontSize: 9, color: n.color,
              background: n.color + '18',
              borderRadius: 3, padding: '1px 5px', fontWeight: 700,
            }}>
              {n.tag}
            </span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 1 }}>
            🕌 {n.best.jk?.name?.split(' ').slice(0, 3).join(' ')} · {n.best.minutes}min
            &nbsp;|&nbsp;
            📚 {SCHOOL_DATA[n.id]?.district?.split(' ')[0]} ISD — TEA {SCHOOL_DATA[n.id]?.teaRating}
          </div>
        </div>

        {/* Score */}
        <div style={{
          fontSize: 22, fontWeight: 800,
          fontFamily: 'var(--font-display)',
          color: n.color,
        }}>
          {n.final}
        </div>
      </div>

      {/* Score bar */}
      <div style={{ marginTop: 8 }}>
        <Bar score={n.final} color={n.color} animate={animateBars} />
      </div>

      {/* Expanded detail */}
      {isSelected && <NeighborhoodDetail neighborhood={n} />}
    </div>
  )
}

// ── Rankings tab root ──
export default function RankingsTab({ weights, setWeight, ranked }) {
  const [selectedId, setSelectedId] = useState(null)

  const toggle = (id) => setSelectedId(prev => prev === id ? null : id)

  return (
    <div className="two-col-grid" style={{ marginTop: 18 }}>

      {/* Left: sliders */}
      <div className="card">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, margin: '0 0 3px', color: '#fff' }}>
          Your Priorities
        </h2>
        <p style={{ fontSize: 10, color: 'var(--text-dimmer)', margin: '0 0 16px' }}>
          Drag to weight what matters most
        </p>
        {CRITERIA.map(c => (
          <Slider
            key={c.id}
            criterion={c}
            value={weights[c.id]}
            onChange={v => setWeight(c.id, v)}
          />
        ))}
      </div>

      {/* Right: ranked cards */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, margin: '0 0 3px', color: '#fff' }}>
          Live Rankings
        </h2>
        <p style={{ fontSize: 10, color: 'var(--text-dimmer)', margin: '0 0 10px' }}>
          Click any card for full breakdown
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {ranked.map((n, i) => (
            <NeighborhoodCard
              key={n.id}
              neighborhood={n}
              rank={i}
              isSelected={selectedId === n.id}
              onToggle={toggle}
              animateBars={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
