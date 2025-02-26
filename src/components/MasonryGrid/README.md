# MasonryGrid Component

A virtualized masonry grid component that efficiently renders only the items visible in the viewport.

## Features

- True virtualization (only renders visible items)
- Responsive layout with dynamic column count
- Efficient scroll and resize handling
- Optimized for large datasets
- Smooth loading and error states

## Directory Structure

```
MasonryGrid/
├── components/           # Inner components
│   ├── EmptyMessage.tsx  # Message when no items or no more items
│   ├── MasonryItem.tsx   # Individual grid item
│   └── Spinner.tsx       # Loading indicator
├── hooks/                # Custom hooks
│   └── useMasonryGrid.ts # Core layout and virtualization logic
├── styles.ts             # Styled components
├── types.ts              # TypeScript interfaces and types
├── index.tsx             # Main component
└── README.md             # Documentation
```

## Usage

```tsx
import MasonryGrid from '@/components/MasonryGrid';

function MyComponent() {
  const { photos, loading, hasMore, loadMore } = usePhotos();

  return (
    <MasonryGrid
      photos={photos}
      loading={loading}
      hasMore={hasMore}
      onIntersect={loadMore}
      columnWidth={300}  // Optional, default: 300
      columnGap={20}     // Optional, default: 20
      buffer={5}         // Optional, default: 5
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `photos` | `PexelsPhoto[]` | Required | Array of photos to display |
| `loading` | `boolean` | Required | Whether more photos are being loaded |
| `hasMore` | `boolean` | Required | Whether there are more photos to load |
| `onIntersect` | `() => void` | Required | Callback when bottom of grid is reached |
| `columnWidth` | `number` | `300` | Width of each column in pixels |
| `columnGap` | `number` | `20` | Gap between columns in pixels |
| `buffer` | `number` | `5` | Number of items to render beyond visible area |

## How It Works

1. The `useMasonryGrid` hook calculates positions for all items based on container width and item dimensions
2. Only items that are visible in the viewport (plus a buffer) are actually rendered
3. As the user scrolls, the visible items are updated
4. When the user approaches the bottom of the grid, the `onIntersect` callback is triggered to load more items

This approach significantly reduces DOM nodes and improves performance with large datasets.