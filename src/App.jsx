import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { demoStyles } from './config/site.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Styles = lazy(() => import('./pages/Styles.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const Start = lazy(() => import('./pages/Start.jsx'))
const Thanks = lazy(() => import('./pages/Thanks.jsx'))
const Portal = lazy(() => import('./pages/Portal.jsx'))
const Owner = lazy(() => import('./pages/Owner.jsx'))
const Midnight = lazy(() => import('./pages/demos/Midnight.jsx'))
const SoftLight = lazy(() => import('./pages/demos/SoftLight.jsx'))
const Editorial = lazy(() => import('./pages/demos/Editorial.jsx'))
const WarmStudio = lazy(() => import('./pages/demos/WarmStudio.jsx'))
const ClassicSlate = lazy(() => import('./pages/demos/ClassicSlate.jsx'))
const Neon = lazy(() => import('./pages/demos/Neon.jsx'))
const Botanical = lazy(() => import('./pages/demos/Botanical.jsx'))
const Mono = lazy(() => import('./pages/demos/Mono.jsx'))
const Coastal = lazy(() => import('./pages/demos/Coastal.jsx'))
const Luxe = lazy(() => import('./pages/demos/Luxe.jsx'))
const PackageExample = lazy(() => import('./pages/demos/PackageExample.jsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // let the page render, then jump to the anchor
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

const pageTitles = {
  '/': 'FolioLabz Â· Portfolio websites, built for you',
  '/styles': 'Styles Â· FolioLabz',
  '/pricing': 'Pricing Â· FolioLabz',
  '/start': 'Start my build Â· FolioLabz',
  '/thanks': 'Brief received Â· FolioLabz',
  '/portal': 'Client portal Â· FolioLabz',
  '/owner': 'Owner workspace · FolioLabz',
  '/examples/launch': 'Launch package example Â· FolioLabz',
  '/examples/pro': 'Pro package example Â· FolioLabz',
  '/examples/pro/work': 'Pro example: Work Â· FolioLabz',
  '/examples/pro/case-study': 'Pro example: Case Study Â· FolioLabz',
  '/examples/pro/gallery': 'Pro example: Gallery Â· FolioLabz',
  '/examples/pro/about': 'Pro example: About Â· FolioLabz',
  '/examples/pro/resume': 'Pro example: Resume Â· FolioLabz',
  '/examples/pro/contact': 'Pro example: Contact Â· FolioLabz',
}

function PageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const demo = demoStyles.find((d) => pathname === `/styles/${d.id}`)
    document.title = demo
      ? `${demo.name} style example Â· FolioLabz`
      : pageTitles[pathname] || pageTitles['/']
    document.title = document.title.replace(/\u00c2\u00b7/g, '\u00b7')
  }, [pathname])
  return null
}

function Layout() {
  return (
    <div className="min-h-screen bg-ink-950 text-frost">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <Suspense fallback={<div className="grid min-h-[50vh] place-items-center bg-ink-950 text-sm text-mist">Loading page&hellip;</div>}>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/styles" element={<Styles />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/start" element={<Start />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/portal" element={<Portal />} />
        </Route>
        <Route path="/owner" element={<Owner />} />
        {/* Full-screen style demos (immersive, no site nav) */}
        <Route path="/styles/midnight" element={<Midnight />} />
        <Route path="/styles/softlight" element={<SoftLight />} />
        <Route path="/styles/editorial" element={<Editorial />} />
        <Route path="/styles/warmstudio" element={<WarmStudio />} />
        <Route path="/styles/classicslate" element={<ClassicSlate />} />
        <Route path="/styles/neon" element={<Neon />} />
        <Route path="/styles/botanical" element={<Botanical />} />
        <Route path="/styles/mono" element={<Mono />} />
        <Route path="/styles/coastal" element={<Coastal />} />
        <Route path="/styles/luxe" element={<Luxe />} />
        <Route path="/examples/launch" element={<PackageExample packageId="launch" />} />
        <Route path="/examples/pro" element={<PackageExample packageId="pro" />} />
        <Route path="/examples/pro/work" element={<PackageExample packageId="pro" proPage="work" />} />
        <Route path="/examples/pro/case-study" element={<PackageExample packageId="pro" proPage="case-study" />} />
        <Route path="/examples/pro/gallery" element={<PackageExample packageId="pro" proPage="gallery" />} />
        <Route path="/examples/pro/about" element={<PackageExample packageId="pro" proPage="about" />} />
        <Route path="/examples/pro/resume" element={<PackageExample packageId="pro" proPage="resume" />} />
        <Route path="/examples/pro/contact" element={<PackageExample packageId="pro" proPage="contact" />} />
        {/* Unknown URLs go home rather than silently rendering Home at a wrong address */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </>
  )
}
