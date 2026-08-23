import lassenPhotos from './photos/lassen-volcanic-national-park-may-2026.json'
import greatBasinPhotos from './photos/great-basin-national-park-august-2026.json'
import redwoodPhotos from './photos/redwood-national-park-july-2026.json'
import sanFranciscoPhotos from './photos/san-francisco-august-2025.json'
import sanFranciscoAprilPhotos from './photos/san-francisco-april-2026.json'

const tripData = [
  {
    title: 'Great Basin National Park',
    location: 'White Pine County, Nevada, USA',
    date: 'August 14 - August 16, 2026',
    photos: greatBasinPhotos,
  },
  {
    title: 'Redwood National Park',
    location: 'Del Norte and Humboldt Counties, California, USA',
    date: 'July 18, 2026',
    photos: redwoodPhotos,
  },
  {
    title: 'Lassen Volcanic National Park',
    location: 'Lassen County, California, USA',
    date: 'May 21 - May 22, 2026',
    photos: lassenPhotos,
  },
  {
    title: 'San Francisco',
    location: 'San Francisco, California, USA',
    date: 'April 4, 2026',
    photos: sanFranciscoAprilPhotos,
  },
  {
    title: 'San Francisco',
    location: 'San Francisco, California, USA',
    date: 'August 2, 2025',
    photos: sanFranciscoPhotos,
  },
]

// Generate a unique URL slug from each trip title and date.
function createTripSlug(trip) {
  return `${trip.title} ${trip.date}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const trips = tripData.map((trip) => ({
  ...trip,
  slug: createTripSlug(trip),
}))

export default trips