import { ReactNode, useEffect, useRef, useMemo, useCallback } from 'react'
import { debounce } from 'utils'

interface IInfiniteScroll {
  children: ReactNode
  onLoadMore: () => void
  hasMore: boolean | undefined
  threshold?: number
  style?: object
  loading?: ReactNode
  debounce?: number
  className?: string
}

export const InfiniteScroll = (props: IInfiniteScroll) => {
  const rootSentinelRef = useRef<HTMLDivElement | null>(null)
  const targetSentinelRef = useRef<any>()
  const hasMoreRef = useRef(props?.hasMore)
  const onLoadMoreRef = useRef(props?.onLoadMore)
  const loadingRef = useRef(props?.loading || <p>Loading...</p>)

  /* Debouncing the onLoadMore function. */
  const debouncedOnLoadMore = debounce(() => {
    if (onLoadMoreRef?.current) onLoadMoreRef?.current()
  }, props?.debounce || 500) // debounce for 500 milliseconds

  const observer = useMemo(() => {
    return new IntersectionObserver(
      async ([entry]) => {
        if (entry?.isIntersecting && hasMoreRef?.current) {
          debouncedOnLoadMore()
        }
      },
      {
        root: rootSentinelRef?.current,
        rootMargin: getMargin(rootSentinelRef?.current),
        threshold: props?.threshold
      }
    )
  }, [props?.threshold, hasMoreRef, onLoadMoreRef])

  const observe = useCallback(
    (node: any) => {
      if (node) observer.observe(node)
    },
    [observer]
  )

  const unobserve = useCallback(
    (node: any) => {
      if (node) observer.unobserve(node)
    },
    [observer]
  )

  useEffect(() => {
    return () => {
      observer.disconnect()
      unobserve(targetSentinelRef?.current)
    }
  }, [observer, unobserve])

  return (
    <div
      ref={rootSentinelRef}
      style={{
        ...props?.style
      }}
      className={props?.className}
    >
      {props?.children}
      {hasMoreRef?.current ? loadingRef?.current : null}
      <span ref={(node) => observe(node)} />
    </div>
  )
}

function getMargin(element: any) {
  if (!element) return ''
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
