import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { categories, projects, type Category } from '../content/work'
import { FinalCta } from '../sections/FinalCta'
import { WorkStack } from '../sections/WorkStack'

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
    <button key={label} type="button" aria-pressed={isActive} onClick={onClick} className="chip">
      {label}
      <sup>{count}</sup>
    </button>
  )

  return (
    <>
      <PageHeader
        label={`Work · ${projects.length} projects`}
        lines={['Selected', 'work']}
        accentFirst={false}
        lead="Websites, identities, social creative and product design for local businesses and growing brands."
      >
        <div role="group" aria-label="Filter by category" className="chips">
          {chip('All', projects.length, !active, () => select(null))}
          {categories.map((c) => chip(c, projects.filter((p) => p.category === c).length, active === c, () => select(c)))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {list.length} projects{active ? ` in ${active}` : ''}
        </p>
      </PageHeader>

      <WorkStack key={active ?? 'all'} projects={list} initialMode="grid" showAll={false} />
      <FinalCta />
    </>
  )
}
