// src/components/GradeBadge.jsx
// ─────────────────────────────────────────────────────
// Small badge displaying a letter grade (A, B+, C-, etc.)
// with a color-coded background derived from the grade.
//
// Props:
//  - grade: string e.g. "A", "B+", "C-"
//  - size:  optional font size in px (default 12)
// ─────────────────────────────────────────────────────

import { gradeColor } from '../utils/colors'

export default function GradeBadge({ grade, size = 12 }) {
  const color = gradeColor(grade)

  return (
    <span style={{
      fontSize: size - 1,
      fontWeight: 700,
      color,
      background: `${color}20`,
      borderRadius: 'var(--radius-sm)',
      padding: '1px 6px',
      fontFamily: 'monospace',
      flexShrink: 0,
    }}>
      {grade}
    </span>
  )
}
