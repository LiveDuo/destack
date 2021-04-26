const fetchJSON = (method, url, data) => fetch(url, {method, headers: {'Content-Type': 'application/json'}, body: data ? JSON.stringify(data) : undefined})
    .then(res => res.json())

export { fetchJSON }

// fixes problem with tailwind (use of slashes in css class names)
const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-\:\/]+)/gi, '-')
export { escapeName }

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return ''
    const svgEl = svg()
    svgEl.setAttribute('width',  '100%')
    svgEl.setAttribute('height',  '100%')
    return svgEl.outerHTML
}
export {getSvgHtml}