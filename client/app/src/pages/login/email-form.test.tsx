import '@testing-library/jest-dom'
import { render, screen } from '@src/test/utils'
import { EmailForm } from './email-form'

describe('email-form', () => {
  it('renders', () => {
      render(<EmailForm disabled={false} onEmailSubmit={() => {}} />)

      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
      expect(screen.getByText('Email Login Link')).toBeInTheDocument()
  })
})
