import { cn, upperFirst, splitWordsAndCapitalize, composeDateString } from '@/lib/utils'

describe('cn function', () => {
  it('combines class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional')
  })

  it('handles undefined and null values', () => {
    expect(cn('base', undefined, null, 'valid')).toBe('base valid')
  })

  it('handles empty strings', () => {
    expect(cn('base', '', 'valid')).toBe('base valid')
  })

  it('handles arrays of classes', () => {
    expect(cn('base', ['nested', 'classes'])).toBe('base nested classes')
  })

  it('handles objects with boolean values', () => {
    expect(cn('base', { conditional: true, hidden: false })).toBe('base conditional')
  })
})

describe('upperFirst function', () => {
  it('capitalizes first letter of string', () => {
    expect(upperFirst('hello')).toBe('Hello')
  })

  it('handles single character', () => {
    expect(upperFirst('a')).toBe('A')
  })

  it('handles empty string', () => {
    expect(upperFirst('')).toBe('')
  })

  it('handles already capitalized string', () => {
    expect(upperFirst('Hello')).toBe('Hello')
  })

  it('handles string with numbers', () => {
    expect(upperFirst('123abc')).toBe('123abc')
  })
})

describe('splitWordsAndCapitalize function', () => {
  it('splits hyphenated words and capitalizes each', () => {
    expect(splitWordsAndCapitalize('hello-world')).toBe('Hello World')
  })

  it('handles single word', () => {
    expect(splitWordsAndCapitalize('hello')).toBe('Hello')
  })

  it('handles multiple hyphens', () => {
    expect(splitWordsAndCapitalize('hello-world-test')).toBe('Hello World Test')
  })

  it('handles empty string', () => {
    expect(splitWordsAndCapitalize('')).toBe('')
  })

  it('handles string with no hyphens', () => {
    expect(splitWordsAndCapitalize('hello-world')).toBe('Hello World')
  })

  it('handles mixed case input', () => {
    expect(splitWordsAndCapitalize('HELLO-world-TEST')).toBe('HELLO World TEST')
  })
})

describe('composeDateString function', () => {
  it('creates correct date string for valid inputs', () => {
    // Mock Date.toLocaleDateString to return consistent output
    const mockDate = new Date(2024, 0, 15) // January 15, 2024
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
    
    expect(composeDateString(1, 15, 2024)).toBe('15/01/2024')
    
    jest.restoreAllMocks()
  })

  it('handles string month input', () => {
    const mockDate = new Date(2024, 5, 20) // June 20, 2024
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
    
    expect(composeDateString('6', 20, 2024)).toBe('20/06/2024')
    
    jest.restoreAllMocks()
  })

  it('handles edge case months', () => {
    const mockDate = new Date(2024, 11, 31) // December 31, 2024
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
    
    expect(composeDateString(12, 31, 2024)).toBe('31/12/2024')
    
    jest.restoreAllMocks()
  })

  it('handles leap year', () => {
    const mockDate = new Date(2024, 1, 29) // February 29, 2024 (leap year)
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
    
    expect(composeDateString(2, 29, 2024)).toBe('29/02/2024')
    
    jest.restoreAllMocks()
  })

  it('handles month conversion correctly', () => {
    // Month is 0-indexed in JavaScript Date constructor
    const mockDate = new Date(2024, 0, 1) // January 1, 2024
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any)
    
    expect(composeDateString(1, 1, 2024)).toBe('01/01/2024')
    
    jest.restoreAllMocks()
  })
})
