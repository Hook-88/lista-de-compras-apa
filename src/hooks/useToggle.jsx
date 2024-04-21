import { useState } from "react"

export default function useToggle({initialValue}) {
    const [on, setOn] = useState(initialValue)

    function toggleOn() {
        setOn(prevOn => !prevOn)
    }

    return [on, toggleOn]
}