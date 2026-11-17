import { Clients } from '../sections/Clients'
import { FeaturedSlider } from '../sections/FeaturedSlider'
import { Hero } from '../sections/Hero'
import { Statement } from '../sections/Statement'
import { Studio } from '../sections/Studio'
import { WordWall } from '../sections/WordWall'
import { WorkStack } from '../sections/WorkStack'

export function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <FeaturedSlider />
      <WorkStack />
      <Studio />
      <Clients />
      <WordWall />
    </>
  )
}
