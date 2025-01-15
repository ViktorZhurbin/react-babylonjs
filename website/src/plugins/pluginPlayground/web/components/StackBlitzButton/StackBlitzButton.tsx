import { IconExternalLink } from '@tabler/icons-react'
import { Button } from '../Button/Button'
import StackBlitzSDK from '@stackblitz/sdk'
import { useCurrentFiles } from '../../hooks/useCurrentFiles'
import { getCraTemplateFiles } from './templates/cra'
import { useFilesContext } from '../../context/Files'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { EntryFiles } from '../../../shared/constants'

export const StackBlitzButton = () => {
  const { currentFiles } = useCurrentFiles()
  const { dependencies } = useFilesContext()
  const [language] = useLocalStorageLanguage()

  const appFileName = EntryFiles[language]
  const templateFiles = getCraTemplateFiles({ appFileName })

  const onClick = () => {
    StackBlitzSDK.openProject(
      {
        files: {
          ...templateFiles,
          ...currentFiles,
        },
        title: 'react-babylonjs',
        template: 'node',
      },
      {
        newWindow: true,
        openFile: appFileName,
      }
    )
  }

  return (
    <Button onClick={onClick}>
      <IconExternalLink />
      <span>Stackblitz</span>
    </Button>
  )
}
