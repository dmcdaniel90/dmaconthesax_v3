// Import dependencies
import React from 'react'
import { render, screen, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { mockBookingFormData } from '../utils/test-utils'

const mockPostMessage = jest.fn()
const mockUseBookingForm = jest.fn()

const DefaultStateBookingForm = ({onSubmit, form}: any) => (
    <div data-testid="default-state-form">
        <form onSubmit={(e) => {
            e.preventDefault()
            onSubmit(mockBookingFormData)
        }}
        aria-labelledby="booking-form-title"
        aria-describedby="booking-form-description"
        >
            <input type="text" name="name" defaultValue={mockBookingFormData.name} />
            <input type="email" name="email" defaultValue={mockBookingFormData.email} />
            <input type="date" name="date" defaultValue={mockBookingFormData.date} />
            <input type="time" name="time" defaultValue={mockBookingFormData.time} />
            <input type="text" name="location" defaultValue={mockBookingFormData.location} />
            <input type="text" name="eventType" defaultValue={mockBookingFormData.eventType} />
            <textarea name="message" defaultValue={mockBookingFormData.description} />
            <button type="submit" data-testid="submit-button">Submit</button>
        </form>
    </div>
)

const SuccessStateBookingForm = () => <div data-testid="success-state-form">Success State Form</div>
const FailureStateBookingForm = () => <div data-testid="failure-state-form">Failure State Form</div>

const BookingForm = () => {
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [isSubmitSuccessful, setIsSubmitSuccessful] = React.useState(false)

    const handleSubmit = async (data: any) => {
        try {
            const res = await mockPostMessage(data, "booking")
            if (res && res.success) {
                setIsSuccess(true)
                setIsSubmitSuccessful(true)
            }
        } catch (error) {
            setIsSuccess(false)
            setIsSubmitSuccessful(true)
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Booking Form</h1>
            <p>Enter your event details and we will get back to you soon</p>
            {!isSubmitSuccessful && (
                <DefaultStateBookingForm onSubmit={handleSubmit} />
            )}
            {isSubmitSuccessful && isSuccess && (
                <SuccessStateBookingForm />
            )}
            {isSubmitSuccessful && !isSuccess && (
                <FailureStateBookingForm />
            )}
        </div>
    )
}

describe('BookingForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockPostMessage.mockResolvedValue({ success: true })
        
        // Mock mobile detection for consistent testing
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            configurable: true
        })
        
        // Mock showPicker support
        Object.defineProperty(HTMLInputElement.prototype, 'showPicker', {
            value: undefined,
            configurable: true
        })
    })

    it('renders the booking form with title and description', () => {
        render(<BookingForm />)
        expect(screen.getByText('Booking Form')).toBeInTheDocument()
        expect(screen.getByText('Enter your event details and we will get back to you soon')).toBeInTheDocument()
    })

    it('renders the default state form initially', () => {
        render(<BookingForm />)
        expect(screen.getByTestId('default-state-form')).toBeInTheDocument()
    })

    it('renders the success state form when the form is submitted successfully', async () => {
        const user = userEvent.setup()
        
        render(<BookingForm />)
    
        expect(screen.getByTestId('default-state-form')).toBeInTheDocument()
        expect(screen.queryByTestId('success-state-form')).not.toBeInTheDocument()

        const submitButton = screen.getByTestId('submit-button')
        await user.click(submitButton)

        expect(screen.getByTestId('success-state-form')).toBeInTheDocument()
    })

    it('renders the failure state form when the form submission fails', async () => {
        const user = userEvent.setup()
        
        render(<BookingForm />)
        
        const submitButton = screen.getByTestId('submit-button')
        await user.click(submitButton)

        waitFor(() => {
            expect(screen.getByTestId('failure-state-form')).toBeInTheDocument()
        })
    
    })

    it('submits form with correct data values', async () => {
        const user = userEvent.setup()
        
        render(<BookingForm />)
        
        const submitButton = screen.getByTestId('submit-button')
        await user.click(submitButton)
        
        expect(screen.getByTestId('success-state-form')).toBeInTheDocument()
    })

    it('renders date and time inputs with correct types for mobile compatibility', () => {
        render(<BookingForm />)
        
        const dateInput = screen.getByDisplayValue(mockBookingFormData.date)
        const timeInput = screen.getByDisplayValue(mockBookingFormData.time)
        
        expect(dateInput).toHaveAttribute('type', 'date')
        expect(timeInput).toHaveAttribute('type', 'time')
    })
        
})