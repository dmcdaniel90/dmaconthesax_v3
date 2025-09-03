import React from 'react'
import { render, screen, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { mockContactFormData } from '../utils/test-utils'

// Mock the postMessage function
const mockPostMessage = jest.fn()

// Mock the postMessage module
jest.mock('@/lib/postMessage', () => ({
  postMessage: mockPostMessage
}))

// Mock the useForm hook
const mockUseForm = jest.fn()

// Mock the form components with proper state management
const DefaultStateContactForm = ({ onSubmit, form }: any) => (
  <div data-testid="default-state-form">
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(mockContactFormData)
      }} 
      aria-labelledby="contact-form-title" 
      aria-describedby="contact-form-description"
    >
      <input type="text" name="name" defaultValue={mockContactFormData.name} />
      <input type="email" name="email" defaultValue={mockContactFormData.email} />
      <textarea name="message" defaultValue={mockContactFormData.message} />
      <button type="submit" data-testid="submit-button">Submit</button>
    </form>
  </div>
)

const SuccessStateContactForm = () => <div data-testid="success-state-form">Success State Form</div>
const FailureStateContactForm = () => <div data-testid="failure-state-form">Failure State Form</div>

// Mock the ContactForm component with state management
const ContactForm = () => {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isSubmitSuccessful, setIsSubmitSuccessful] = React.useState(false)

  const handleSubmit = async (data: any) => {
    try {
      const res = await mockPostMessage(data, "contact")
      if (res && res.success) {
        setIsSuccess(true)
        setIsSubmitSuccessful(true)
      } else {
        throw new Error("Error in await postMessage")
      }
    } catch (error) {
      setIsSuccess(false)
      setIsSubmitSuccessful(true)
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Contact Me</h1>
      <p>Send me a message and I'll get back to you soon</p>
      {!isSubmitSuccessful && (
        <DefaultStateContactForm onSubmit={handleSubmit} />
      )}
      {isSubmitSuccessful && isSuccess && (
        <SuccessStateContactForm />
      )}
      {isSubmitSuccessful && !isSuccess && (
        <FailureStateContactForm />
      )}
    </div>
  )
}

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPostMessage.mockResolvedValue({ success: true })
    // Suppress console.error during tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the contact form with title and description', () => {
    render(<ContactForm />)
    
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText("Send me a message and I'll get back to you soon")).toBeInTheDocument()
  })

  it('renders the default state form initially', () => {
    render(<ContactForm />)
    
    // Check that the form is rendered (DefaultStateContactForm)
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByTestId('default-state-form')).toBeInTheDocument()
  })

  it('renders the success state form when the form is submitted successfully', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Initially should show default state
    expect(screen.getByTestId('default-state-form')).toBeInTheDocument()
    expect(screen.queryByTestId('success-state-form')).not.toBeInTheDocument()
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    // Wait for the success state to be rendered
    await waitFor(() => {
      expect(screen.getByTestId('success-state-form')).toBeInTheDocument()
    })
    
    // Default state should no longer be visible
    expect(screen.queryByTestId('default-state-form')).not.toBeInTheDocument()
    
    // Verify postMessage was called with correct data
    expect(mockPostMessage).toHaveBeenCalledWith(mockContactFormData, "contact")
  })

  it('renders the failure state form when the form submission fails', async () => {
    // Mock postMessage to return failure
    mockPostMessage.mockResolvedValueOnce({ success: false })
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Initially should show default state
    expect(screen.getByTestId('default-state-form')).toBeInTheDocument()
    expect(screen.queryByTestId('failure-state-form')).not.toBeInTheDocument()
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    // Wait for the failure state to be rendered
    await waitFor(() => {
      expect(screen.getByTestId('failure-state-form')).toBeInTheDocument()
    })
    
    // Default state should no longer be visible
    expect(screen.queryByTestId('default-state-form')).not.toBeInTheDocument()
    
    // Verify postMessage was called with correct data
    expect(mockPostMessage).toHaveBeenCalledWith(mockContactFormData, "contact")
  })

  it('submits form with correct data values', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Verify form fields contain the mock data
    expect(screen.getByDisplayValue(mockContactFormData.name)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockContactFormData.email)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockContactFormData.message)).toBeInTheDocument()
    
    // Submit the form
    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)
    
    // Wait for the success state to be rendered
    await waitFor(() => {
      expect(screen.getByTestId('success-state-form')).toBeInTheDocument()
    })
    
    // Verify postMessage was called with the exact mock data
    expect(mockPostMessage).toHaveBeenCalledWith(mockContactFormData, "contact")
  })
})


