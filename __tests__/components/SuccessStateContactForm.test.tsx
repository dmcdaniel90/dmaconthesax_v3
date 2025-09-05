import React from 'react'
import { render, screen } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import SuccessStateContactForm from '@/app/contact/SuccessStateContactForm'

describe('SuccessStateContactForm', () => {
  const mockReset = jest.fn()
  const mockForm = {
    reset: mockReset
  } as any

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders success message and icon', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument()
    expect(screen.getByText("Thanks for your message! We'll get back to you within 24-48 hours.")).toBeInTheDocument()
  })

  it('renders success icon with correct styling', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    const successIcon = screen.getByTestId('success-icon')
    expect(successIcon).toBeInTheDocument()
    expect(successIcon).toHaveClass('text-green-600')
  })

  it('renders "Send Another Message" button', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /send another message/i })
    expect(button).toBeInTheDocument()
  })

  it('calls reset function when button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<SuccessStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /send another message/i })
    await user.click(button)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('has correct styling classes on success message', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    const successMessage = screen.getByText('Message Sent Successfully!')
    expect(successMessage).toHaveClass('py-5', 'text-2xl', 'text-green-700')
  })

  it('has correct styling classes on description text', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    const description = screen.getByText("Thanks for your message! We'll get back to you within 24-48 hours.")
    expect(description).toHaveClass('text-gray-500', 'md:px-3')
  })

  it('has correct styling classes on button', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    const button = screen.getByRole('button', { name: /send another message/i })
    expect(button).toHaveClass('mt-8', 'mb-4', 'w-full', 'bg-[#02ACAC]', 'text-white')
  })

  it('renders with proper layout structure', () => {
    render(<SuccessStateContactForm form={mockForm} />)

    const container = screen.getByText('Message Sent Successfully!').parentElement
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'text-center')
  })
})
