import { FormEvent, useState } from 'react'
import { useNotesStore } from './store/notes-store'

export default function App() {
  const notes = useNotesStore((state) => state.notes)
  const addNote = useNotesStore((state) => state.addNote)
  const updateNote = useNotesStore((state) => state.updateNote)
  const deleteNote = useNotesStore((state) => state.deleteNote)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const startEdit = (id: string, noteTitle: string, noteContent: string) => {
    setEditingId(id)
    setTitle(noteTitle)
    setContent(noteContent)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()
    if (!trimmedTitle || !trimmedContent) return

    if (editingId) {
      updateNote(editingId, trimmedTitle, trimmedContent)
      cancelEdit()
      return
    }

    addNote(trimmedTitle, trimmedContent)
    setTitle('')
    setContent('')
  }

  return (
    <main className="notes-app">
      <h1>My Notes</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          aria-label="Note title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          aria-label="Note content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          required
        />
        <div className="form-actions">
          {editingId && (
            <button className="text-button" type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
          <button className="primary-button" type="submit">
            {editingId ? 'Save' : 'Add note'}
          </button>
        </div>
      </form>

      {notes.length === 0 ? (
        <p className="empty-state">No notes yet. Add your first one above.</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-card">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div className="note-actions">
                <button
                  type="button"
                  onClick={() => startEdit(note.id, note.title, note.content)}
                >
                  Edit
                </button>
                <button type="button" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
