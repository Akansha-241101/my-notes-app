export interface Note {
  id: string
  title: string
  content: string
  tag: string | null
  isFavorite: boolean
  deleted_at: string | null
  createdAt: string
  updatedAt: string
}

export type NoteDraft = Pick<Note, 'title' | 'content' | 'tag'>
export type NoteView = 'all' | 'favorites' | 'trash'
