import { Link } from 'react-router-dom'
import { Github, MessageCircle, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#3A3A50]" style={{ background: '#1E1E2E' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <Link to="/shardscript-info/" className="flex items-center gap-3">
              <img
                src="/shardscript-info/logo.png"
                alt="ShardScript"
                className="w-9 h-9 rounded-lg object-contain"
              />
              <span className="font-space text-sm font-medium text-text-primary tracking-wide">
                ShardScript
              </span>
            </Link>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              A compiled scripting language. C-Style. Functional. Embeddable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">
              NAVIGATION
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/shardscript-info/"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/shardscript-info/about"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/shardscript-info/docs"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Documentation
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">
              RESOURCES
            </h4>
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer">
                GitHub
              </span>
              <span className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer">
                Package Manager
              </span>
              <span className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer">
                Community
              </span>
              <span className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer">
                Blog
              </span>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted mb-4">
              COMMUNITY
            </h4>
            <div className="flex items-center gap-4">
              <span className="text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer">
                <Github size={20} />
              </span>
              <span className="text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer">
                <MessageCircle size={20} />
              </span>
              <span className="text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer">
                <Twitter size={20} />
              </span>
              <span className="text-text-muted hover:text-gold transition-colors duration-200 cursor-pointer">
                <Youtube size={20} />
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#3A3A50] text-center">
          <p className="text-xs font-medium tracking-[0.05em] uppercase text-text-muted">
            &copy; 2026 ShardScript. Open source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}
