import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { to: '/shardscript-info', label: 'Home' },
    { to: '/shardscript-info/about', label: 'About' },
    { to: '/shardscript-info/docs', label: 'Documentation' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(26,10,10,0.85)] backdrop-blur-[12px]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/shardscript-info" className="flex items-center gap-3">
            <img
              src="/shardscript-info/logo.png"
              alt="ShardScript"
              className="w-9 h-9 rounded-lg object-contain"
            />
            <span className="font-space text-sm font-medium text-text-primary tracking-wide">
              ShardScript
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-inter text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-burgundy" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/shardscript-info/docs"
            className="hidden md:inline-flex items-center px-6 py-2.5 rounded-button bg-burgundy text-text-primary font-space text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-burgundy-dark hover:shadow-glowBurgundy hover:-translate-y-0.5"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(26,10,10,0.98)] flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="absolute top-6 right-6 text-text-primary"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-space text-2xl font-semibold transition-colors duration-200 ${
                isActive(link.to) ? 'text-burgundy-light' : 'text-text-primary'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/shardscript-info/docs"
            className="mt-4 px-8 py-3 rounded-button bg-burgundy text-text-primary font-space text-sm font-semibold uppercase tracking-widest"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  )
}
