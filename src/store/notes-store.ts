import { create } from 'zustand'
import type { Note } from '../types/note'

interface NotesState {
  notes: Note[]
  addNote: (title: string, content: string) => void
  updateNote: (id: string, title: string, content: string) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [
    {
      id: '1',
      title: 'Learn Zustand',
      content: 'Practice add, edit, and delete with one simple store.',
    },
  ],
  addNote: (title, content) =>
    set((state) => ({
      notes: [{ id: crypto.randomUUID(), title, content }, ...state.notes],
    })),
  updateNote: (id, title, content) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title, content } : note,
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}))
