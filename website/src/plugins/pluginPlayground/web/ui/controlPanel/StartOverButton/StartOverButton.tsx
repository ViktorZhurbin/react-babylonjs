import { IconFile } from '@tabler/icons-react'
import { useSearchParams } from 'rspress/runtime'
import { SearchParams } from '../../../constants'
import { useFilesContext } from '../../../context/Files'
import { useIsSmallScreen } from '../../../context/Layout'
import { useSnippetId } from '../../../hooks/location'
import { Button } from '../../components/Button/Button'

export const StartOverButton = () => {
  const smallScreen = useIsSmallScreen()
  const snippetId = useSnippetId()
  const [searchParams, setSearchParams] = useSearchParams()

  const { setInitialFiles } = useFilesContext()

  const onClick = () => {
    const confirmed = confirm('Are you sure you want to create a new playground?')

    if (confirmed) {
      const params = searchParams
      params.delete(SearchParams.SnippetId)

      setSearchParams(params)
      setInitialFiles()
    }
  }

  return (
    snippetId && (
      <Button title="Create new" onClick={onClick}>
        <IconFile /> {smallScreen ? null : <span>New</span>}
      </Button>
    )
  )
}
