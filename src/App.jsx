import { useEffect } from 'react'
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { demoStyles } from './config/site.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Styles from './pages/Styles.jsx'
import Pricing from './pages/Pricing.jsx'
import Start from './pages/Start.jsx'
import Thanks from './pages/Thanks.jsx'
import Portal from './pages/Portal.jsx'
import Midnight from './pages/demos/Midnight.jsx'
import SoftLight from './pages/demos/SoftLight.jsx'
import Editorial from './pages/demos/Editorial.jsx'
import WarmStudio from './pages/demos/WarmStudio.jsx'
import ClassicSlate from './pages/demos/ClassicSlate.jsx'
import Neon from './pages/demos/Neon.jsx'
import Botanical from './pages/demos/Botanical.jsx'
import Mono from './pages/demos/Mono.jsx'
import Coastal from './pages/demos/Coastal.jsx'
import Luxe from './pages/demos/Luxe.jsx'
import PackageExample from './pages/demos/PackageExample.jsx'

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
  '/': 'FolioLabz · Portfolio websites, built for you',
  '/styles': 'Styles · FolioLabz',
  '/pricing': 'Pricing · FolioLabz',
  '/start': 'Start my build · FolioLabz',
  '/thanks': 'Brief received · FolioLabz',
  '/portal': 'Client portal · FolioLabz',
  '/examples/launch': 'Launch package example · FolioLabz',
  '/examples/pro': 'Pro package example · FolioLabz',
  '/examples/pro/work': 'Pro example: Work · FolioLabz',
  '/examples/pro/case-study': 'Pro example: Case Study · FolioLabz',
  '/examples/pro/gallery': 'Pro example: Gallery · FolioLabz',
  '/examples/pro/about': 'Pro example: About · FolioLabz',
  '/examples/pro/resume': 'Pro example: Resume · FolioLabz',
  '/examples/pro/contact': 'Pro example: Contact · FolioLabz',
}

function PageTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    const demo = demoStyles.find((d) => pathname === `/styles/${d.id}`)
    document.title = demo
      ? `${demo.name} style example · FolioLabz`
      : pageTitles[pathname] || pageTitles['/']
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/styles" element={<Styles />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/start" element={<Start />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/portal" element={<Portal />} />
        </Route>
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
    </>
  )
}
