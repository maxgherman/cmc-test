import '@testing-library/jest-dom'
import { render, screen } from '@src/test/utils'
import { Checkout } from '.'
import { MemoryRouter } from 'react-router-dom'
import { CartContext } from '@src/context/cart-context'

describe('checkout', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <CartContext.Provider value={{
          cart: {
            id: '123',
            items: [{
              id: '567',
              name: 'product 1',
              price: 11.78,
              totalPrice: 11.78,
              quantity: 1,
              currency: 'AUD'
            }],
            totalItems: 1,
            total: 100,
            totalShipping: 20,
            currency: 'AUD'
          },
          setCart: () => {}
        }}>
          <Checkout/>
        </CartContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getAllByText('Checkout')).toHaveLength(2)
  })
})