import { About } from '../sections/About'
import { Clients } from '../sections/Clients'
import { FeaturedCase } from '../sections/FeaturedCase'
import { FinalCta } from '../sections/FinalCta'
import { Hero } from '../sections/Hero'
import { KineticBand } from '../sections/KineticBand'
import { Manifesto } from '../sections/Manifesto'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'
import { Why } from '../sections/Why'
import { Work } from '../sections/Work'

export function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Manifesto />
      <Services />
      <FeaturedCase />
      <Process />
      <Work />
      <KineticBand />
      <Why />
      <About teaser />
      <FinalCta />
    </>
  )
}
