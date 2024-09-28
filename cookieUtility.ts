
// Function to set a cookie
export function setCookie(name: string, value: string, days: number) {
  if (typeof document !== 'undefined') { // Ensure this runs only in the browser
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Set cookie expiration date
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`; // Set the cookie
  }
}

// Function to get a cookie by name
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') { // Check if we're on the server
    return null; // Return null on the server
  }
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map((cookie) => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null
  );
}

// Function to remove a cookie
export function removeCookie(name: string) {
  if (typeof document !== 'undefined') { // Ensure this runs only in the browser
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Set cookie expiration in the past to remove it
  }
}

// Function to set access and refresh tokens as cookies
export function setCookies(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken, 1); // Set access token to expire in 1 day
  setCookie('refreshToken', refreshToken, 7); // Set refresh token to expire in 7 days
}
