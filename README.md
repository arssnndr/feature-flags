# Feature Flag Demo Application

A modern Angular application demonstrating feature flag management and A/B testing capabilities using [GrowthBook](https://www.growthbook.io/). This project showcases how to implement dynamic feature toggles, remote configuration, and experimentation without deploying new code.

## 🎯 Overview

This demo application illustrates real-world feature flag patterns including:

- **Dynamic Hero Variants** - Switch between "Studio" and "Launch" hero layouts remotely
- **Conditional Feature Rendering** - Show/hide Quick Actions and Testimonials sections
- **Real-time Updates** - Auto-refresh flags every 30 seconds from GrowthBook CDN
- **Multiple Page Examples** - Dashboard, Profile, Notifications, and Settings pages with flag-controlled visibility
- **Fallback Handling** - Graceful degradation when flags are unavailable

## 🛠️ Tech Stack

- **Framework**: Angular 21.0.0 (standalone components)
- **Feature Flags**: GrowthBook SDK 1.6.4
- **Package Manager**: Bun 1.3.5
- **State Management**: Angular Signals
- **Styling**: SCSS with custom design system
- **Testing**: Vitest 4.0.8
- **Build Tool**: Angular CLI 21.0.4

## 📋 Prerequisites

- Node.js 18+ or Bun 1.3.5+
- A GrowthBook account (optional - demo works with included SDK key)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd feature-flags

# Install dependencies
bun install
# or
npm install
```

### Configuration

The application is pre-configured with a demo GrowthBook client key. To use your own:

1. Create a free account at [GrowthBook](https://www.growthbook.io/)
2. Create a new project and get your SDK client key
3. Update `src/app/growthbook.config.ts`:

```typescript
export const growthbookConfig = {
  apiHost: 'https://cdn.growthbook.io',
  clientKey: 'YOUR_CLIENT_KEY_HERE', // Replace with your key
  refreshIntervalMs: 30000,
  timeoutMs: 2000,
  devMode: true
};
```

### Development Server

```bash
# Start the development server
bun start
# or
npm start
```

Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

## 📱 Application Structure

### Routes

- **`/`** (Home) - Main landing page with feature flag console
- **`/dashboard`** - Analytics dashboard (can be flag-controlled)
- **`/profile`** - User profile page with activity feed
- **`/notifications`** - Notification center with real-time updates badge
- **`/settings`** - Application settings panel

All routes use lazy loading for optimal performance.

### Feature Flags

The application demonstrates three feature flags:

| Flag Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `hero_variant` | `string` | `'studio'` | Controls hero section layout ('studio' or 'launch') |
| `quick_actions` | `boolean` | `false` | Shows/hides Quick Actions section on home page |
| `show_testimonials` | `boolean` | `false` | Shows/hides Testimonials section on home page |

Configure these flags in your GrowthBook dashboard to see real-time changes.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.routes.ts             # Route definitions
│   ├── app.config.ts             # Application configuration
│   ├── feature-flags.ts          # Feature flag type definitions
│   ├── growthbook.config.ts      # GrowthBook configuration
│   ├── growthbook.service.ts     # GrowthBook service wrapper
│   ├── home/                     # Home page component
│   ├── dashboard/                # Dashboard page component
│   ├── profile/                  # Profile page component
│   ├── notifications/            # Notifications page component
│   └── settings/                 # Settings page component
├── index.html                    # HTML entry point
├── main.ts                       # Application bootstrap
└── styles.scss                   # Global styles
```

## 📜 Available Scripts

```bash
# Development
bun start           # Start dev server
bun run watch       # Build in watch mode

# Production
bun run build       # Build for production

# Testing
bun test            # Run unit tests

# Code Generation
ng generate component <name>    # Generate new component
ng generate service <name>      # Generate new service
```

## 🎨 Key Features

### GrowthBook Integration

The `GrowthbookService` provides a reactive interface to feature flags:

```typescript
// Check if a feature is enabled
const isEnabled = growthbook.isOn('feature_key', false);

// Get feature value with fallback
const variant = growthbook.featureValue('hero_variant', 'studio');

// Refresh flags manually
await growthbook.refreshFeatures();
```

### Signal-Based Reactivity

All components use Angular signals for optimal performance:

```typescript
readonly heroVariant = computed(() =>
  this.growthbook.featureValue('hero_variant', featureDefaults.hero_variant)
);
```

### Automatic Refresh

Feature flags are automatically refreshed every 30 seconds, keeping the UI in sync with remote configuration changes without requiring a page reload.

## 🧪 Testing

```bash
# Run tests
bun test

# Run tests in watch mode
bun test --watch
```

## 📦 Building for Production

```bash
# Build optimized bundle
bun run build

# Output will be in dist/feature-flags/browser/
```

## 🔧 Development Best Practices

- **Standalone Components**: All components are standalone (no NgModules)
- **OnPush Change Detection**: Optimized performance with OnPush strategy
- **Lazy Loading**: All routes are lazy-loaded
- **Type Safety**: Full TypeScript strict mode enabled
- **Signals**: Modern reactive state management with Angular signals
- **SCSS**: Component-scoped styles with global design tokens

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [GrowthBook Documentation](https://docs.growthbook.io)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Feature Flag Best Practices](https://docs.growthbook.io/app/features)

## 📄 License

This project is open source and available for educational purposes.
