import { db } from '../lib/neon-client'
import type { Note } from '../types/note'

function fail(message: string): never {
  throw new Error(message)
}

export const notesApi = {
  async list(): Promise<Note[]> {
    const { data, error } = await db
      .from('notes')
      .select('id, title, content')
      .order('created_at', { ascending: false })

    if (error) fail(error.message)
    return data ?? []
  },

  async create(title: string, content: string): Promise<Note> {
    const { data, error } = await db
      .from('notes')
      .insert({ title, content })
      .select('id, title, content')
      .single()

    if (error) fail(error.message)
    if (!data) fail('Note was not created.')
    return data
  },

  async update(id: string, title: string, content: string): Promise<Note> {
    const { data, error } = await db
      .from('notes')
      .update({ title, content })
      .eq('id', id)
      .select('id, title, content')
      .single()

    if (error) fail(error.message)
    if (!data) fail('Note was not found.')
    return data
  },

  async remove(id: string): Promise<void> {
    const { error } = await db.from('notes').delete().eq('id', id)
    if (error) fail(error.message)
  },
}
