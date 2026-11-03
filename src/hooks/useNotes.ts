import { useCallback, useEffect, useState } from 'react'
import { notesService } from '../services/notesService'
import type { Note, NoteDraft, NoteView } from '../types/note'

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try { setIsLoading(true); setNotes(await notesService.list()); setError('') }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Could not load notes.') }
    finally { setIsLoading(false) }
  }, [])

  useEffect(() => { void load() }, [load])
  const perform = async (action: () => Promise<Note | void>) => {
    try { const result = await action(); setError(''); await load(); return result ?? true }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Something went wrong.'); return undefined }
  }
  const createNote = (draft: NoteDraft) => perform(() => notesService.create(draft))
  const updateNote = (id: string, draft: NoteDraft) => perform(() => notesService.update(id, draft))
  const trashNote = (id: string) => perform(() => notesService.moveToTrash(id))
  const restoreNote = (id: string) => perform(() => notesService.restore(id))
  const deletePermanently = (id: string) => perform(() => notesService.removePermanently(id))
  const emptyTrash = () => perform(() => notesService.emptyTrash())
  const favoriteNote = (id: string) => perform(() => notesService.toggleFavorite(id))
  return { notes, isLoading, error, load, createNote, updateNote, trashNote, restoreNote, deletePermanently, emptyTrash, favoriteNote }
}

export function filterNotes(notes: Note[], view: NoteView, query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  return notes.filter((note) => {
    const matchesView = view === 'all' ? !note.deleted_at : view === 'favorites' ? note.isFavorite && !note.deleted_at : Boolean(note.deleted_at)
    const haystack = `${note.title} ${note.content}`.toLowerCase()
    return matchesView && haystack.includes(normalizedQuery)
  })
}
