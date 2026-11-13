import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { TLink } from '../components/Transition'
import { WorkCard } from '../components/WorkCard'
import { featuredProjects, projects } from '../content/work'

/** Home page teaser: six featured projects in a uniform grid. */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel index="03" className="col-span-12 md:col-span-4">
            Work
          </SectionLabel>
          <div className="col-span-12 flex flex-wrap items-end justify-between gap-6 md:col-span-8">
            <div>
              <MaskLines as="h2" id="work-title" className="t-headline" lines={['Selected work.']} />
              <p className="muted mt-5 max-w-[44ch]">
                Websites, identities and campaign creative for local businesses and growing brands.
              </p>
            </div>
            <TLink to="/work" className="link-arrow">
              All {projects.length} projects <Arrow />
            </TLink>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-[var(--grid-gap)] gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-y-16">
          {featuredProjects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} delay={(i % 3) * 80} />
          ))}
        </ul>
      </div>
    </section>
  )
}
