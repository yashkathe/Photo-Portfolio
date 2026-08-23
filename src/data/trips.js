import lisbonPhotos from './photos/lisbon.json'
import reykjavikPhotos from './photos/reykjavik.json'
import tokyoPhotos from './photos/tokyo.json'

const trips = [
  {
    slug: 'tokyo',
    location: 'Tokyo',
    date: 'October 2026',
    photos: tokyoPhotos,
  },
  {
    slug: 'reykjavik',
    location: 'Reykjavik',
    date: 'June 2026',
    photos: reykjavikPhotos,
  },
  {
    slug: 'lisbon',
    location: 'Lisbon',
    date: 'March 2026',
    photos: lisbonPhotos,
  },
]

export default trips