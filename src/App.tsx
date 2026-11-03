import { FormEvent, useEffect, useState } from 'react'
import { notesApi } from './services/notes-api'
import type { Note } from './types/note'

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    notesApi
      .list()
      .then((data) => setNotes(data))
      .catch((cause) => {
        const message =
          cause instanceof Error ? cause.message : 'Could not load notes.'
        if (message.includes('404')) {
          setError(
            'Neon Auth is not enabled yet. In Neon Console → Data API, turn on Neon Auth, then run bun run db:setup and refresh the schema cache.',
          )
          return
        }
        setError(message)
      })
  }, [])

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()
    if (!trimmedTitle || !trimmedContent) return

    try {
      setError('')
      if (editingId) {
        const updated = await notesApi.update(editingId, trimmedTitle, trimmedContent)
        setNotes((current) =>
          current.map((note) => (note.id === editingId ? updated : note)),
        )
        cancelEdit()
        return
      }

      const created = await notesApi.create(trimmedTitle, trimmedContent)
      setNotes((current) => [created, ...current])
      setTitle('')
      setContent('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save note.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setError('')
      await notesApi.remove(id)
      setNotes((current) => current.filter((note) => note.id !== id))
      if (editingId === id) cancelEdit()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not delete note.')
    }
  }

  return (
    <main className="notes-app">
      <h1>My Notes</h1>

      {error && (
        <p className="error-banner" role="alert">
          {error}
        </p>
      )}

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
                <button type="button" onClick={() => handleDelete(note.id)}>
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
