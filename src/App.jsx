import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Background, ScrollProgress } from './components/Effects'
import { About, Contact, Footer, Home, Journey, Marquee, Navbar, Portfolio, WelcomeScreen } from './components/Sections'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])
  return (
    <>
      <AnimatePresence>{loading && <WelcomeScreen onDone={done} />}</AnimatePresence>
      {!loading && (
        <>
          <Background />
          <ScrollProgress />
          <Navbar />
          <main>
            <Home />
            <Marquee />
            <About />
            <Portfolio />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
