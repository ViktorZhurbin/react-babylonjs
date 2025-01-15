import { useLocalStorage } from '@mantine/hooks'
import { Language } from '@pluginPlayground/shared/constants'
import { LocalStorage, View } from '../constants'
import { useFilesContext } from '../context/Files'

export const useLocalStorageView = () => {
  return useLocalStorage({
    key: LocalStorage.View,
    defaultValue: View.Preview,
  })
}

export const useLocalStorageLanguage = () => {
  const { language, setLanguage } = useFilesContext()

  return [language, setLanguage] as const
}
