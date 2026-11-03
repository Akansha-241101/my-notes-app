import type { Note, NoteView } from '../../types/note'
import { NoteCard } from './NoteCard'

interface NotesGridProps { notes: Note[]; view: NoteView; isLoading: boolean; onEdit: (note: Note) => void; onTrash: (id: string) => void; onRestore: (id: string) => void; onDeletePermanently: (id: string) => void; onFavorite: (id: string) => void }
export function NotesGrid({ notes, view, isLoading, onEdit, onTrash, onRestore, onDeletePermanently, onFavorite }: NotesGridProps) {
  if (isLoading) return <p className="status">Loading your notes…</p>
  if (!notes.length) return <div className="empty-state"><div className="empty-icon">✦</div><h2>{view === 'trash' ? 'Trash is empty' : 'No notes here yet'}</h2><p>{view === 'trash' ? 'Notes moved to trash will appear here.' : 'Write your first thought above and it will appear here.'}</p></div>
  return <section className="notes-grid" aria-live="polite">{notes.map((note) => <NoteCard key={note.id} note={note} inTrash={view === 'trash'} onEdit={onEdit} onTrash={onTrash} onRestore={onRestore} onDeletePermanently={onDeletePermanently} onFavorite={onFavorite} />)}</section>
}
