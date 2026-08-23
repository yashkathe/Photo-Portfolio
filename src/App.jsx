import './index.css'
import { Route, Routes } from 'react-router-dom'
import Trip from './components/Trip'
import Header from './components/ui/Header'
import Featured from './pages/Featured'

const trips = [
  { location: 'Tokyo', duration: '7 days', date: 'October 2026' },
  { location: 'Reykjavik', duration: '5 days', date: 'June 2026' },
  { location: 'Lisbon', duration: '4 days', date: 'March 2026' },
]

function App() {
  return (
    <main className="shell">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <section className="timeline" aria-label="Travel timeline">
              {trips.map((trip) => (
                <div className="timeline-entry" key={trip.location}>
                  <Trip {...trip} />
                </div>
              ))}
            </section>
          }
        />
        <Route path="/featured" element={<Featured />} />
      </Routes>
    </main>
  )
}

export default App