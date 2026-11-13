import { About } from '../sections/About'
import { Clients } from '../sections/Clients'
import { FinalCta } from '../sections/FinalCta'
import { Hero } from '../sections/Hero'
import { Manifesto } from '../sections/Manifesto'
import { Process } from '../sections/Process'
import { Services } from '../sections/Services'
import { Why } from '../sections/Why'
import { Work } from '../sections/Work'

export function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <Process />
      <Work />
      <Clients />
      <Why />
      <About teaser />
      <FinalCta />
    </>
  )
}
