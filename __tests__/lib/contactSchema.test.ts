import { contactFormSchema } from '@/lib/contactSchema'

describe('contactFormSchema', () => {
  const validContactData = {
    from_name: "Contact Form",
    subject: "Test Subject",
    name: "John Doe",
    email: "john@example.com",
    message: "This is a detailed message that meets the minimum length requirement of twenty characters.",
    botcheck: false
  }

  describe('valid data', () => {
    it('accepts valid contact form data', () => {
      const result = contactFormSchema.safeParse(validContactData)
      expect(result.success).toBe(true)
    })

    it('accepts data with longer message', () => {
      const dataWithLongMessage = {
        ...validContactData,
        message: "This is a very detailed message that exceeds the minimum requirement and provides comprehensive information about the inquiry."
      }
      
      const result = contactFormSchema.safeParse(dataWithLongMessage)
      expect(result.success).toBe(true)
    })

    it('accepts data with botcheck true', () => {
      const dataWithBotcheckTrue = {
        ...validContactData,
        botcheck: true
      }
      
      const result = contactFormSchema.safeParse(dataWithBotcheckTrue)
      expect(result.success).toBe(true)
    })
  })

  describe('name validation', () => {
    it('rejects name that is too short', () => {
      const invalidData = {
        ...validContactData,
        name: "J"
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        const nameError = result.error.issues.find(issue => issue.path.includes('name'))
        expect(nameError).toBeDefined()
        expect(nameError?.message).toBe("Name must be at least 2 characters long")
      }
    })

    it('rejects empty name', () => {
      const invalidData = {
        ...validContactData,
        name: ""
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('accepts name with exactly 2 characters', () => {
      const validData = {
        ...validContactData,
        name: "Jo"
      }
      
      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('email validation', () => {
    it('rejects invalid email format', () => {
      const invalidData = {
        ...validContactData,
        email: "invalid-email"
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        const emailError = result.error.issues.find(issue => issue.path.includes('email'))
        expect(emailError).toBeDefined()
        expect(emailError?.message).toBe("Invalid email address")
      }
    })

    it('rejects email without @ symbol', () => {
      const invalidData = {
        ...validContactData,
        email: "johnexample.com"
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects email without domain', () => {
      const invalidData = {
        ...validContactData,
        email: "john@"
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('accepts valid email formats', () => {
      const validEmails = [
        "john@example.com",
        "john.doe@example.co.uk",
        "john+tag@example.org",
        "john123@example-domain.com"
      ]
      
      validEmails.forEach(email => {
        const data = { ...validContactData, email }
        const result = contactFormSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('message validation', () => {
    it('rejects message that is too short', () => {
      const invalidData = {
        ...validContactData,
        message: "Too short"
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        const messageError = result.error.issues.find(issue => issue.path.includes('message'))
        expect(messageError).toBeDefined()
        expect(messageError?.message).toBe("Message must be at least 20 characters long")
      }
    })

    it('rejects empty message', () => {
      const invalidData = {
        ...validContactData,
        message: ""
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('accepts message with exactly 20 characters', () => {
      const validData = {
        ...validContactData,
        message: "Exactly twenty chars!"
      }
      
      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('required fields', () => {
    it('requires from_name field', () => {
      const { from_name, ...invalidData } = validContactData
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('requires subject field', () => {
      const { subject, ...invalidData } = validContactData
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('requires name field', () => {
      const { name, ...invalidData } = validContactData
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('requires email field', () => {
      const { email, ...invalidData } = validContactData
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('requires message field', () => {
      const { message, ...invalidData } = validContactData
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('requires botcheck field', () => {
      const { botcheck, ...invalidData } = validContactData
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('type validation', () => {
    it('rejects non-string from_name', () => {
      const invalidData = {
        ...validContactData,
        from_name: 123
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects non-string subject', () => {
      const invalidData = {
        ...validContactData,
        subject: true
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects non-string name', () => {
      const invalidData = {
        ...validContactData,
        name: 456
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects non-string email', () => {
      const invalidData = {
        ...validContactData,
        email: null
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects non-string message', () => {
      const invalidData = {
        ...validContactData,
        message: undefined
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects non-boolean botcheck', () => {
      const invalidData = {
        ...validContactData,
        botcheck: "true"
      }
      
      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
