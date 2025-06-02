import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {AppRoutes} from "./presentation/routes/AppRoutes.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
    }
})
export const SistemaApp = ()=>{
    return (
            <QueryClientProvider client={queryClient}>
                <AppRoutes/>
                {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
    )
}