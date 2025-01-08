import clsx from 'clsx'
import { RoundedButton } from '@codesandbox/sandpack-react'
import styles from './ToggleButtonGroup.module.css'

type ToggleButtonGroupProps<T> = {
  values: T[]
  activeValue: T
  setValue: (value: T) => void
}

export const ToggleButtonGroup = <T extends string>(props: ToggleButtonGroupProps<T>) => {
  const { values, setValue, activeValue } = props

  return (
    <div className={styles.wrapper}>
      {values.map((value) => {
        const className = clsx(styles.button, { [styles.isActive]: value === activeValue })

        return (
          <RoundedButton key={value} className={className} onClick={() => setValue(value)}>
            {value}
          </RoundedButton>
        )
      })}
    </div>
  )
}
