import '@testing-library/jest-dom'
import { render, screen } from '@src/test/utils'
import { Header } from './header'
import { MemoryRouter } from 'react-router-dom'

describe('header', () => {
  it('renders', () => {
    render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})