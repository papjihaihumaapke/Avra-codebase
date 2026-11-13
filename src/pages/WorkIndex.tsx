import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { WorkCard } from '../components/WorkCard'
import { categories, projects, type Category } from '../content/work'
import { FinalCta } from '../sections/FinalCta'

const slugOf = (c: Category) => c.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '')

export function WorkIndex() {
  const [params, setParams] = useSearchParams()
  const active = categories.find((c) => slugOf(c) === params.get('type')) ?? null
  const list = active ? projects.filter((p) => p.category === active) : projects

  const select = (c: Category | null) => {
    const next = new URLSearchParams(params)
    if (c) next.set('type', slugOf(c))
    else next.delete('type')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const chip = (label: string, count: number, isActive: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
        isActive ? 'border-graphite bg-graphite text-paper' : 'border-shadow bg-bone hover:border-stone'
      }`}
    >
      {label}
      <span className={`font-mono text-[0.75rem] ${isActive ? 'text-paper/70' : 'text-stone-ink'}`}>{count}</span>
    </button>
  )

  return (
    <>
      <PageHeader
        label="Work"
        lines={['Work that', 'pays its way.']}
        lead="Websites, identities, social creative and product design for local businesses and growing brands."
      />

      <section aria-labelledby="projects-title" className="section relative pt-14 md:pt-20">
        <div className="shell">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          <div role="group" aria-label="Filter by category" className="hairline-t flex flex-wrap gap-2 pt-6">
            {chip('All', projects.length, !active, () => select(null))}
            {categories.map((c) =>
              chip(c, projects.filter((p) => p.category === c).length, active === c, () => select(c)),
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {list.length} projects{active ? ` in ${active}` : ''}
          </p>

          <ul
            key={active ?? 'all'}
            className="mt-12 grid grid-cols-1 gap-x-[var(--grid-gap)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16"
          >
            {list.map((p, i) => (
              <WorkCard key={p.slug} project={p} index={i} delay={(i % 3) * 60} />
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
