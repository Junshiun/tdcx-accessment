import { useCallback, useEffect, useState } from "react"

// ### **Task 5: Build a Counter Component with Custom Hook**

// **Objective**: Build a counter component that has functionality for increment, decrement, and reset. Use a custom hook to handle the logic.

// **Requirements**:

// - Create a `Counter` component that has buttons for "Increment", "Decrement", and "Reset".
// - Implement the logic of the counter in a custom hook (e.g., `useCounter`).
// - The hook should manage the counter state and expose functions to increment, decrement, and reset the value.
// - The counter should be initialized at 0.
// - Bonus: Persist the counter value in local storage so that it remembers the last value after a page reload.

// **Skills Tested**:

// - Custom React hooks (`useState`, `useCallback`)
// - Functional component structure
// - Code organization and separation of concerns
// - Bonus: Local storage integration

// ---

const useCounter = () => {
    const [count, setCount] = useState<number>(JSON.parse(localStorage.getItem("count") || "0"));

    const increment = useCallback(() => {
        setCount(prev => prev + 1)
    }, [])

    const decrement = useCallback(() => {
        setCount(prev => prev - 1)
    }, [])

    const reset = useCallback(() => {
        setCount(0)
    }, [])

    useEffect(() => {
        localStorage.setItem("count", JSON.stringify(count))
    }, [count])

    return {
        count,
        increment,
        decrement,
        reset
    }
}

export const Counter = () => {
    const { count, increment, decrement, reset } = useCounter();

    return (
        <div>
            <div style={{marginBottom: "1rem"}}>
            {
                count
            }
            </div>
            <div style={{display: "flex", gap: "1rem"}}>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    )
}