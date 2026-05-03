// src/App.jsx
// ─────────────────────────────────────────────────────
// Root component — currently renders the single page.
//
// If you later add routing (e.g. React Router), this is
// where you'd add <Routes> and <Route> elements.
// For now it just renders RelocationPage directly.
// ─────────────────────────────────────────────────────

import RelocationPage from './pages/RelocationPage'

export default function App() {
  return <RelocationPage />
}
