/**
 * One place to register GSAP plugins (all free since GSAP 3.13).
 * Import { gsap, ScrollTrigger, SplitText, Observer } from here, never from 'gsap' directly,
 * so every plugin is registered exactly once before use.
 */
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Observer, CustomEase)
  // Phones resize the viewport as the address bar shows/hides; don't recalculate every trigger for that.
  ScrollTrigger.config({ ignoreMobileResize: true })
  // A long, confident settle — the house ease for big type.
  CustomEase.create('avra', 'M0,0 C0.16,1 0.3,1 1,1')
  CustomEase.create('avraInOut', 'M0,0 C0.76,0 0.24,1 1,1')
}

export { gsap, ScrollTrigger, SplitText, Observer }
