const COOKIE_NAME = 'photo-portfolio-shuffle-seed'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function createSeededRandom(seed) {
    let state = seed >>> 0

    return () => {
        state += 0x6D2B79F5
        let value = state
        value = Math.imul(value ^ (value >>> 15), value | 1)
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61)

        return ((value ^ (value >>> 14)) >>> 0) / 4294967296
    }
}

function shuffleWithRandom(items, random) {
    const shuffled = [...items]

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

function getCookieValue(name) {
    if (typeof document === 'undefined') return null

    const cookie = document.cookie
        .split('; ')
        .find(entry => entry.startsWith(`${name}=`))

    if (!cookie) return null

    return decodeURIComponent(cookie.split('=').slice(1).join('='))
}

function setCookieValue(name, value) {
    if (typeof document === 'undefined') return

    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}

function getOrCreateSeed() {
    const existingSeed = getCookieValue(COOKIE_NAME)
    if (existingSeed) return Number(existingSeed)

    const nextSeed = window.crypto?.getRandomValues
        ? window.crypto.getRandomValues(new Uint32Array(1))[0]
        : Date.now()

    setCookieValue(COOKIE_NAME, String(nextSeed))
    return nextSeed
}

export function getSeededPhotoOrder(items) {
    const seed = getOrCreateSeed()
    const random = createSeededRandom(seed)

    return shuffleWithRandom(items, random)
}

export function shufflePhotos(items, seed) {
    return shuffleWithRandom(items, createSeededRandom(seed))
}