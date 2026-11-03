import { Moon, NotebookPen, Sun } from 'lucide-react'

interface NavbarProps { darkMode: boolean; onToggleTheme: () => void }

export function Navbar({ darkMode, onToggleTheme }: NavbarProps) {
  return <header className="navbar">
    <a className="brand" href="#notes" aria-label="My Notes home"><span className="brand-mark"><NotebookPen size={22} /></span><span>My Notes</span></a>
    <div className="nav-actions">
      <button className="icon-button" onClick={onToggleTheme} aria-label="Toggle color theme">
        {darkMode ? <Moon size={20} /> : <Sun size={21} />}
      </button>
      <div className="profile" aria-label="Demo profile for Sam"><span className="avatar">S</span><span className="profile-copy"><strong>Sam</strong><small>Free</small></span></div>
    </div>
  </header>
}
