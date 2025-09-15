export function setToken(token: string, name: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
}
export function getToken(): string | null {
  return localStorage.getItem('token');
}
export function clearToken() {
  localStorage.removeItem('token');
}
