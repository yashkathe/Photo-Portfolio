export const photoFilters = [
  { label: 'All', value: 'all', categories: null, includes: [] },
  {
    label: 'Wildlife',
    value: 'wildlife',
    categories: ['bird', 'animal'],
    children: [
      { label: 'Birds', value: 'bird', categories: ['bird'] },
      { label: 'Animals', value: 'animal', categories: ['animal'] },
    ],
  },
  {
    label: 'Views',
    value: 'views',
    categories: ['landscape', 'street', 'architecture'],
    children: [
      { label: 'Panorama', value: 'landscape', categories: ['landscape'] },
      { label: 'Street', value: 'street', categories: ['street', 'architecture'] },
    ],
  },
  { label: 'Astro', value: 'astro', categories: ['night'] },
]

const allFilters = photoFilters.flatMap((filter) => [filter, ...(filter.children ?? [])])

export function matchesPhotoFilter(photo, filterValue) {
  const filter = allFilters.find((item) => item.value === filterValue)

  if (!filter || !filter.categories) {
    return true
  }

  return filter.categories.includes(photo.category)
}