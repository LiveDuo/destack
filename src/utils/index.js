const fetchJSON = (method, url, data) => fetch(url, {method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)}).then(data => data.json())
export { fetchJSON }
// fixes problem with tailwind (use of slashes in css class names)
const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-\:\/]+)/gi, '-')
export { escapeName }