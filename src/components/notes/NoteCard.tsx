import { CalendarDays, Heart, MoreVertical, Pencil, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Note } from '../../types/note'

interface NoteCardProps { note: Note; inTrash: boolean; onEdit: (note: Note) => void; onTrash: (id: string) => void; onRestore: (id: string) => void; onDeletePermanently: (id: string) => void; onFavorite: (id: string) => void }
function formatDate(value: string) { return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value)) }
export function NoteCard({ note, inTrash, onEdit, onTrash, onRestore, onDeletePermanently, onFavorite }: NoteCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <article className="note-card"><div className="card-top"><button className={`favorite ${note.isFavorite ? 'selected' : ''}`} onClick={() => onFavorite(note.id)} aria-label="Toggle favorite" disabled={inTrash}><Heart size={20} fill={note.isFavorite ? 'currentColor' : 'none'} /></button>
    <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Note actions"><MoreVertical size={20} /></button>
    {menuOpen && <div className="card-menu">{inTrash ? <><button onClick={() => onRestore(note.id)}><RotateCcw size={15} />Restore</button><button onClick={() => onDeletePermanently(note.id)}><Trash2 size={15} />Delete permanently</button></> : <><button onClick={() => { onEdit(note); setMenuOpen(false) }}><Pencil size={15} />Edit</button><button onClick={() => onTrash(note.id)}><Trash2 size={15} />Move to trash</button></>}</div>}
  </div><h2>{note.title}</h2><p className="note-preview">{note.content}</p>
  <footer><span><CalendarDays size={15} />{formatDate(note.createdAt)}</span>{note.tag && <b className={`tag tag-${note.tag.toLowerCase()}`}>{note.tag}</b>}</footer></article>
}
