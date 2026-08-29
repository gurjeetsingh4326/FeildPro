"use client";

import * as React from "react";
import { Camera, Plus, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import type { NoteEntry, AttachmentEntry } from "@/lib/dummy-data/work-order-detail";

export interface WoNotesAttachmentsTabProps {
  notes: NoteEntry[];
  attachments: AttachmentEntry[];
  onAddNote: (text: string) => void;
  onAddAttachment: () => void;
}

export function WoNotesAttachmentsTab({ notes, attachments, onAddNote, onAddAttachment }: WoNotesAttachmentsTabProps) {
  const [draft, setDraft] = React.useState("");

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="mb-3 text-sm font-semibold text-text-primary">Notes</h3>
        <div className="space-y-3">
          {notes.length === 0 ? (
            <p className="py-2 text-[13px] text-text-muted">No notes yet.</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="flex gap-3">
                <Avatar name={note.authorName} size="sm" className="mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1 rounded-md bg-surface-sunken p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-medium text-text-primary">{note.authorName}</p>
                    <p className="text-[12px] text-text-muted">{note.timestamp}</p>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{note.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <form
          className="mt-4 flex items-start gap-2 border-t border-border pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            onAddNote(draft.trim());
            setDraft("");
          }}
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a note…"
            rows={2}
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <Button type="submit" size="icon" aria-label="Post note" disabled={!draft.trim()}>
            <Send className="size-4" />
          </Button>
        </form>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Attachments</h3>
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={onAddAttachment}>
            <Plus className="size-3.5" /> Add Photo
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {attachments.map((att) => (
            <div key={att.id} className="group relative">
              <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-surface-sunken">
                <Camera className="size-6 text-text-muted" />
              </div>
              <p className="mt-1 truncate text-[11px] text-text-muted">{att.label}</p>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddAttachment}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border-strong text-text-muted transition-colors hover:border-primary hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Plus className="size-5" />
            <span className="text-[11px]">Add photo</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
