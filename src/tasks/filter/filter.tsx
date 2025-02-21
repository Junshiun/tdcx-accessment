import { useRef, useState } from "react"
import "./filter.css"

// ## **Task 2: Build a Search Filter Component**

// **Objective**: Create a reusable search filter component that can be used to filter through a list of items.

// **Requirements**:

// - Create a `SearchFilter` component that receives an array of items (e.g., list of products, users, or books) as a prop.
// - The component should allow users to type a search term, and filter the list based on the term.
// - The component should update and display the filtered list dynamically as the user types.
// - The component should be case-insensitive.
// - Bonus: Implement debounce to optimize the search input for performance.

// **Skills Tested**:

// - React state management with hooks
// - Working with lists and rendering dynamic content
// - Handling input events and implementing search functionality
// - (Bonus) Performance optimization techniques like debounce

function debounce(func: (...args: unknown[]) => void, delay: number) {
    let timeout: NodeJS.Timeout | null;

    return function(...args: unknown[]) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay)
    }
}

export const SearchFilter = (props: {
    items: string[]
}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [list, setList] = useState(props.items);

    const search = debounce(() => {
        setList(props.items.filter(item => item.toUpperCase().includes(inputRef.current?.value.toUpperCase() || "")))
    }, 500);

    return (
        <div className="filter">
            <input onChange={search} ref={inputRef}/>
            <ul>
            {
                list.map((item) => {
                    return (
                        <li key={item}>
                            {
                                item
                            }
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}