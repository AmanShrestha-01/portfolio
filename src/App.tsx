import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Philosophy from './components/Philosophy'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <Nav />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
