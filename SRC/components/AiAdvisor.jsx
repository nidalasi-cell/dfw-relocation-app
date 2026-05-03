// src/components/AiAdvisor.jsx
// ─────────────────────────────────────────────────────
// AI Relocation Advisor panel.
// Calls the Anthropic API with the user's current weights
// and ranked neighborhoods, then displays a 3-paragraph
// personalized recommendation.
//
// Props:
//  - ranked:   array of scored+ranked neighborhoods
//  - weights:  current user weight settings
// ─────────────────────────────────────────────────────

import { useState }    from 'react'
import { CRITERIA }    from '../data/criteria'
import { JAMATKHANAS } from '../data/jamatkhanas'
import { SCHOOL_DATA } from '../data/schools'

export default function AiAdvisor({ ranked, weights }) {
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading]   = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    setAnalysis('')

    // Build prompt context strings
    const weightSummary = CRITERIA
      .map(c => `${c.label}: ${weights[c.id]}%`)
      .join(', ')

    const rankSummary = ranked
      .map((n, i) =>
        `${i + 1}. ${n.name} (score:${n.final}, ` +
        `nearest JK: ${n.best.jk?.name ?? 'unknown'} ~${n.best.minutes}min, ` +
        `district: ${SCHOOL_DATA[n.id]?.district}, ` +
        `TEA: ${SCHOOL_DATA[n.id]?.teaRating})`
      )
      .join('; ')

    const jkList = JAMATKHANAS
      .map(j => `${j.name} (${j.address})`)
      .join('; ')

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content:
              `You are a warm DFW relocation expert. A family with 2 kids is moving to DFW. ` +
              `Husband works in Arlington TX. They are Ismaili Muslim attending Jamatkhana regularly. ` +
              `6 DFW Jamatkhanas: ${jkList}. ` +
              `Priority weights: ${weightSummary}. ` +
              `Rankings with school data: ${rankSummary}. ` +
              `Write 3 warm practical paragraphs: ` +
              `(1) top pick and why including school quality, ` +
              `(2) runner-up tradeoff, ` +
              `(3) practical tip about the JK network and school enrollment timing. ` +
              `Flowing prose, no bullets, be specific and human.`,
          }],
        }),
      })

      const data = await res.json()
      const text = data.content?.map(b => b.text ?? '').join('') ?? 'Unable to generate analysis.'
      setAnalysis(text)
    } catch {
      setAnalysis('Could not connect to the AI advisor. Please try again.')
    }

    setLoading(false)
  }

  return (
    <section className="card" style={{ marginTop: 24 }}>
      {/* Header row */}
      <div className="flex-between" style={{ marginBottom: 16 }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15,
            fontWeight: 700,
            margin: 0,
            color: '#fff',
          }}>
            🤖 AI Relocation Advisor
          </h2>
          <p style={{ fontSize: 11, color: 'var(--text-dimmer)', marginTop: 3 }}>
            Personalized recommendation with school data + all 6 Jamatkhanas
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            background: loading
              ? '#1a2a3a'
              : 'linear-gradient(135deg, var(--accent), var(--accent-blue))',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '10px 18px',
            fontWeight: 700,
            fontSize: 12,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Analyzing...' : '✨ Get AI Analysis'}
        </button>
      </div>

      {/* Result or placeholder */}
      {analysis ? (
        <div style={{
          background: 'var(--bg-deep)',
          borderRadius: 'var(--radius-md)',
          padding: 16,
          border: '1px solid var(--accent-border)',
        }}>
          {/* Status dot */}
          <div className="flex-center" style={{ gap: 6, marginBottom: 10, fontSize: 10, color: 'var(--accent)', fontWeight: 600 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            Personalized for your family · {ranked[0]?.name} ranked #1
          </div>

          {/* Render paragraphs split by double newline */}
          {analysis.split('\n\n').filter(Boolean).map((para, i) => (
            <p key={i} style={{
              fontSize: 13,
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              margin: i === 0 ? 0 : '12px 0 0',
            }}>
              {para}
            </p>
          ))}
        </div>
      ) : (
        <div style={{
          background: 'var(--bg-deep)',
          borderRadius: 'var(--radius-md)',
          padding: 24,
          border: '1px dashed var(--border-dashed)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 26, marginBottom: 6 }}>🏘️</div>
          <div style={{ color: 'var(--text-dimmer)', fontSize: 12 }}>
            Adjust your priorities, then click "Get AI Analysis"
          </div>
        </div>
      )}
    </section>
  )
}
