export default (selector = '.lazyload', options = {}) => {
  const defaultOptions = {
    rootMargin: '10px',
    threshold: 0.1
  }

  options = {...defaultOptions, ...options}

  const { rootMargin, threshold, loaded } = options

  const load = target => {
    target.src = target.getAttribute('data-src')
    typeof loaded === 'function' && loaded(target)
  }

  const intersectionTiggered = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        load(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(intersectionTiggered, {
    rootMargin,
    threshold
  })

  return {
    observe() {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => {
        observer.observe(element)
      })
    }
  }
}