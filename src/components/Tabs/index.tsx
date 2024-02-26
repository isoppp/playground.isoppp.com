import { createContext, FC, ReactNode, useState } from 'react'

type Context = {
  selectedValue: string
  onChangeValue: (value: string) => void
}
const { Consumer, Provider } = createContext<Context>({
  selectedValue: '',
  onChangeValue: () => {},
})

type ContentProps = {
  children: ReactNode
  value: string
}

export const Content: FC<ContentProps> = ({ children, value }) => {
  return (
    <Consumer>
      {({ selectedValue }) => {
        if (value !== selectedValue) return null
        return children
      }}
    </Consumer>
  )
}

type TriggerProps = {
  children: FC<{ onClick: () => void; isActive: boolean }>
  value: string
}

export const Trigger: FC<TriggerProps> = ({ children, value }) => {
  return (
    <Consumer>
      {({ onChangeValue, selectedValue }) => {
        return children({
          isActive: value === selectedValue,
          onClick: () => onChangeValue(value),
        })
      }}
    </Consumer>
  )
}

type ControlledTabsProps = {
  children: ReactNode

  value: string
  onChangeValue: (value: string) => void

  defaultValue?: undefined
}

type UnControlledTabsProps = {
  children: ReactNode

  defaultValue: string

  value?: undefined
  onChangeValue?: undefined
}
type TabsProps = ControlledTabsProps | UnControlledTabsProps
export const Root: FC<TabsProps> = ({ children, value, onChangeValue, defaultValue }) => {
  const [innerValue, setInnerValue] = useState(defaultValue ?? '')
  return (
    <Provider
      value={{
        selectedValue: value ?? innerValue,
        onChangeValue: onChangeValue ?? setInnerValue,
      }}
    >
      {children}
    </Provider>
  )
}

export const Tabs = {
  Root,
  Trigger,
  Content,
}
