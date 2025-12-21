# Project Structure

```
axiom-token-table/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── viewport.ts             # Viewport configuration
│   ├── config.ts               # App configuration
│   └── globals.css             # Global styles
│
├── components/
│   ├── atoms/                  # Basic UI components
│   │   ├── Badge.tsx          # Badge component with variants
│   │   ├── Button.tsx         # Reusable button with variants
│   │   ├── Modal.tsx          # Dialog/Modal component (Radix UI)
│   │   ├── Popover.tsx        # Popover component (Radix UI)
│   │   ├── Skeleton.tsx       # Loading skeleton components
│   │   └── Tooltip.tsx        # Tooltip component (Radix UI)
│   │
│   ├── molecules/              # Compound components
│   │   ├── PriceCell.tsx      # Price display with change indicator
│   │   ├── SortableHeader.tsx # Table header with sort controls
│   │   ├── Tabs.tsx           # Tab navigation component
│   │   ├── TokenDetailsModal.tsx  # Detailed token information modal
│   │   └── TokenInfoCell.tsx  # Token info with logo and actions
│   │
│   ├── organisms/              # Complex components
│   │   ├── ErrorBoundary.tsx  # Error boundary for error handling
│   │   └── TokenTable.tsx     # Main token table with sorting/filtering
│   │
│   └── templates/              # Page templates
│       └── TokenDiscoveryPage.tsx  # Main page template
│
├── lib/
│   ├── hooks/                  # Custom React hooks
│   │   ├── useMediaQuery.ts   # Responsive breakpoint hooks
│   │   ├── useTokens.ts       # React Query hook for tokens
│   │   └── useWebSocketPriceUpdates.ts  # WebSocket simulation hook
│   │
│   ├── providers/              # Context providers
│   │   └── QueryProvider.tsx  # React Query provider
│   │
│   ├── store/                  # Redux store
│   │   ├── index.ts           # Store configuration
│   │   ├── hooks.ts           # Typed Redux hooks
│   │   ├── StoreProvider.tsx  # Redux provider component
│   │   └── slices/
│   │       └── tokensSlice.ts # Tokens state management
│   │
│   ├── types/                  # TypeScript types
│   │   └── token.ts           # Token and related types
│   │
│   └── utils/                  # Utility functions
│       ├── cn.ts              # Class name utility
│       ├── format.ts          # Number/date formatting utilities
│       └── mockData.ts        # Mock data generation
│
├── public/                     # Static assets
│   └── assets/                # Images and other assets
│
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── DEPLOYMENT.md              # Deployment instructions
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # Project documentation
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── vercel.json                # Vercel deployment config
```

## Component Hierarchy

```
App
└── StoreProvider (Redux)
    └── QueryProvider (React Query)
        └── TokenDiscoveryPage
            ├── Search Input
            ├── Tabs
            │   ├── New Pairs Tab
            │   ├── Final Stretch Tab
            │   ├── Migrated Tab
            │   └── All Tab
            └── ErrorBoundary
                └── TokenTable
                    ├── Table Header
                    │   └── SortableHeader (×8 columns)
                    ├── Table Body
                    │   └── Token Row (×N)
                    │       ├── TokenInfoCell
                    │       │   ├── Logo
                    │       │   ├── Badge
                    │       │   └── Tooltip
                    │       ├── PriceCell
                    │       └── Other Cells
                    └── TokenDetailsModal
                        ├── Token Info
                        ├── Price Stats
                        ├── Contract Info
                        └── Actions
```

## State Management Flow

```
1. Data Fetching (React Query)
   useTokens() → Fetch mock data → Cache in React Query

2. Global State (Redux)
   React Query data → setTokens() → Redux Store
   
3. Local State Management
   Redux Store → useAppSelector() → Component
   User Actions → dispatch() → Redux Actions → State Update

4. Real-time Updates
   useWebSocketPriceUpdates() → dispatch(updateTokenPrice()) → Redux → Re-render
```

## Key Features

### Atomic Design Pattern
- **Atoms**: Basic building blocks (Button, Badge, Skeleton)
- **Molecules**: Combinations of atoms (PriceCell, TokenInfoCell)
- **Organisms**: Complex UI sections (TokenTable, ErrorBoundary)
- **Templates**: Page-level components (TokenDiscoveryPage)

### Performance Optimizations
- React.memo() on all components to prevent unnecessary re-renders
- Memoized selectors with useAppSelector
- Code splitting with Next.js App Router
- Optimized bundle with SWC compiler
- GPU-accelerated animations
- Lazy loading for heavy components

### Type Safety
- Strict TypeScript mode enabled
- Comprehensive type definitions
- Type-safe Redux hooks
- Validated prop types with TypeScript

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px+
- Different layouts for mobile (cards) and desktop (table)
- Touch-optimized interactions

### Accessibility
- Radix UI primitives (WCAG compliant)
- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader support

