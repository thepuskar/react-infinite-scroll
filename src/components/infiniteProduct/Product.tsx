import InfiniteScroll from 'react-infinite-scroller'
import { useGetInfiniteProducts } from 'hooks'
import { CardSkeleton, RenderIfVisible } from 'components'
import { Virtuoso } from 'react-virtuoso'

export const Product = () => {
  const { products, fetchNextPage, hasNextPage, isLoading } =
    useGetInfiniteProducts()

  return (
    <div className='flex justify-center items-center m-10'>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <Virtuoso
          useWindowScroll
          style={{ width: '100%' }}
          data={products}
          endReached={() => (hasNextPage ? fetchNextPage() : false)}
          overscan={200}
          itemContent={(index, data) => {
            return (
              <div>
                <RenderIfVisible>
                  <div className='m-4 flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                    <img
                      className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                      src={data?.imageUrl}
                      alt=''
                    />
                    <div className='flex flex-col justify-between p-4 leading-normal'>
                      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {data?.name}
                      </h5>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                        {data?.description}
                      </p>
                    </div>
                  </div>
                </RenderIfVisible>
              </div>
            )
          }}
          components={{ Footer }}
        />
      )}
    </div>
  )
}
const Footer = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      Loading...
    </div>
  )
}
// <InfiniteScroll
//   loadMore={() => fetchNextPage()}
//   hasMore={hasNextPage}
//   loader={
//     <div
//       key={0}
//       className='flex sticky top-[4.5em] flex-wrap w-full -mx-2 bg-gray-200 rounded shadow-lg'
//     >
//       <CardSkeleton />
//     </div>
//   }
//   useWindow={true}
// >
//   {products?.map((data) => (
//     <RenderIfVisible>
//       <div className='m-4 flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
//         <img
//           className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
//           src={data?.imageUrl}
//           alt=''
//         />
//         <div className='flex flex-col justify-between p-4 leading-normal'>
//           <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
//             {data?.name}
//           </h5>
//           <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
//             {data?.description}
//           </p>
//         </div>
//       </div>
//     </RenderIfVisible>
//   ))}
// </InfiniteScroll>
