import {
  ReactNode,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState
} from 'react'
import { debounce } from 'utils'

interface IInfiniteScrollProps {
  children: ReactNode
  onLoadMore: () => void
  hasMore: boolean | undefined
  threshold?: number | number[]
  style?: object
  loading: ReactNode
  debounce?: number
  className?: string
}

const defaultProps = {
  onLoadMore: () => {},
  hasMore: false,
  style: {},
  loading: <p>Loading...</p>,
  debounce: 10,
  className: ''
}

export const InfiniteScroll = (userProps: IInfiniteScrollProps) => {
  const props = { ...defaultProps, ...userProps }
  const [isLoading, setIsLoading] = useState(false)
  const [isFastScrolling, setIsFastScrolling] = useState(false)
  const rootSentinelRef = useRef<HTMLDivElement | null>(null)
  const targetSentinelRef = useRef()
  const hasMoreRef = useRef(props.hasMore)
  const onLoadMoreRef = useRef(props.onLoadMore)
  const loadingRef = useRef(props.loading)

  /* Debouncing the onLoadMore function. */
  const debouncedOnLoadMore = debounce(() => {
    if (onLoadMoreRef.current) {
      onLoadMoreRef.current()
      setIsLoading(false)
    }
  }, props?.debounce)

  useEffect(() => {
    if (rootSentinelRef.current) {
      // Add event listener for scroll event
      rootSentinelRef.current!.addEventListener('scroll', handleScroll)
      return () => {
        // Remove event listener when component unmounts
        rootSentinelRef.current!.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleScroll = () => {
    // Set isFastScrolling to true if user scrolls quickly
    setIsFastScrolling(true)
    // Debounce setting isFastScrolling back to false
    debounce(() => setIsFastScrolling(false), props.debounce)
  }

  const observer = useMemo(() => {
    return new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && hasMoreRef.current) {
          setIsLoading(true)
          debouncedOnLoadMore()
        }
      },
      {
        root: rootSentinelRef.current,
        rootMargin: getMargin(rootSentinelRef.current),
        threshold: props.threshold
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.threshold, hasMoreRef, onLoadMoreRef])

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
      {props.children}
      {isLoading ? loadingRef?.current : <span ref={(node) => observe(node)} />}
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
