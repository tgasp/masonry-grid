import React from 'react'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useResizeObserver } from './useResizeObserver'

describe('useResizeObserver', () => {
  let mockObserve: ReturnType<typeof vi.fn>
  let mockUnobserve: ReturnType<typeof vi.fn>
  let mockDisconnect: ReturnType<typeof vi.fn>
  let mockCallback: ReturnType<typeof vi.fn>
  let elementRef: React.RefObject<HTMLElement | null>

  beforeEach(() => {
    mockObserve = vi.fn()
    mockUnobserve = vi.fn()
    mockDisconnect = vi.fn()
    mockCallback = vi.fn()
    elementRef = { current: document.createElement('div') }

    // Reset the ResizeObserver mock
    vi.stubGlobal('ResizeObserver', vi.fn((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      // Store callback to trigger it in tests
      _callback: callback,
    })))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create ResizeObserver and observe element when ref is provided', () => {
    renderHook(() => useResizeObserver(elementRef, mockCallback))

    expect(ResizeObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalledWith(elementRef.current)
  })

  it('should not observe if ref.current is null', () => {
    const ref: React.RefObject<HTMLElement | null> = { current: null }
    renderHook(() => useResizeObserver(ref, mockCallback))

    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('should call callback when resize is detected', () => {
    renderHook(() => useResizeObserver(elementRef, mockCallback))

    // Simulate resize event
    const mockEntry: ResizeObserverEntry = {
      target: elementRef.current as Element,
      contentRect: new DOMRectReadOnly(),
      borderBoxSize: [], 
      contentBoxSize: [], 
      devicePixelContentBoxSize: []
    }

    const observer = (ResizeObserver as ReturnType<typeof vi.fn>).mock.calls[0][0]
    observer([mockEntry])

    expect(mockCallback).toHaveBeenCalledWith(mockEntry)
  })

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useResizeObserver(elementRef, mockCallback))
    
    unmount()
    
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should cleanup previous observer when ref changes', () => {
    const { rerender } = renderHook(
      ({ ref }) => useResizeObserver(ref, mockCallback),
      {
        initialProps: { ref: elementRef },
      }
    )

    // Create new ref
    const newRef: React.RefObject<HTMLElement | null> = { 
      current: document.createElement('div') 
    }

    rerender({ ref: newRef })

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    expect(mockObserve).toHaveBeenCalledWith(newRef.current)
  })
})