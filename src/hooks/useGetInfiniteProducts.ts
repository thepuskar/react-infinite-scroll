import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getApi } from 'utils'
import { IProduct } from 'interface'

export const useGetInfiniteProducts = () => {
  const [products, setProducts] = useState<IProduct[]>()

  const fetchProducts = async (pageParam = 1) => {
    return await getApi(
      `/api/Product?PageSize=10&PageNumber=${pageParam}&CategoryId=5fa56149-98ce-4b22-a924-02565101631a`
    )
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(
    ['products'],
    ({ pageParam = 1 }) => fetchProducts(pageParam),
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        const totalRecords = pages[0]?.data?.totalPages || pages[0]?.totalPages
        console.log('totalRecords: ', totalRecords)
        if (lastPage?.data) {
          if (pages?.length === totalRecords) return undefined
          return pages?.length + 1
        }
        if (pages?.length === totalRecords) return undefined
        return pages?.length + 1
      }
    }
  )

  useEffect(() => {
    if (!isFetching && data) {
      setProducts(
        data.pages
          .flatMap((d) => d?.data)
          ?.map((result: any) => result?.data)
          .flat()
      )
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, data])

  return {
    data,
    isLoading,
    isFetching,
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalRecords: data?.pages?.[0]?.data?.totalRecords
  }
}
