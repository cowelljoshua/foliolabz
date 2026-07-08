import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Styles from './pages/Styles.jsx'
import Pricing from './pages/Pricing.jsx'
import Start from './pages/Start.jsx'
import Thanks from './pages/Thanks.jsx'
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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/styles" element={<Styles />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/start" element={<Start />} />
          <Route path="/thanks" element={<Thanks />} />
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
        <Route path="*" element={<Layout />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}
