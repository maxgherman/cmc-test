import '@testing-library/jest-dom'
import { render, screen } from '@src/test/utils'
import { ProductRow } from './product-row'

describe('product-row', () => {
  it('renders', () => {
    const { container } = render(<ProductRow product={
      {
        id: '123',
        name: 'test',
        quantity: 10
      }
    } addProduct={() => {}} />)

    expect(screen.getByText('test')).toBeInTheDocument()
    const input = container.querySelector('input');
    expect(input?.attributes?.getNamedItem('min')?.value).toBe('1')
    expect(input?.attributes?.getNamedItem('max')?.value).toBe('10')
    expect(input?.attributes?.getNamedItem('type')?.value).toBe('number')
    expect(screen.getByText('Add')).toBeInTheDocument()
  })
})