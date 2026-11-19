"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { z } from "zod";
import { EDITORIAL_PAGE_KEYS } from "@/lib/editorial/types";
import {
  createEditorialSection,
  deleteEditorialSection,
  updateEditorialSection,
  updateTransportDataset,
} from "@/app/actions";
import type { EditorialSectionRow, Json, TransportDatasetRow } from "@/lib/supabase/database.types";
import type { ActionResult } from "@/lib/actions.types";

type EditorialForm = {
  id: string;
  page_key: string;
  title: string;
  sort_order: string;
  published: boolean;
  content: string;
};

const EMPTY_EDITORIAL: EditorialForm = {
  id: "",
  page_key: "home",
  title: "",
  sort_order: "20",
  published: false,
  content: "[]",
};

type EditableSection = Omit<EditorialSectionRow, "content"> & {
  content: Json;
};

function formFromSection(section: EditableSection): EditorialForm {
  return {
    id: section.id,
    page_key: section.page_key,
    title: section.title,
    sort_order: String(section.sort_order),
    published: section.published,
    content: JSON.stringify(section.content, null, 2),
  };
}

function resultError(result: ActionResult): string | null {
  return result.ok ? null : result.error;
}

export default function ContentEditors({
  editorialSections,
  transportDatasets,
}: {
  editorialSections: EditableSection[];
  transportDatasets: TransportDatasetRow[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [sections, setSections] = useState(editorialSections);
  const [editorialForm, setEditorialForm] = useState<EditorialForm>(
    editorialSections[0] ? formFromSection(editorialSections[0]) : EMPTY_EDITORIAL,
  );
  const [selectedSectionId, setSelectedSectionId] = useState(
    editorialSections[0]?.id ?? "",
  );
  const [editorialError, setEditorialError] = useState("");
  const [editorialMessage, setEditorialMessage] = useState("");
  const [datasets, setDatasets] = useState(transportDatasets);
  const [transportId, setTransportId] = useState(transportDatasets[0]?.id ?? "");
  const [transportJson, setTransportJson] = useState(
    transportDatasets[0] ? JSON.stringify(transportDatasets[0].data, null, 2) : "",
  );
  const [transportError, setTransportError] = useState("");
  const [transportMessage, setTransportMessage] = useState("");

  function chooseSection(id: string) {
    setSelectedSectionId(id);
    setEditorialError("");
    setEditorialMessage("");
    if (!id) {
      setEditorialForm(EMPTY_EDITORIAL);
      return;
    }
    const section = sections.find((item) => item.id === id);
    if (section) setEditorialForm(formFromSection(section));
  }

  function saveSection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditorialError("");
    setEditorialMessage("");
    let content: Json;
    try {
      const parsed = z.json().safeParse(JSON.parse(editorialForm.content));
      if (!parsed.success) {
        setEditorialError("Content must contain only valid JSON values.");
        return;
      }
      content = parsed.data;
    } catch {
      setEditorialError("Content must be valid JSON.");
      return;
    }
    const payload = {
      id: editorialForm.id,
      page_key: editorialForm.page_key,
      title: editorialForm.title,
      sort_order: Number(editorialForm.sort_order),
      published: editorialForm.published,
      content,
    };
    startTransition(async () => {
      const result = selectedSectionId
        ? await updateEditorialSection(payload)
        : await createEditorialSection(payload);
      const error = resultError(result);
      if (error) {
        setEditorialError(error);
        return;
      }
      const saved: EditableSection = {
        ...payload,
        content,
        updated_at: new Date().toISOString(),
      };
      setSections((current) => [
        ...current.filter((section) => section.id !== saved.id),
        saved,
      ].sort((a, b) => a.page_key.localeCompare(b.page_key) || a.sort_order - b.sort_order));
      setSelectedSectionId(saved.id);
      setEditorialMessage("Editorial section saved.");
      router.refresh();
    });
  }

  function removeSection() {
    if (!selectedSectionId || !window.confirm(`Delete "${editorialForm.title}"?`)) return;
    setEditorialError("");
    setEditorialMessage("");
    startTransition(async () => {
      const result = await deleteEditorialSection(selectedSectionId);
      const error = resultError(result);
      if (error) {
        setEditorialError(error);
        return;
      }
      const remaining = sections.filter((section) => section.id !== selectedSectionId);
      setSections(remaining);
      chooseSection(remaining[0]?.id ?? "");
      setEditorialMessage("Editorial section deleted.");
      router.refresh();
    });
  }

  function chooseTransport(id: string) {
    setTransportError("");
    setTransportMessage("");
    const dataset = datasets.find((item) => item.id === id);
    if (!dataset) {
      setTransportError(`Transport dataset "${id}" is not available.`);
      return;
    }
    setTransportId(dataset.id);
    setTransportJson(JSON.stringify(dataset.data, null, 2));
  }

  function saveTransport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTransportError("");
    setTransportMessage("");
    let data: Json;
    try {
      const parsed = z.json().safeParse(JSON.parse(transportJson));
      if (!parsed.success) {
        setTransportError("Transport data must contain only valid JSON values.");
        return;
      }
      data = parsed.data;
    } catch {
      setTransportError("Transport data must be valid JSON.");
      return;
    }
    startTransition(async () => {
      const result = await updateTransportDataset({ id: transportId, data });
      const error = resultError(result);
      if (error) {
        setTransportError(error);
        return;
      }
      setDatasets((current) =>
        current.map((dataset) => dataset.id === transportId ? { ...dataset, data } : dataset),
      );
      setTransportMessage("Transport dataset saved.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
        <h2 className="font-display text-xl font-bold">Editorial content</h2>
        <p className="mt-1 text-sm text-gray-600">
          Edit published sections or add another section to any page key. Content is a JSON array of heading, paragraph and list blocks.
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(12rem,1fr)_2fr]">
          <div>
            <label className="block text-sm font-semibold" htmlFor="editorial-section-select">Existing sections</label>
            <select
              id="editorial-section-select"
              className="mt-1 w-full rounded border p-2"
              value={selectedSectionId}
              onChange={(event) => chooseSection(event.target.value)}
            >
              <option value="">Add a new section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.page_key} — {section.title}
                </option>
              ))}
            </select>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              Inline markdown supports <code>**bold**</code> and{" "}
              <code>[link text](/path)</code>. Internal links must begin with
              one slash; external links must use HTTPS.
            </p>
          </div>
          <form onSubmit={saveSection} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                ID
                <input required pattern="[a-z0-9-]+" value={editorialForm.id}
                  disabled={Boolean(selectedSectionId)}
                  onChange={(event) => setEditorialForm({ ...editorialForm, id: event.target.value })}
                  className="mt-1 w-full rounded border p-2 font-normal" />
              </label>
              <label className="text-sm font-semibold">
                Page key
                <select required value={editorialForm.page_key}
                  onChange={(event) => setEditorialForm({ ...editorialForm, page_key: event.target.value })}
                  className="mt-1 w-full rounded border p-2 font-normal">
                  {EDITORIAL_PAGE_KEYS.map((pageKey) => (
                    <option key={pageKey} value={pageKey}>{pageKey}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block text-sm font-semibold">
              Section title
              <input required value={editorialForm.title}
                onChange={(event) => setEditorialForm({ ...editorialForm, title: event.target.value })}
                className="mt-1 w-full rounded border p-2 font-normal" />
            </label>
            <div className="flex flex-wrap items-center gap-5">
              <label className="text-sm font-semibold">
                Sort order
                <input required type="number" value={editorialForm.sort_order}
                  onChange={(event) => setEditorialForm({ ...editorialForm, sort_order: event.target.value })}
                  className="ml-2 w-24 rounded border p-2 font-normal" />
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={editorialForm.published}
                  onChange={(event) => setEditorialForm({ ...editorialForm, published: event.target.checked })} />
                Published
              </label>
            </div>
            <label className="block text-sm font-semibold">
              Content JSON
              <textarea required rows={16} value={editorialForm.content}
                onChange={(event) => setEditorialForm({ ...editorialForm, content: event.target.value })}
                className="mt-1 w-full rounded border p-3 font-mono text-xs font-normal" />
            </label>
            {editorialError && <p role="alert" className="text-sm text-red-700">{editorialError}</p>}
            {editorialMessage && <p role="status" className="text-sm text-green-700">{editorialMessage}</p>}
            <div className="flex flex-wrap gap-3">
              <button disabled={isPending} className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                {isPending ? "Saving…" : "Save section"}
              </button>
              {selectedSectionId && (
                <button type="button" disabled={isPending} onClick={removeSection}
                  className="rounded-lg border-2 border-red-700 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50">
                  Delete section
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
        <h2 className="font-display text-xl font-bold">Transport datasets</h2>
        <p className="mt-1 text-sm text-gray-600">
          These JSON datasets power the transport overview, rail, BRT and ferry pages. Keep the existing field shape when editing routes, fares, stations or timetables.
        </p>
        {datasets.length === 0 ? (
          <p className="mt-4 text-sm text-amber-800">
            No transport datasets are in Supabase yet. Apply the migrations and run the database seed before editing.
          </p>
        ) : (
          <form onSubmit={saveTransport} className="mt-5 space-y-3">
            <label className="block text-sm font-semibold">
              Dataset
              <select value={transportId} onChange={(event) => chooseTransport(event.target.value)}
                className="ml-2 rounded border p-2 font-normal">
                {datasets.map((dataset) => <option key={dataset.id} value={dataset.id}>{dataset.id}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Dataset JSON
              <textarea required rows={20} value={transportJson}
                onChange={(event) => setTransportJson(event.target.value)}
                className="mt-1 w-full rounded border p-3 font-mono text-xs font-normal" />
            </label>
            {transportError && <p role="alert" className="text-sm text-red-700">{transportError}</p>}
            {transportMessage && <p role="status" className="text-sm text-green-700">{transportMessage}</p>}
            <button disabled={isPending} className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
              Save transport dataset
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
