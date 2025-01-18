import { useMediaQuery } from '@mantine/hooks'

export const useDark = () => {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  return Boolean(isDark)
}
