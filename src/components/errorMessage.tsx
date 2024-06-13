import React from 'react'
import { View, Text, ViewProps } from 'react-native'

type ErrorMessageProps = ViewProps & {
  message?: string | undefined
}

export function ErrorMessage({ message, ...rest }: ErrorMessageProps) {
  return (
    <View
      testID="error-message-container"
      className="w-full my-1"
      style={{ height: message ? undefined : 0 }}
      {...rest}
    >
      <Text className="text-red-600">{message}</Text>
    </View>
  )
}
