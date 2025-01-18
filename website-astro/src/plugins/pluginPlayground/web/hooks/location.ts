import { SearchParams } from '../constants'
import { useSearchParams } from './useSearchParams'

export const useSnippetId = () => {
  const [searchParams] = useSearchParams()

  return searchParams.get(SearchParams.SnippetId)
}

export const useIsPlaygroundPage = () => {
  return window.location.pathname.includes('/playground')
}
