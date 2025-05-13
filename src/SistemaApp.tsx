import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {AppRoutes} from "./presentation/routes/AppRoutes.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const queryClient = new QueryClient()
export const SistemaApp = ()=>{
    return (
            <QueryClientProvider client={queryClient}>
                <AppRoutes/>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
    )
}