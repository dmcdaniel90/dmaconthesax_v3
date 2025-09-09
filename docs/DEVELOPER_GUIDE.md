# Developer Guide

This comprehensive guide will help new developers understand, set up, and contribute to the DMAC on the Sax website codebase.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Architecture](#project-architecture)
3. [Development Setup](#development-setup)
4. [Code Patterns & Conventions](#code-patterns--conventions)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [API Integration](#api-integration)
8. [Testing Strategy](#testing-strategy)
9. [Performance Considerations](#performance-considerations)
10. [Common Tasks](#common-tasks)
11. [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 20.x or higher
- **pnpm**: 8.x or higher (preferred package manager)
- **Git**: Latest version
- **VS Code**: Recommended IDE with extensions

### Essential VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### 5-Minute Setup
```bash
# Clone and setup
git clone <repository-url>
cd dmaconthesax_v3
pnpm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with your Cloudinary credentials

# Start development
pnpm dev
```

## 🏗️ Project Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **Media**: Cloudinary integration
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library
- **Package Manager**: pnpm

### Directory Structure
```
dmaconthesax_v3/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   ├── contexts/          # React contexts
│   ├── layout/            # Layout components
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── *.tsx             # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── __tests__/            # Test files
├── docs/                 # Documentation
└── public/               # Static assets
```

### Key Architectural Decisions

#### 1. **App Router Pattern**
- Uses Next.js 15 App Router for file-based routing
- Server and Client Components clearly separated
- API routes in `app/api/` directory

#### 2. **Component Composition**
- Atomic design principles
- Compound components for complex UI
- Custom hooks for business logic

#### 3. **Performance-First**
- Cloudinary for media optimization
- Lazy loading and code splitting
- Performance monitoring in development

## 🛠️ Development Setup

### Environment Variables
Create `.env.local` with:
```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dllh8yqz8
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret

# Development
NODE_ENV=development
```

### Development Commands
```bash
# Development server with Turbopack
pnpm dev

# Type checking
pnpm type-check

# Linting with auto-fix
pnpm lint:fix

# Testing
pnpm test:watch

# Build for production
pnpm build

# Clean build artifacts
pnpm clean
```

### Git Workflow
```bash
# Feature development
git checkout -b feature/your-feature-name
# Make changes
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Create PR to develop branch
```

## 📝 Code Patterns & Conventions

### TypeScript Conventions

#### Interface Naming
```typescript
// Component props
interface ComponentNameProps {
  title: string;
  isVisible?: boolean;
  onAction?: () => void;
}

// API responses
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Form schemas
interface FormData {
  name: string;
  email: string;
}
```

#### File Naming
- **Components**: `PascalCase.tsx` (e.g., `PhotoGallery.tsx`)
- **Hooks**: `camelCase.tsx` (e.g., `useBookingForm.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `cloudinary.ts`)
- **Types**: `camelCase.ts` (e.g., `types.ts`)

### React Patterns

#### Component Structure
```typescript
'use client' // Only when needed

import { useState, useEffect } from 'react';
import { ComponentProps } from './types';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ 
  title, 
  onAction 
}: MyComponentProps) {
  // Hooks
  const [state, setState] = useState('');
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleClick = () => {
    onAction?.();
  };
  
  // Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}
```

#### Custom Hooks Pattern
```typescript
import { useState, useEffect } from 'react';

interface UseCustomHookReturn {
  data: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCustomHook(): UseCustomHookReturn {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      // API call
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return { data, loading, error, refetch: fetchData };
}
```

### Styling Conventions

#### Tailwind CSS Classes
```typescript
// Responsive design
className="w-full md:w-1/2 lg:w-1/3"

// State variants
className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}

// Conditional styling
className={cn(
  "flex items-center justify-center",
  variant === "primary" && "bg-blue-500 text-white",
  variant === "secondary" && "bg-gray-500 text-white"
)}
```

#### CSS Custom Properties
```css
/* app/globals.css */
:root {
  --primary-color: #02ACAC;
  --secondary-color: #ffffff;
  --background-color: #1a1a1a;
}
```

## 🧩 Component Architecture

### Component Hierarchy

#### 1. **Layout Components**
- `app/layout.tsx` - Root layout with providers
- `app/layout/Header.tsx` - Navigation header
- `app/layout/Footer.tsx` - Site footer

#### 2. **Page Components**
- `app/page.tsx` - Home page
- `app/about/page.tsx` - About page
- `app/contact/page.tsx` - Contact page

#### 3. **Feature Components**
- `components/SwiperPhotoGallery.tsx` - Advanced image gallery with PhotoSwipe lightbox
- `components/SwiperVideoPlayer.tsx` - Video player with Swiper.js integration
- `components/EventList.tsx` - Event listings

#### 4. **UI Components**
- `components/ui/button.tsx` - Button component
- `components/ui/card.tsx` - Card component
- `components/ui/input.tsx` - Input component

### Component Patterns

#### Swiper-Based Components
```typescript
// components/SwiperPhotoGallery.tsx
export default function SwiperPhotoGallery({
  images = [],
  useCloudinary = false,
  cloudinaryTag = 'photo-gallery',
  isGridView = false,
  onGridViewToggle
}: SwiperPhotoGalleryProps) {
  // Advanced gallery with PhotoSwipe lightbox integration
  // Supports both carousel and grid views
  // Includes pagination and smooth transitions
}

// components/SwiperVideoPlayer.tsx
export default function SwiperVideoPlayer({
  videos,
  cloudName = 'dllh8yqz8',
  isGridView = false,
  onGridViewToggle
}: SwiperVideoPlayerProps) {
  // Video player with Swiper.js integration
  // Supports both carousel and grid views
  // Includes fullscreen support for mobile/tablet
}

// Usage
<SwiperPhotoGallery 
  useCloudinary={true}
  cloudinaryTag="photo-gallery"
  isGridView={isGridView}
  onGridViewToggle={() => setIsGridView(!isGridView)}
/>
```

#### Render Props Pattern
```typescript
interface DataProviderProps {
  children: (data: any) => React.ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const data = useCustomHook();
  return <>{children(data)}</>;
}

// Usage
<DataProvider>
  {(data) => <div>{data.title}</div>}
</DataProvider>
```

## 🔄 State Management

### Context Pattern
```typescript
// app/contexts/HeaderContext.tsx
interface HeaderContextType {
  state: {
    activeLink: string;
  };
  dispatch: (action: Action) => void;
}

const HeaderContext = createContext<HeaderContextType | null>(null);

export const HeaderProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HeaderContext.Provider value={{ state, dispatch }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within HeaderProvider");
  }
  return context;
};
```

### Local State Patterns
```typescript
// Form state with React Hook Form
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    name: '',
    email: ''
  }
});

// Async state with custom hook
const { data, loading, error } = useCloudinaryCollection('photos');

// UI state
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
```

## 🌐 API Integration

### Cloudinary Integration
```typescript
// lib/cloudinary.ts
export const getOptimizedImageUrl = (publicId: string, options: ImageOptions) => {
  const transformations = [
    `w_${options.width}`,
    `h_${options.height}`,
    'q_auto',
    'f_auto'
  ].join(',');
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};

// hooks/useCloudinaryCollection.tsx
export function useCloudinaryCollection(tag: string) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchCloudinaryAssets(tag)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [tag]);
  
  return { data, loading, error };
}
```

### API Routes
```typescript
// app/api/cloudinary/search/route.ts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    
    const result = await cloudinary.search
      .expression(`tags:${tag}`)
      .execute();
    
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

## 🧪 Testing Strategy

### Testing Patterns
```typescript
// __tests__/components/SwiperPhotoGallery.test.tsx
import { render, screen } from '@testing-library/react';
import SwiperPhotoGallery from '@/components/SwiperPhotoGallery';

describe('SwiperPhotoGallery', () => {
  it('renders gallery with images', () => {
    const mockImages = ['image1.jpg', 'image2.jpg'];
    render(<SwiperPhotoGallery images={mockImages} />);
    
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  
  it('handles empty state', () => {
    render(<SwiperPhotoGallery images={[]} />);
    expect(screen.getByText('No photos available')).toBeInTheDocument();
  });
  
  it('toggles between grid and carousel view', () => {
    const mockToggle = jest.fn();
    render(<SwiperPhotoGallery images={[]} onGridViewToggle={mockToggle} />);
    
    const toggleButton = screen.getByRole('button', { name: /grid view/i });
    toggleButton.click();
    expect(mockToggle).toHaveBeenCalled();
  });
});
```

### Hook Testing
```typescript
// __tests__/hooks/useBookingForm.test.tsx
import { renderHook } from '@testing-library/react';
import { useBookingForm } from '@/hooks/useBookingForm';

describe('useBookingForm', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useBookingForm());
    
    expect(result.current.form.getValues('name')).toBe('');
    expect(result.current.isSuccess).toBe(false);
  });
});
```

## ⚡ Performance Considerations

### Code Splitting
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

### Image Optimization
```typescript
// Using Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Memoization
```typescript
// Memoizing expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Memoizing callbacks
const handleClick = useCallback(() => {
  onAction(id);
}, [id, onAction]);
```

## 🔧 Common Tasks

### Adding a New Page
1. Create page file: `app/new-page/page.tsx`
2. Add navigation link in `app/layout/Header.tsx`
3. Update routing if needed
4. Add tests in `__tests__/`

### Creating a New Component
1. Create component file: `components/NewComponent.tsx`
2. Define TypeScript interface
3. Implement component logic
4. Add to component exports
5. Create tests
6. Update documentation

### Adding a New Hook
1. Create hook file: `hooks/useNewHook.tsx`
2. Define return type interface
3. Implement hook logic
4. Add error handling
5. Create tests
6. Document usage

### Integrating with Cloudinary
1. Add public ID to Cloudinary
2. Create API route if needed: `app/api/cloudinary/.../route.ts`
3. Create custom hook: `hooks/useCloudinary...`
4. Use in components
5. Add error handling and fallbacks

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
pnpm clean
rm -rf .next
pnpm install
pnpm build
```

#### TypeScript Errors
```bash
# Check types
pnpm type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

#### Cloudinary Issues
- Check API credentials in `.env.local`
- Verify public IDs exist in Cloudinary
- Check network requests in browser dev tools
- Review fallback URLs

#### Performance Issues
- Check bundle size: `pnpm build:analyze`
- Review Core Web Vitals in dev tools
- Check for memory leaks in components
- Verify lazy loading is working

### Debug Mode
```typescript
// Enable debug logging
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Debug info:', data);
}
```

### Getting Help
1. Check existing documentation in `/docs`
2. Review component tests for usage examples
3. Check GitHub issues
4. Ask team members
5. Create new issue with reproduction steps

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Last Updated**: December 2024  
**Maintained By**: Development Team
