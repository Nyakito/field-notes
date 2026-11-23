import { useMemo, useState } from "react";
import { project } from "./data.js";
import {
  filterRecords,
  loadRecords,
  performRecordAction,
} from "./services/challenge.js";

function RecordCard({ record, saved, onSave }) {
  return (
    <article className="record-card">
      <div
        className="record-image"
        style={{ backgroundImage: `url(${record.image})` }}
        aria-hidden="true"
      >
        <span className="record-category">{record.category}</span>

        <button
          className={`save-button${saved ? " is-saved" : ""}`}
          type="button"
          aria-label={saved ? `Unsave ${record.title}` : `Save ${record.title}`}
          onClick={() => onSave(record.id)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.2 4.7 13a4.6 4.6 0 0 1 6.5-6.5L12 7.3l.8-.8a4.6 4.6 0 0 1 6.5 6.5L12 20.2Z" />
          </svg>
        </button>
      </div>

      <div className="record-copy">
        <p className="record-meta">{record.meta}</p>
        <h2>{record.title}</h2>
        <p className="record-description">{record.description}</p>

        <a
          className="text-action"
          href={record.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [records, setRecords] = useState(project.records);
  const [visibleRecords, setVisibleRecords] = useState(project.records);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All records");
  const [saved, setSaved] = useState([]);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [activeView, setActiveView] = useState("records");

  const categories = useMemo(
    () => [
      "All records",
      ...new Set(project.records.map((record) => record.category)),
    ],
    [],
  );

  function showError(error) {
    setNotice(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
    );
  }

  function handleFilter(nextCategory, nextQuery = query) {
    try {
      const filtered = filterRecords({
        records,
        query: nextQuery,
        category: nextCategory,
      });

      if (!Array.isArray(filtered)) {
        throw new TypeError("filterRecords must return an array of records.");
      }

      setActiveView("records");
      setCategory(nextCategory);
      setQuery(nextQuery);
      setVisibleRecords(filtered);
      setNotice("");
    } catch (error) {
      showError(error);
    }
  }

  async function handleSearch() {
    setBusy(true);

    try {
      const result = await loadRecords({ query, category });

      if (!Array.isArray(result)) {
        throw new TypeError("Expected an array of records.");
      }

      setVisibleRecords(result);
      setActiveView("records");
      setNotice(
        result.length === 0
          ? "No records found. Try another search."
          : `${result.length} records found.`,
      );
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  }

  async function handleSave(recordId) {
    try {
      const isSaved = saved.includes(recordId);

      const result = await performRecordAction({
        recordId,
        action: isSaved ? "unsave" : "save",
      });

      if (typeof result?.message !== "string") {
        throw new TypeError("The action response must include a message.");
      }

      setSaved((current) =>
        isSaved
          ? current.filter((id) => id !== recordId)
          : [...current, recordId],
      );

      if (activeView === "saved" && isSaved) {
        setVisibleRecords((current) =>
          current.filter((record) => record.id !== recordId),
        );
      }

      setNotice(result.message);
    } catch (error) {
      showError(error);
    }
  }

  function handleShowRecords(event) {
    event.preventDefault();

    setActiveView("records");

    const filtered = filterRecords({
      records,
      query,
      category,
    });

    setVisibleRecords(filtered);
    setNotice("");
  }

  function handleShowSaved(event) {
    event.preventDefault();

    setActiveView("saved");

    const savedPlaces = records.filter((record) => saved.includes(record.id));

    setVisibleRecords(savedPlaces);
    setNotice(`${savedPlaces.length} saved places.`);
  }

  async function handleAction(recordId, action) {
    setBusy(true);

    try {
      const result = await performRecordAction({ recordId, action });

      if (typeof result?.message !== "string") {
        throw new TypeError("The action response must include a message.");
      }

      setNotice(result.message);
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={`app-shell project-01 layout-${project.layout}`}>
      <aside className="side-rail">
        <a className="brand" href="#home" aria-label={`${project.name} home`}>
          <span className="brand-mark" aria-hidden="true">
            {project.name.slice(0, 1)}
          </span>
          <span>{project.name}</span>
        </a>

        <p className="rail-label">WORKSPACE</p>

        <nav aria-label="Main navigation" className="main-nav">
          <a
            className={`nav-link${activeView === "records" ? " is-current" : ""}`}
            href="#records"
            aria-current={activeView === "records" ? "page" : undefined}
            onClick={handleShowRecords}
          >
            <span className="nav-dot" />
            Places
          </a>

          <a
            className={`nav-link${activeView === "saved" ? " is-current" : ""}`}
            href="#saved"
            aria-current={activeView === "saved" ? "page" : undefined}
            onClick={handleShowSaved}
          >
            Saved items
          </a>

          <a className="nav-link" href="#about">
            Guide notes
          </a>
        </nav>

        <div className="rail-note">
          <span className="status-dot" />
          Notes By You <span>for you</span>
        </div>
      </aside>

      <section className="workspace" id="home">
        <header className="topbar">
          <p>{project.label}</p>

          <button
            className="quiet-button"
            type="button"
            disabled={busy}
            onClick={() => handleAction("new", "create")}
          >
            + {project.action}
          </button>
        </header>

        <div className="intro" id="about">
          <div>
            <h1>{project.headline}</h1>
            <p className="intro-copy">{project.subtitle}</p>
          </div>

          <p className="collection-note">
            PERSONAL COLLECTION<span>·</span> Places I could think of
          </p>
        </div>

        <div className="toolbar" id="records">
          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>

            <span className="sr-only">Search records</span>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder="Search this collection"
            />
            <button type="button" disabled={busy} onClick={handleSearch}>
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All records");
                setActiveView("records");
                setVisibleRecords(records);
                setNotice("");
              }}
            >
              Clear
            </button>
          </label>

          <div className="filters" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip${category === item ? " is-active" : ""}`}
                aria-pressed={category === item}
                onClick={() => handleFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {notice && (
          <p className={`notice${busy ? " is-busy" : ""}`} role="status">
            {busy ? "Working…" : notice}

            <button
              type="button"
              aria-label="Dismiss message"
              onClick={() => setNotice("")}
            >
              ×
            </button>
          </p>
        )}

        <section className="record-grid" aria-label={`${project.name} records`}>
          {visibleRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              saved={saved.includes(record.id)}
              onSave={handleSave}
            />
          ))}

          {visibleRecords.length === 0 && (
            <p className="empty-state">
              {activeView === "saved"
                ? "You haven't saved any places yet."
                : "No records match this view. Try a different search."}
            </p>
          )}
        </section>

        <footer className="page-footer">
          <span>{project.name}</span>
          <span>
            With Optimism· <a href="">NYAKITO</a>
          </span>
        </footer>
      </section>
    </main>
  );
}
