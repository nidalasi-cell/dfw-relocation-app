// src/components/Bar.jsx
// ─────────────────────────────────────────────────────
// Reusable animated horizontal score bar.
// Used in ranking cards, school stats, and comparisons.
//
// Props:
//  - score:   number 0–100 (the filled width %)
//  - color:   hex string for the fill color
//  - animate: boolean — if true, animates from 0 on mount
// ─────────────────────────────────────────────────────

import { useState, useEffect } from 'react'

export default function Bar({ score, color, animate = false }) {
  // Start at 0 so CSS transition plays on mount
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), animate ? 250 : 0)
    return () => clearTimeout(timer)
  }, [score, animate])

  return (
    <div style={{
      background: 'var(--bg-sunken)',
      borderRadius: 4,
      height: 6,
      overflow: 'hidden',
      flex: 1,
    }}>
      <div style={{
        height: '100%',
        borderRadius: 4,
        background: color,
        width: `${width}%`,
        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `0 0 6px ${color}55`,
      }} />
    </div>
  )
}
