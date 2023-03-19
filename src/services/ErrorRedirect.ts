import { AxiosError } from "axios"
import { NextRouter } from "next/router"

export function handleError(router: NextRouter, error?: AxiosError) {
    if (error != null) {
        // TODO Objeto de erro
        // error.response.data
        // {"timestamp":"2023-03-06T09:06:54.184+00:00","status":403,"error":"Forbidden","message":"Access Denied","path":"/report"}

        const statusCode = error.response.status
        if ([403, 404].includes(statusCode)) {
            router.push('/app/login')
        }
    }
}