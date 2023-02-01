import { standaloneServerPort } from '../../../server/config'

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
  return standaloneServer ? `http://localhost:${standaloneServerPort}` : ''
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
  const data = (await fetchJSON({
    method: 'get',
    url: `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}`,
  })) as any
  return data?.content
}
export { loadTemplate }

const getImageUrl = (standaloneServer, imageSrc) => {
  const baseUrl = getBaseUrl(standaloneServer)
  return `${baseUrl}/api/builder/handle?type=asset&path=${imageSrc}`
}
export { getImageUrl }

const uploadFile = async (file, standaloneServer) => {
  const formData = new FormData()
  formData.append('file-0', file)
  const baseUrl = getBaseUrl(standaloneServer)
  const res = await fetch(`${baseUrl}/api/builder/handle?type=data`, {
    method: 'POST',
    body: formData,
  })
  return await res.json()
}
export { uploadFile }
