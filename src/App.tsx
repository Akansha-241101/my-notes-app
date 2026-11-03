import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { NoteForm } from "./components/notes/NoteForm";
import { NotesGrid } from "./components/notes/NotesGrid";
import { NotesHeader } from "./components/notes/NotesHeader";
import { filterNotes, useNotes } from "./hooks/useNotes";
import type { Note, NoteDraft, NoteView } from "./types/note";

export default function App() {
  const {
    notes,
    isLoading,
    error,
    createNote,
    updateNote,
    trashNote,
    restoreNote,
    deletePermanently,
    emptyTrash,
    favoriteNote,
  } = useNotes();
  const [view, setView] = useState<NoteView>("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("notes-theme") === "dark",
  );
  const [message, setMessage] = useState("");
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("notes-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 3000);
    return () => window.clearTimeout(timer);
  }, [message]);
  const save = async (draft: NoteDraft) => {
    const result = editing
      ? await updateNote(editing.id, draft)
      : await createNote(draft);
    if (result) {
      setMessage(editing ? "Note updated." : "Note added.");
      setEditing(null);
    }
  };
  const moveToTrash = async (id: string) => {
    if (await trashNote(id)) setMessage("Note moved to trash.");
  };
  const restore = async (id: string) => {
    if (await restoreNote(id)) setMessage("Note restored.");
  };
  const removePermanently = async (id: string) => {
    const message = "This note will be permanently deleted. This action cannot be undone.";
    if (window.confirm(message) && await deletePermanently(id)) setMessage("Note permanently deleted.");
  };
  const clearTrash = async () => {
    const message = "All notes in Trash will be permanently deleted. This action cannot be undone.";
    if (window.confirm(message) && await emptyTrash()) setMessage("Trash emptied.");
  };
  const activeNotes = notes.filter((note) => !note.deleted_at);
  const trashCount = notes.length - activeNotes.length;
  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((value) => !value)}
      />
      <Sidebar
        activeView={view}
        allCount={activeNotes.length}
        favoriteCount={activeNotes.filter((note) => note.isFavorite).length}
        trashCount={trashCount}
        onChange={setView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
      />
      <main id="notes" className="main-content">
        <NotesHeader view={view} query={query} onQueryChange={setQuery} hasTrash={trashCount > 0} onEmptyTrash={clearTrash} />
        {view !== "trash" && (
          <NoteForm
            editing={editing}
            onSave={save}
            onCancel={() => setEditing(null)}
          />
        )}
        {error && (
          <p className="alert error" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="toast" role="status">
            {message}
          </p>
        )}
        <NotesGrid
          notes={filterNotes(notes, view, query)}
          view={view}
          isLoading={isLoading}
          onEdit={setEditing}
          onTrash={moveToTrash}
          onRestore={restore}
          onDeletePermanently={removePermanently}
          onFavorite={favoriteNote}
        />
      </main>
    </div>
  );
}
