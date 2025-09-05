import { renderHook } from '@testing-library/react'
import { useBookingForm, formSchema } from '@/hooks/useBookingForm'
import '@testing-library/jest-dom'

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  useWatch: jest.fn()
}))

describe('useBookingForm', () => {
  const mockUseForm = jest.requireActual('react-hook-form').useForm

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns form, isSuccess, and setIsSuccess', () => {
    const mockForm = {
      formState: { errors: {} },
      register: jest.fn(),
      handleSubmit: jest.fn(),
      watch: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
      setError: jest.fn(),
      clearErrors: jest.fn(),
      reset: jest.fn(),
      control: {},
      trigger: jest.fn(),
      resetField: jest.fn(),
      setFocus: jest.fn(),
      getFieldState: jest.fn()
    }

    mockUseForm.mockReturnValue(mockForm)

    const { result } = renderHook(() => useBookingForm())

    expect(result.current.form).toBeDefined()
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.setIsSuccess).toBeDefined()
  })

  it('initializes with correct default values', () => {
    const mockForm = {
      formState: { errors: {} },
      register: jest.fn(),
      handleSubmit: jest.fn(),
      watch: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
      setError: jest.fn(),
      clearErrors: jest.fn(),
      reset: jest.fn(),
      control: {},
      trigger: jest.fn(),
      resetField: jest.fn(),
      setFocus: jest.fn(),
      getFieldState: jest.fn()
    }

    mockUseForm.mockReturnValue(mockForm)

    renderHook(() => useBookingForm())

    expect(mockUseForm).toHaveBeenCalledWith({
      resolver: expect.any(Function),
      defaultValues: {
        from_name: "Booking Request",
        name: "",
        email: "",
        date: "",
        time: "",
        location: "",
        eventType: "",
        message: "",
        consent: undefined,
        botcheck: undefined
      }
    })
  })

  it('initializes isSuccess as false', () => {
    const mockForm = {
      formState: { errors: {} },
      register: jest.fn(),
      handleSubmit: jest.fn(),
      watch: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
      setError: jest.fn(),
      clearErrors: jest.fn(),
      reset: jest.fn(),
      control: {},
      trigger: jest.fn(),
      resetField: jest.fn(),
      setFocus: jest.fn(),
      getFieldState: jest.fn()
    }

    mockUseForm.mockReturnValue(mockForm)

    const { result } = renderHook(() => useBookingForm())

    expect(result.current.isSuccess).toBe(false)
  })
})

describe('formSchema validation', () => {
  it('validates required fields correctly', () => {
    const validData = {
      from_name: "Booking Request",
      subject: "Test Subject",
      name: "John Doe",
      email: "john@example.com",
      date: "2024-12-25",
      time: "14:00",
      location: "Studio A",
      eventType: "Lesson",
      message: "This is a detailed description of the event that meets the minimum length requirement",
      consent: true,
      botcheck: false,
      cc_email: "cc@example.com"
    }

    const result = formSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email format', () => {
    const invalidData = {
      from_name: "Booking Request",
      subject: "Test Subject",
      name: "John Doe",
      email: "invalid-email",
      date: "2024-12-25",
      time: "14:00",
      location: "Studio A",
      eventType: "Lesson",
      message: "This is a detailed description of the event that meets the minimum length requirement",
      consent: true,
      botcheck: false
    }

    const result = formSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.includes('email'))).toBe(true)
    }
  })

  it('rejects name that is too short', () => {
    const invalidData = {
      from_name: "Booking Request",
      subject: "Test Subject",
      name: "J",
      email: "john@example.com",
      date: "2024-12-25",
      time: "14:00",
      location: "Studio A",
      eventType: "Lesson",
      message: "This is a detailed description of the event that meets the minimum length requirement",
      consent: true,
      botcheck: false
    }

    const result = formSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.includes('name'))).toBe(true)
    }
  })

  it('rejects message that is too short', () => {
    const invalidData = {
      from_name: "Booking Request",
      subject: "Test Subject",
      name: "John Doe",
      email: "john@example.com",
      date: "2024-12-25",
      time: "14:00",
      location: "Studio A",
      eventType: "Lesson",
      message: "Too short",
      consent: true,
      botcheck: false
    }

    const result = formSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.includes('message'))).toBe(true)
    }
  })

  it('rejects when consent is not given', () => {
    const invalidData = {
      from_name: "Booking Request",
      subject: "Test Subject",
      name: "John Doe",
      email: "john@example.com",
      date: "2024-12-25",
      time: "14:00",
      location: "Studio A",
      eventType: "Lesson",
      message: "This is a detailed description of the event that meets the minimum length requirement",
      consent: false,
      botcheck: false
    }

    const result = formSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.includes('consent'))).toBe(true)
    }
  })
})
