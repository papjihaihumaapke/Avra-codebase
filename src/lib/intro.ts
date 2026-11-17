/**
 * Intro gate: the preloader resolves this once it lifts, so the hero can time its
 * entrance to the reveal. If no preloader runs, it resolves right away.
 */
let resolveIntro: () => void = () => {}
let done = false

export const introDone: Promise<void> =
  typeof window === 'undefined'
    ? Promise.resolve()
    : new Promise((r) => {
        resolveIntro = () => {
          done = true
          r()
        }
      })

export function finishIntro() {
  if (!done) resolveIntro()
}

export function introFinished() {
  return done
}
