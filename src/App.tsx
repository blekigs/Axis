import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { StoreProvider } from './context/StoreContext'
import Pocetna from './pages/Pocetna'

/**
 * The home page ships in the main bundle because it is the landing route.
 * Everything else is split, so the first paint is not paying for the gallery
 * viewer or the contact form.
 */
const Trgovina = lazy(() => import('./pages/Trgovina'))
const KakoFunkcionira = lazy(() => import('./pages/KakoFunkcionira'))
const OServeru = lazy(() => import('./pages/OServeru'))
const Podrska = lazy(() => import('./pages/Podrska'))
const NijePronadeno = lazy(() => import('./pages/NijePronadeno'))
const Uvjeti = lazy(() => import('./pages/Pravno').then((m) => ({ default: m.Uvjeti })))
const Privatnost = lazy(() => import('./pages/Pravno').then((m) => ({ default: m.Privatnost })))

/**
 * Route fallback. Holds the vertical space a page occupies so the footer does
 * not jump up and back down during a chunk load.
 */
function Ucitavanje() {
  return <div aria-hidden="true" className="min-h-[60dvh]" />
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Suspense fallback={<Ucitavanje />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Pocetna />} />
              <Route path="trgovina" element={<Trgovina />} />
              <Route path="kako-funkcionira" element={<KakoFunkcionira />} />
              <Route path="o-serveru" element={<OServeru />} />
              <Route path="podrska" element={<Podrska />} />
              <Route path="uvjeti-koristenja" element={<Uvjeti />} />
              <Route path="pravila-privatnosti" element={<Privatnost />} />
              <Route path="*" element={<NijePronadeno />} />
            </Route>
          </Routes>
        </Suspense>
      </StoreProvider>
    </BrowserRouter>
  )
}
