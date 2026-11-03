import type { Note, NoteDraft } from '../types/note'

const now = '2026-11-03T13:42:00.000Z'
let notes: Note[] = [
  { id: '1', title: 'Learn Zustand', content: 'Try counter and cart example after finishing this dashboard.', tag: 'coding', isFavorite: true, deleted_at: null, createdAt: now, updatedAt: now },
  { id: '2', title: 'Plan Project', content: 'Build a notes app with a secure Neon Data API connection.', tag: 'project', isFavorite: false, deleted_at: null, createdAt: '2026-11-03T13:15:00.000Z', updatedAt: now },
  { id: '3', title: 'Couple Games Ideas', content: 'Truth or Dare, long distance tasks, and a movie night.', tag: 'fun', isFavorite: false, deleted_at: null, createdAt: '2026-11-03T11:50:00.000Z', updatedAt: now },
  { id: '4', title: 'Dental Website', content: 'Ask friend about clinic workflow and appointment details.', tag: 'work', isFavorite: false, deleted_at: null, createdAt: '2026-11-02T10:10:00.000Z', updatedAt: now },
]

const pause = () => new Promise((resolve) => setTimeout(resolve, 280))
const stamp = () => new Date().toISOString()

// Temporary mock only. Replace with server-side authenticated Data API calls after Neon is configured.
export const notesService = {
  async list(): Promise<Note[]> { await pause(); return [...notes] },
  async create(draft: NoteDraft): Promise<Note> {
    await pause(); const note = { id: crypto.randomUUID(), ...draft, isFavorite: false, deleted_at: null, createdAt: stamp(), updatedAt: stamp() }
    notes = [note, ...notes]; return note
  },
  async update(id: string, draft: NoteDraft): Promise<Note> {
    await pause(); const current = notes.find((note) => note.id === id)
    if (!current) throw new Error('That note no longer exists.')
    const updated = { ...current, ...draft, updatedAt: stamp() }
    notes = notes.map((note) => note.id === id ? updated : note); return updated
  },
  async toggleFavorite(id: string): Promise<Note> {
    const note = notes.find((item) => item.id === id)
    if (!note) throw new Error('That note no longer exists.')
    return this.update(id, { title: note.title, content: note.content, tag: note.tag }).then((updated) => {
      updated.isFavorite = !note.isFavorite; notes = notes.map((item) => item.id === id ? updated : item); return updated
    })
  },
  async moveToTrash(id: string): Promise<void> { await pause(); notes = notes.map((note) => note.id === id ? { ...note, deleted_at: stamp() } : note) },
  async restore(id: string): Promise<void> { await pause(); notes = notes.map((note) => note.id === id ? { ...note, deleted_at: null } : note) },
  async removePermanently(id: string): Promise<void> { await pause(); notes = notes.filter((note) => note.id !== id) },
  async emptyTrash(): Promise<void> { await pause(); notes = notes.filter((note) => !note.deleted_at) },
}
