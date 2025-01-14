import clsx from 'clsx'
import { useFullscreenProps } from '../../context/Layout'
import styles from './LayoutContainer.module.css'

export const LayoutContainer = (props: { children: React.ReactNode }) => {
  const { fullscreen } = useFullscreenProps()

  const classes = clsx(styles.layout, {
    [styles.fullscreen]: fullscreen,
  })

  return <div className={classes}>{props.children}</div>
}
