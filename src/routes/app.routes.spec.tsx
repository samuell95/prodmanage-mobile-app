import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'

describe('AppRoutes', () => {
  it('renderiza a tela inicial por padrão', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>,
    )

    expect(getByTestId('home-screen')).toBeTruthy()
  })

  it('não renderiza as telas de edição ou detalhes na barra de navegação', () => {
    const { queryByTestId } = render(
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>,
    )

    expect(queryByTestId('edit-product-tab')).toBeNull()
    expect(queryByTestId('details-product-tab')).toBeNull()
  })
})
