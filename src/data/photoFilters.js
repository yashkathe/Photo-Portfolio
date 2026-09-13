export const photoFilters = [
  { label: 'All', value: 'all', categories: null, includes: [] },
  { label: 'Birds', value: 'bird', categories: ['bird'] },
  { label: 'Animals', value: 'animal', categories: ['animal'] },
  {
    label: 'Wildlife',
    value: 'wildlife',
    categories: ['bird', 'animal'],
    includes: ['bird', 'animal'],
  },
  {
    label: 'Places',
    value: 'places',
    categories: ['landscape', 'street', 'architecture'],
    includes: ['landscape', 'street'],
  },
  { label: 'Landscape', value: 'landscape', categories: ['landscape'] },
  { label: 'Street', value: 'street', categories: ['street', 'architecture'] },
  { label: 'Astro', value: 'astro', categories: ['night'] },
]

export function matchesPhotoFilter(photo, filterValue) {
  const filter = photoFilters.find((item) => item.value === filterValue)

  if (!filter || !filter.categories) {
    return true
  }

  return filter.categories.includes(photo.category)
}

export function isFilterIncluded(activeFilterValue, filterValue) {
  const activeFilter = photoFilters.find((item) => item.value === activeFilterValue)

  return activeFilter?.includes?.includes(filterValue) ?? false
}