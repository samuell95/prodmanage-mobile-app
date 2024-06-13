import { ReactNode } from 'react'
import { TextInput, TextInputProps, View, ViewProps } from 'react-native'

type Props = ViewProps & {
  children: ReactNode
}

function Input({ children, ...rest }: Props) {
  return (
    <View
      className="h-12 p-3 flex-row items-center rounded-lg border border-gray-600 focus:border-blue-600"
      {...rest}
    >
      {children}
    </View>
  )
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput className="flex-1 text-white text-base font-body" {...rest} />
  )
}

Input.Field = Field

export { Input }
