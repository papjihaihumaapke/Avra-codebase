import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

export { site } from './content/site'
export { allRoutes, metaFor, notFoundMeta } from './content/meta'
export { jsonLdFor } from './content/seo'
export { sortedPosts, postModified, plain } from './content/blog'
export { projects } from './content/work'
export { services } from './content/site'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
