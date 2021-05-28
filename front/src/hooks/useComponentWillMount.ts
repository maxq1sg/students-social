import { useRef } from "react"

export const useComponentWillMount = (func:any) => {
    const willMount = useRef(true)

    if (willMount.current) func()

    willMount.current = false
}