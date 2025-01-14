import { useLocation, useSearchParams } from 'rspress/runtime'
import { SearchParams } from '../constants'

export const usePlaygroundId = () => {
  const [searchParams] = useSearchParams()

  return searchParams.get(SearchParams.PgId)
}

export const useIsPlaygroundPage = () => {
  const { pathname } = useLocation()

  return pathname.endsWith('/playground')
}

export const usePlayground = () => {
  const isPlayground = useIsPlaygroundPage()
  const pgId = usePlaygroundId()

  return { isPlayground, pgId }
}
