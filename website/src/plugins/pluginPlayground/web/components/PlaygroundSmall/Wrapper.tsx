import { ControlPanel } from '../ControlPanel/ControlPanel'
import { CodeMirrorEditor } from '../CodeMirrorEditor/CodeMirrorEditor'
import { FilesEntry } from '../../../shared/types'
import { Panels } from '../Panels/Panels'
import { LayoutContainer } from '../LayoutContainer/LayoutContainer'
import { useSetLanguage } from './useSetLanguage'
import styles from './Wrapper.module.css'

type WrapperProps = {
  files: FilesEntry
}

export const Wrapper = (props: WrapperProps) => {
  const setLanguage = useSetLanguage()

  return (
    <LayoutContainer>
      <ControlPanel setLanguage={setLanguage} />

      <Panels files={props.files} editor={<CodeMirrorEditor className={styles.editor} />} />
    </LayoutContainer>
  )
}
