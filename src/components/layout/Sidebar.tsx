import { Heart, Home, PanelLeftClose, PanelLeftOpen, Trash2 } from 'lucide-react'
import type { NoteView } from '../../types/note'

interface SidebarProps { activeView: NoteView; allCount: number; favoriteCount: number; trashCount: number; onChange: (view: NoteView) => void; collapsed: boolean; onToggleCollapse: () => void }
const links = [{ id: 'all', label: 'All Notes', icon: Home }, { id: 'favorites', label: 'Favorites', icon: Heart }, { id: 'trash', label: 'Trash', icon: Trash2 }] as const

export function Sidebar({ activeView, allCount, favoriteCount, trashCount, onChange, collapsed, onToggleCollapse }: SidebarProps) {
  return <aside className="sidebar"><div className="sidebar-top"><button className="sidebar-trigger" onClick={onToggleCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}</button><nav aria-label="Notes filters">
    {links.map(({ id, label, icon: Icon }) => <button key={id} title={collapsed ? label : undefined} className={`nav-link ${activeView === id ? 'active' : ''}`} onClick={() => onChange(id)}>
      <Icon size={20} /><span>{label}</span><small>{id === 'all' ? allCount : id === 'favorites' ? favoriteCount : trashCount}</small>
    </button>)}
  </nav></div><div className="encouragement"><div className="notebook-art">✦<span>◡</span></div><strong>Keep going!</strong><p>You're doing great <b>✦</b></p></div></aside>
}
