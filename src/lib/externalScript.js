const scriptPromises = new Map()

export function loadExternalScript(src, ready) {
  if (ready?.()) return Promise.resolve()
  if (scriptPromises.has(src)) return scriptPromises.get(src)

  const promise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    const script = existing || document.createElement('script')

    const onLoad = () => resolve()
    const onError = () => {
      scriptPromises.delete(src)
      reject(new Error(`Could not load ${src}`))
    }

    script.addEventListener('load', onLoad, { once: true })
    script.addEventListener('error', onError, { once: true })
    if (!existing) {
      script.src = src
      script.async = true
      document.head.appendChild(script)
    }
  })

  scriptPromises.set(src, promise)
  return promise
}
