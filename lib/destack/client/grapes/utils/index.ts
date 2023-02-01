type fetchJSONArgs = {
  method: RequestInit['method']
  data?: Record<string, unknown>
  url: string
}

const elementExists = (el) => typeof el !== 'undefined' && el !== null
export { elementExists }

const fetchJSON = async ({ method, url, data }: fetchJSONArgs): Promise<JSON> => {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  })
  return await res.json()
}

export { fetchJSON }

// fixes problem with tailwind (use of slashes in css class names)
const escapeName = (name: string): string => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-')
export { escapeName }

const getSvgHtml = (svg: () => Element): string => {
  if (typeof window === 'undefined') return ''
  const svgEl = svg()
  svgEl.setAttribute('width', '100%')
  svgEl.setAttribute('height', '100%')
  return svgEl.outerHTML
}
export { getSvgHtml }

const getPngHtml = (png): string => {
  const img = new Image()
  img.src = png
  img.style.width = '100%'
  img.style.objectFit = 'cover'
  img.style.aspectRatio = '1.81'
  return img.outerHTML
}
export { getPngHtml }

const isJsonValid = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
export { isJsonValid }

const getBaseUrl = (standaloneServer) => {
  return standaloneServer ? `http://localhost:${port}` : ''
}

const saveTemplate = async (state, standaloneServer) => {
  const baseUrl = getBaseUrl(standaloneServer)
  const body = { data: state }

  await fetchJSON({
    method: 'post',
    url: `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`,
    data: body,
  })
}
export { saveTemplate }

const loadTemplate = async (standaloneServer) => {
  const baseUrl = getBaseUrl(standaloneServer)
  const data = await fetchJSON({
    method: 'get',
    url: `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`,
  })
  return data?.content
}
export { loadTemplate }
