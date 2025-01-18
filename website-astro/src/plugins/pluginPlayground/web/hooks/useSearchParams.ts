import { useCallback } from 'react'

export const useSearchParams = () => {
  const params = new URLSearchParams(window.location.search)

  const setSearchParams = useCallback((params: Record<string, string> | URLSearchParams) => {
    const newParams = new URLSearchParams(params)

    window.location.search = newParams.toString()
  }, [])

  return [params, setSearchParams] as const
}
