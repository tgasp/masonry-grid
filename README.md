# Masonry Grid

A responsive photo gallery built with React and TypeScript that shows photos from Pexels API in a masonry layout.

## Live Demo

Check out the live demo: [https://masonry-grid.gasparyan.me/](https://masonry-grid.gasparyan.me/)

## Quick Start

1. Clone the repo
2. Install dependencies:
```bash
yarn install
```
3. Create a `.env` file with your Pexels API key:
```
VITE_PEXELS_API_KEY=your_key_here
```
4. Run the app:
```bash
yarn dev
```

## Build for Production
```bash
yarn build
yarn preview  # to test the build
```

## Design Decisions

### Virtualized Masonry Grid

I built a custom virtualization solution that only renders photos visible in the viewport. This makes the app super fast even with hundreds of photos because:

- It calculates positions for all photos but only renders what you can see
- As you scroll, it adds and removes photos from the DOM
- It keeps a small buffer of off-screen photos for smooth scrolling

This approach is much more efficient than libraries that render everything at once.

https://github.com/user-attachments/assets/06a712bb-34ae-4713-9cd3-6de43811a08c

### Image Loading

To make the app feel snappy:

- Photos fade in with a color placeholder based on the image's dominant color
- Images load progressively as you scroll
- Proper image dimensions prevent layout shifts
- Responsive images load the right size for your device

### Performance Focus

I paid special attention to performance:

- Used React Query for smart data caching
- Added debounced search to reduce API calls
- Memoized components to prevent unnecessary re-renders
- Implemented proper error handling with recovery options
- Added Web Vitals tracking to monitor performance metrics

<img width="1007" alt="desktop" src="https://github.com/user-attachments/assets/fd7967ea-ed08-4655-846e-2ce05d2ddc6c" />
<img width="1011" alt="mobile" src="https://github.com/user-attachments/assets/7008e61f-c3ae-4d5e-8385-a8c942a92c4f" />


### Component Structure

I organized the code for maintainability:

- Split the masonry grid into smaller, focused components
- Created custom hooks for complex logic
- Used TypeScript throughout for type safety
- Added proper error boundaries for resilience

The result is a fast, responsive photo gallery that handles large datasets smoothly while providing a great user experience.
