import { act, renderHook } from '@testing-library/react-native'
import { api } from '../lib/api'
import { useProductStore } from './product-storage'
import { mockResponseProducts } from '../../tests/mocks/mockResponseProduct'

jest.mock('../lib/api')

describe('Stores: useProductStore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve adicionar um produto na memoria', () => {
    const { result } = renderHook(() => useProductStore())

    const product = {
      id: '1',
      category: 'Electronics',
      description: 'Smartphone',
      name: 'iPhone',
      price: '$999',
      stock: '10',
      createdAt: '2024-06-12',
      userId: '123',
    }

    act(() => {
      result.current.addProduct(product)
    })

    expect(result.current.products).toEqual([product])
  })

  it('deve buscar produtos com sucesso', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: [mockResponseProducts] })

    const { result } = renderHook(() => useProductStore())

    await act(async () => {
      await result.current.fetchProducts()
    })

    expect(result.current.products).toEqual([mockResponseProducts])
  })

  it('deve definir as informações do produto com sucesso', () => {
    const product = {
      id: '1',
      category: 'Electronics',
      description: 'Smartphone',
      name: 'iPhone',
      price: '$999',
      stock: '10',
      createdAt: '2024-06-12',
      userId: '123',
    }

    const { result } = renderHook(() => useProductStore())

    act(() => {
      result.current.setProductInfo(product)
    })

    expect(result.current.productInfo).toEqual(product)
  })
})
