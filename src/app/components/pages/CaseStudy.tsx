import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { getCaseStudy, type WorkEntry } from "../../data/work";
import { NotFound } from "./NotFound";

const fields: { key: "problem" | "role" | "decision" | "shipped"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "role", label: "My role" },
  { key: "decision", label: "Decision" },
  { key: "shipped", label: "What shipped or changed" },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Results({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map((r) => (
        <div key={r} className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
          <CheckCircle className="text-[#1fa2ff] flex-shrink-0 mt-0.5" size={20} />
          <span className="text-sm">{r}</span>
        </div>
      ))}
    </div>
  );
}

// Single-story case study: result first, then the narrative, with the decision given extra weight.
function FullEntry({ entry }: { entry: WorkEntry }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Result</h2>
        <Results items={entry.result} />
      </div>
      <dl className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-7">
        {fields.map(({ key, label }) =>
          key === "decision" ? (
            <div key={key} className="border-l-2 border-[#1fa2ff] pl-5 -ml-1">
              <dt className="text-[#1fa2ff] mb-2">{label}</dt>
              <dd className="text-lg">{entry[key]}</dd>
            </div>
          ) : (
            <div key={key}>
              <dt className="mb-2">{label}</dt>
              <dd className="text-muted-foreground">{entry[key]}</dd>
            </div>
          ),
        )}
      </dl>
    </div>
  );
}

// One of several initiatives: result leads, then a compact two-column narrative with quiet labels.
function CompactEntry({ entry, index }: { entry: WorkEntry; index: number }) {
  return (
    <article
      id={entry.heading ? slugify(entry.heading) : undefined}
      className="bg-card border border-border rounded-lg p-6 sm:p-8 scroll-mt-24"
    >
      <p className="text-xs text-muted-foreground mb-1">Initiative {index + 1}</p>
      <h2 className="text-xl mb-5">{entry.heading}</h2>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Result</p>
        <Results items={entry.result} />
      </div>
      <dl className="grid md:grid-cols-2 gap-x-8 gap-y-5">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</dt>
            <dd className="text-sm">{entry[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function CaseStudy() {
  const { slug = "" } = useParams();
  const study = getCaseStudy(slug);
  if (!study) return <NotFound />;

  const multi = study.entries.length > 1;

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-[#1fa2ff] mb-8 hover:gap-2 transition-all"
          >
            <ArrowLeft size={16} />
            All work
          </Link>
          <h1 className="mb-2">{study.title}</h1>
          <p className="text-muted-foreground mb-6">{study.org}</p>
          {study.note && <p className="text-muted-foreground mb-8">{study.note}</p>}

          {multi && (
            <nav aria-label="Initiatives" className="mb-10 border border-border rounded-lg divide-y divide-border">
              {study.entries.map((e) => (
                <a
                  key={e.heading}
                  href={`#${slugify(e.heading ?? "")}`}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-5 py-3 hover:bg-accent/50 transition-colors"
                >
                  <span>{e.heading}</span>
                  <span className="text-sm text-muted-foreground">{e.keyResult}</span>
                </a>
              ))}
            </nav>
          )}

          <div className="space-y-8">
            {study.entries.map((entry, i) =>
              multi ? (
                <CompactEntry key={entry.heading} entry={entry} index={i} />
              ) : (
                <FullEntry key={study.slug} entry={entry} />
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
