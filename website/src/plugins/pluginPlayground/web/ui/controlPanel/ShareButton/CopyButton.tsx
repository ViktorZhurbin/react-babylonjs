import { useClipboard } from '@mantine/hooks'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import clsx from 'clsx'
import { useIsSmallScreen } from '../../../context/Layout'
import { useSnippetId } from '../../../hooks/location'
import { Button } from '../../components/Button/Button'
import styles from './CopyButton.module.css'

export const CopyButton = () => {
  const smallScreen = useIsSmallScreen()
  const snippetId = useSnippetId()
  const clipboard = useClipboard({ timeout: 1000 })

  const onClick = () => {
    console.log(window.location.href)
    clipboard.copy(window.location.href)
  }

  const classes = clsx(styles.button, {
    [styles.isCopied]: clipboard.copied,
  })

  const getText = (text: string) => (smallScreen ? null : <span>{text}</span>)

  return (
    snippetId && (
      <Button title="Copy link" onClick={onClick} className={classes}>
        <span className={styles.copy}>
          <IconCopy /> {getText('Copy link')}
        </span>
        <span className={styles.copied}>
          <IconCheck /> {getText('Copied!')}
        </span>
      </Button>
    )
  )
}
