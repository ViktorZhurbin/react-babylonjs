import { Panels } from '../Panels/Panels'
import { ControlPanel } from '../ControlPanel/ControlPanel'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { MonacoEditor } from '../MonacoEditor/MonacoEditor'
import { useFiles } from '../../context/Files'
import { LayoutContainer } from '../LayoutContainer/LayoutContainer'

export const PlaygroundMain = () => {
  const [language, setLanguage] = useLocalStorageLanguage()

  const files = useFiles()

  return (
    <LayoutContainer>
      <ControlPanel setLanguage={setLanguage} />

      <Panels files={files[language]} editor={<MonacoEditor />} />
    </LayoutContainer>
  )
}
