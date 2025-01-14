import { useLocation, useSearchParams } from 'rspress/runtime'
import { SearchParams } from '../constants'

export const usePlaygroundId = () => {
  const [searchParams] = useSearchParams()

  return searchParams.get(SearchParams.PgId)
}

export const useIsPlayground = () => {
  const { pathname } = useLocation()

  return pathname.endsWith('/playground')
}

export const usePlayground = () => {
  const isPlayground = useIsPlayground()
  const pgId = usePlaygroundId()

  return { isPlayground, pgId }
}
