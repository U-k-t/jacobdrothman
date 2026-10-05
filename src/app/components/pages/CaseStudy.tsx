import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { getCaseStudy, type WorkEntry } from "../../data/work";
import { NotFound } from "./NotFound";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Text that still needs real content. Anything in "[Question: ...]" brackets is styled as a to-do.
export function Text({ children }: { children: string }) {
  const parts = children.split(/(\[Question:[^\]]*\])/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[Question") ? (
          <mark
            key={i}
            className="bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200 rounded px-1"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Results({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map((r) => (
        <div key={r} className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
          <CheckCircle className="text-[#1fa2ff] flex-shrink-0 mt-0.5" size={20} />
          <span className="text-sm">
            <Text>{r}</Text>
          </span>
        </div>
      ))}
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</h3>
      {children}
    </div>
  );
}

// The PM case-study structure: problem, role, learning, tradeoff, what I did, result, optional hindsight.
function EntryBody({ entry }: { entry: WorkEntry }) {
  return (
    <div className="space-y-7">
      <Section label="Problem">
        <p>
          <Text>{entry.problem}</Text>
        </p>
      </Section>

      <Section label="My role">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-[#1fa2ff] mb-1">I owned</p>
            <p className="text-sm">
              <Text>{entry.role.mine}</Text>
            </p>
          </div>
          {entry.role.team && (
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground mb-1">Team and others</p>
              <p className="text-sm text-muted-foreground">
                <Text>{entry.role.team}</Text>
              </p>
            </div>
          )}
        </div>
      </Section>

      <div className="border-l-2 border-[#1fa2ff] pl-5 -ml-1">
        <h3 className="text-xs uppercase tracking-wider text-[#1fa2ff] mb-2">
          {entry.decisionOnly ? "Key decision" : "Key decision / tradeoff"}
        </h3>
        <p className="text-lg">
          <Text>{entry.tradeoff}</Text>
        </p>
      </div>

      <Section label="What I did">
        <p className="text-muted-foreground">
          <Text>{entry.did}</Text>
        </p>
      </Section>

      <Section label="Result">
        <Results items={entry.result} />
      </Section>

      <Section label="What I learned">
        <p className="text-muted-foreground">
          <Text>{entry.learned}</Text>
        </p>
      </Section>

      {entry.differently && (
        <Section label="What I'd do differently">
          <p className="text-muted-foreground">
            <Text>{entry.differently}</Text>
          </p>
        </Section>
      )}
    </div>
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
            {study.entries.map((entry, i) => (
              <article
                key={entry.heading ?? study.slug}
                id={entry.heading ? slugify(entry.heading) : undefined}
                className="bg-card border border-border rounded-lg p-6 sm:p-8 scroll-mt-24"
              >
                {multi && (
                  <>
                    <p className="text-xs text-muted-foreground mb-1">Initiative {i + 1}</p>
                    <h2 className="text-xl mb-6">{entry.heading}</h2>
                  </>
                )}
                <EntryBody entry={entry} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
