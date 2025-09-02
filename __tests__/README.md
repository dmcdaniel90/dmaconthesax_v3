# Testing Setup

This project uses Jest and React Testing Library for comprehensive testing of components, hooks, and utilities.

## Test Structure

```
__tests__/
├── components/          # Component tests
│   ├── ContactForm.test.tsx
│   ├── DefaultStateContactForm.test.tsx
│   ├── SuccessStateContactForm.test.tsx
│   └── FailureStateContactForm.test.tsx
├── hooks/              # Hook tests
│   └── useBookingForm.test.tsx
├── lib/                # Utility and schema tests
│   ├── utils.test.ts
│   └── contactSchema.test.ts
├── utils/              # Test utilities
│   └── test-utils.tsx
└── README.md           # This file
```

## Running Tests

### All Tests
```bash
pnpm test
```

### Watch Mode (Development)
```bash
pnpm test:watch
```

### Coverage Report
```bash
pnpm test:coverage
```

### CI Mode (No Watch)
```bash
pnpm test:ci
```

## Test Coverage

The testing setup includes coverage thresholds:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Testing Patterns

### Component Testing
- Test rendering of components
- Test user interactions
- Test accessibility attributes
- Test styling classes
- Test state changes

### Hook Testing
- Test return values
- Test initialization
- Test state updates
- Mock dependencies appropriately

### Schema Validation Testing
- Test valid data acceptance
- Test invalid data rejection
- Test error messages
- Test required fields
- Test type validation

### Utility Function Testing
- Test normal cases
- Test edge cases
- Test error handling
- Mock external dependencies

## Mocking Strategy

### Next.js Components
- `next/navigation` - Router functions
- `next/image` - Image component
- `next/link` - Link component

### External Libraries
- `react-hook-form` - Form management
- `@/lib/postMessage` - API calls

### Browser APIs
- `ResizeObserver`
- `matchMedia`

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Accessibility**: Ensure components are accessible and have proper ARIA attributes
4. **Mock Dependencies**: Mock external dependencies to isolate the unit under test
5. **Test Edge Cases**: Include tests for error states, loading states, and boundary conditions
6. **Keep Tests Simple**: Each test should test one specific behavior
7. **Use Descriptive Names**: Test names should clearly describe what is being tested

## Adding New Tests

### For Components
1. Create test file in `__tests__/components/`
2. Import component and test utilities
3. Mock external dependencies
4. Test rendering, interactions, and state changes
5. Test accessibility and styling

### For Hooks
1. Create test file in `__tests__/hooks/`
2. Use `renderHook` from testing library
3. Mock dependencies
4. Test return values and state changes

### For Utilities/Schemas
1. Create test file in `__tests__/lib/`
2. Test function behavior with various inputs
3. Test edge cases and error conditions
4. Mock external dependencies if needed

## Troubleshooting

### Common Issues

1. **Import Path Errors**: Ensure `@/*` paths are correctly configured in Jest config
2. **Mock Not Working**: Check that mocks are defined before imports
3. **TypeScript Errors**: Ensure test files use `.test.tsx` extension for React components
4. **Coverage Issues**: Check that files are included in coverage configuration

### Debug Mode
Run tests with verbose output:
```bash
pnpm test --verbose
```

## Dependencies

- **Jest**: Test runner and assertion library
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **@testing-library/user-event**: User interaction simulation
- **jest-environment-jsdom**: DOM environment for Jest
