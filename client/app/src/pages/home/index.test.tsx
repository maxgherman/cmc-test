import '@testing-library/jest-dom'
import { render, screen } from '@src/test/utils'
import { Home } from '.'
import type { API } from '@src/back-end'
import { APIContext } from '@src/context/api-context'

const api = {
    getProducts() {
        return Promise.resolve({
            success: true,
            data: [{
                id: '123',
                name: 'test',
                quantity: 15
            }]
        })
    }
} as API;

describe('product-row', () => {
  it('renders', () => {
      render(
        <APIContext.Provider value={api}>
            <Home/>
        </APIContext.Provider>
      )

      expect(screen.getByText('Products')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Quantity')).toBeInTheDocument()
      expect(screen.getByText('Add to cart')).toBeInTheDocument()
  })
})