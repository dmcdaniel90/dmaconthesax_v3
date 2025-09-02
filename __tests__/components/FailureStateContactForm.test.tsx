import React from 'react'
import { render, screen } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import FailureStateContactForm from '@/app/contact/FailureStateContactForm'

describe('FailureStateContactForm', () => {
  const mockReset = jest.fn()
  const mockForm = {
    reset: mockReset
  } as any

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders failure message and icon', () => {
    render(<FailureStateContactForm form={mockForm} />)

    expect(screen.getByText('Oops, Something went wrong!')).toBeInTheDocument()
    expect(screen.getByText(/There was a problem sending your message/)).toBeInTheDocument()
  })

  it('renders failure icon with correct styling', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const failureIcon = screen.getByTestId('failure-icon')
    expect(failureIcon).toBeInTheDocument()
    expect(failureIcon).toHaveClass('text-red-400')
  })

  it('renders "Try Again" button', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()
  })

  it('calls reset function when button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<FailureStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /try again/i })
    await user.click(button)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('renders contact email link', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const emailLink = screen.getByRole('link', { name: /contact@devinmcdaniel\.com/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@devinmcdaniel.com')
  })

  it('has correct styling classes on failure message', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const failureMessage = screen.getByText('Oops, Something went wrong!')
    expect(failureMessage).toHaveClass('text-2xl', 'text-red-400', 'py-7')
  })

  it('has correct styling classes on description text', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const description = screen.getByText(/There was a problem sending your message/)
    expect(description).toHaveClass('text-gray-500', 'md:px-3')
  })

  it('has correct styling classes on button', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toHaveClass('mt-8', 'mb-4', 'w-full', 'bg-red-600', 'text-white')
  })

  it('renders with proper layout structure', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const container = screen.getByText('Oops, Something went wrong!').parentElement
    expect(container).toHaveClass('h-full', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center')
  })

  it('has proper accessibility attributes on button', () => {
    render(<FailureStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toHaveAttribute('aria-label', 'Try again')
    expect(button).toHaveAttribute('tabIndex', '0')
  })
})
