import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { Note, NoteDraft } from "../../types/note";

interface NoteFormProps {
  editing: Note | null;
  onSave: (draft: NoteDraft) => Promise<unknown>;
  onCancel: () => void;
}
const blank = { title: "", content: "", tag: "" };
export function NoteForm({ editing, onSave, onCancel }: NoteFormProps) {
  const [form, setForm] = useState(blank);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(
    () =>
      setForm(
        editing
          ? {
              title: editing.title,
              content: editing.content,
              tag: editing.tag ?? "",
            }
          : blank,
      ),
    [editing],
  );
  const setValue = (field: keyof typeof blank, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setIsSaving(true);
    await onSave({
      title: form.title.trim(),
      content: form.content.trim(),
      tag: form.tag.trim() || null,
    });
    setIsSaving(false);
    if (!editing) setForm(blank);
  };
  return (
    <form className="note-form" onSubmit={submit}>
      <input
        aria-label="Note title"
        value={form.title}
        onChange={(event) => setValue("title", event.target.value)}
        placeholder="Note title"
        required
      />
      <textarea
        aria-label="Note content"
        value={form.content}
        onChange={(event) => setValue("content", event.target.value)}
        placeholder="Enter your note..."
        required
      />
      <div className="form-actions">
        <input
          aria-label="Note tag"
          className="tag-input"
          value={form.tag}
          onChange={(event) => setValue("tag", event.target.value)}
          placeholder="Add tag"
        />
        <div>
          {editing && (
            <button className="text-button" type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button className="primary-button" disabled={isSaving}>
            <Plus size={19} />
            {isSaving ? "Saving..." : editing ? "Save Note" : "Add Note"}
          </button>
        </div>
      </div>
    </form>
  );
}
