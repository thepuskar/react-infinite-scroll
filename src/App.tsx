import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Product } from 'components'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Product />
    </QueryClientProvider>
  )
}

export default App
