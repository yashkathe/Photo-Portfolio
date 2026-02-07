/**
 * Home page background images.
 * Later: replace with API that returns total and/or list of URLs.
 */
export const HOME_IMAGES = ['/home_page1.jpg', '/home_page2.jpg', '/home_page3.jpg'];

export function getRandomHomeImage() {
  return HOME_IMAGES[Math.floor(Math.random() * HOME_IMAGES.length)];
}
