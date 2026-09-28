import { useEffect, useState } from 'react'
import './ChangeLog.css'

function formatTimeSince(timestamp) {
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000))
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const remainingMinutes = minutes % 60

  if (days > 0) {
    return `${days}d ${hours}h ago`
  }

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m ago`
  }

  return `${remainingMinutes}m ago`
}

function ChangeLog() {
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState(() =>
    formatTimeSince(new Date(__CHANGE_LOG__[0].date).getTime()),
  )

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLastUpdatedLabel(formatTimeSince(new Date(__CHANGE_LOG__[0].date).getTime()))
    }, 60000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <aside className="change-log" aria-label="Website change log">
      <p className="change-log-updated">Last updated website: {lastUpdatedLabel}</p>
      <h2>Change logs:</h2>
      <ul>
        {__CHANGE_LOG__.map((commit) => (
          <li key={commit.hash}>
            <a
              href={`https://github.com/yashkathe/Photo-Portfolio/commit/${commit.hash}`}
              target="_blank"
              rel="noreferrer"
            >
              {commit.message}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default ChangeLog