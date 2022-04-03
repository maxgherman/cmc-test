import '@testing-library/jest-dom'
import { render, screen } from '@src/test/utils'
import { Layout } from './layout'
import { MemoryRouter } from 'react-router-dom'

describe('layout', () => {
  it('renders', () => {
    render(
    <MemoryRouter>
      <Layout>
        <span>Test</span>
      </Layout>
    </MemoryRouter>
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})