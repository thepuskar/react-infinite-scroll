import { ReactNode, useEffect, useRef } from 'react'

interface IInfiniteScroll {
  children: ReactNode
  onLoadMore: () => void
  hasMore: boolean | undefined
  threshold: number
  style: object
}

export const InfiniteScroll = (props: IInfiniteScroll) => {
  const rootSentinelRef = useRef<HTMLDivElement | null>(null)
  const targetSentinelRef = useRef<any>()
  const hasMoreRef = useRefVariable(props?.hasMore)
  const onLoadMoreRef = useRefVariable(props?.onLoadMore)

  useEffect(() => {
    const rootSentinel = rootSentinelRef?.current
    const targetSentinel = targetSentinelRef?.current
    const observer = new IntersectionObserver(
      async ([entry], observer) => {
        if (entry?.isIntersecting && hasMoreRef?.current) {
          if (onLoadMoreRef?.current) onLoadMoreRef?.current(entry, observer)
        }
      },
      {
        root: rootSentinel,
        rootMargin: getMargin(rootSentinel),
        threshold: props?.threshold
      }
    )
    observer.observe(targetSentinel)
    return () => observer.unobserve(targetSentinel)
  }, [props?.threshold, hasMoreRef, onLoadMoreRef])

  return (
    <div
      ref={rootSentinelRef}
      style={{
        overflow: 'auto',
        ...props?.style
      }}
    >
      {props?.children}
      <span ref={targetSentinelRef} />
    </div>
  )
}

//avoiding running every effects on every render
function useRefVariable(value: any) {
  const ref = useRef<any>()
  ref.current = value
  return ref
}

function getMargin(element: any) {
  const computedStyles = window.getComputedStyle(element)
  return ['margin-top', 'margin-left', 'margin-right', 'margin-bottom']
    .reduce(
      (accum, prop: any) =>
        `${accum} ${
          computedStyles?.getPropertyValue(prop) ||
          computedStyles?.[prop] ||
          '0px'
        }`,
      ''
    )
    .trim()
}
