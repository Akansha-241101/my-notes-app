import { Search } from 'lucide-react'
import type { NoteView } from '../../types/note'

interface NotesHeaderProps { view: NoteView; query: string; onQueryChange: (value: string) => void; hasTrash: boolean; onEmptyTrash: () => void }
export function NotesHeader({ view, query, onQueryChange, hasTrash, onEmptyTrash }: NotesHeaderProps) {
  const title = view === 'favorites' ? 'Favorite Notes' : view === 'trash' ? 'Trash' : 'All Notes'
  const description = view === 'trash' ? 'Restore notes or remove them permanently.' : 'Save your thoughts, ideas and plans...'
  return <section className="notes-heading"><div><h1>{title}</h1><p>{description}</p></div><div className="header-actions">
    {view === 'trash' && hasTrash && <button className="empty-trash" onClick={onEmptyTrash}>Empty Trash</button>}<label className="search"><Search size={19} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search notes..." /></label>
  </div>
  </section>
}
