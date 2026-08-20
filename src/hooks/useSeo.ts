import { useEffect } from 'react'

interface Seo {
  naslov: string
  opis: string
}

function postavi(selektor: string, atribut: string, vrijednost: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selektor)
  if (el) el.setAttribute(atribut, vrijednost)
}

/**
 * Per route title and description. Small enough that pulling in a head manager
 * would cost more than it saves.
 */
export function useSeo({ naslov, opis }: Seo) {
  useEffect(() => {
    const puni = naslov === 'Axis RolePlay' ? naslov : `${naslov} | Axis RolePlay`
    document.title = puni

    postavi('meta[name="description"]', 'content', opis)
    postavi('meta[property="og:title"]', 'content', puni)
    postavi('meta[property="og:description"]', 'content', opis)
    postavi('meta[name="twitter:title"]', 'content', puni)
    postavi('meta[name="twitter:description"]', 'content', opis)

    const kanonski = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (kanonski) kanonski.href = new URL(window.location.pathname, window.location.origin).href

    const ogUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (ogUrl) ogUrl.content = new URL(window.location.pathname, window.location.origin).href
  }, [naslov, opis])
}
