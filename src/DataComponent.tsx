import { useInfiniteQuery } from '@tanstack/react-query'

import { InfiniteScroll } from './InfiniteScroll'
import { useGetInfiniteProducts } from 'hooks'

function DataComponent() {
  const { products, fetchNextPage, hasNextPage, isLoading } =
    useGetInfiniteProducts()

  console.log('products', products)

  return (
    <div className='App flex justify-center items-center m-10'>
      <div className='flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
        <img
          className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
          src='/docs/images/blog/image-4.jpg'
          alt=''
        />
        <div className='flex flex-col justify-between p-4 leading-normal'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            Noteworthy technology acquisitions 2021
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

      {/* <InfiniteScroll
        style={{ outline: 'red solid thin' }}
        onLoadMore={() => console.log('hola')}
        threshold={0.7}
        hasMore={true}
      >
        <ul>
          {Array.from(Array(105)).map((_, index) => (
            <li key={index}>{index}</li>
          ))}
        </ul>
      </InfiniteScroll> */}
    </div>
  )
}

export default DataComponent
