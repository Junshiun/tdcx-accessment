import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import "./api.css"
import { createPortal } from "react-dom";

// ### **Task 4: API Integration with Error Handling and Loading States**

// **Objective**: Fetch and display data from an external API with proper error handling and loading states.

// **Requirements**:

// - Fetch a list of items from a public API (e.g., JSONPlaceholder, OpenWeatherMap, or similar).
// - Display the list of items (e.g., users, posts, etc.) in a well-structured format.
// - Show a loading spinner while the data is being fetched.
// - If the API request fails, display an error message.
// - Bonus: Allow users to click on an item to view more details in a separate modal or detail page.

// **Skills Tested**:

// - Fetching data with `useEffect` and `fetch` or `axios`
// - Error handling and displaying loading states
// - Component design for dynamic data rendering
// - Bonus: Modal implementation and state management

// ---

const success = "success";
const pending = "pending";

type TPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const StateSwitch = (props: {loadingState: string, data: TPost[], setSelectedPost: Dispatch<SetStateAction<TPost | null>>}) => {

    const { loadingState, data, setSelectedPost } = props;

    const Render = useMemo(() => {
        switch(loadingState) {
            case success:
                return (
                    <ul>
                        {
                            data.map(item => {
                                return (
                                    <li key={item.id} onClick={() => setSelectedPost(item)}>
                                        {
                                            item.title
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            case pending:
                return (
                    <>
                        <span className="spinning">C</span>
                        <br/>
                        <span className="loading">Loading</span>
                    </>
                )
            default:
                return (
                    <span>
                        {
                            loadingState
                        }
                    </span>
                )
        }
    }
    , [loadingState])

    return Render
}

export const ApiIntegration = () => {

    const [data, setData] = useState<TPost[]>([]);
    const [loadingState, setLoadingState] = useState(pending);
    const [selectedPost, setSelectedPost] = useState<TPost | null>(null);

    const postsRef = useRef(null);

    useEffect(() => {
        setLoadingState(pending);
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET"
        })
        .then(res => res.json())
        .then(res => {
            setData(res);
            setLoadingState(success);
        })
        .catch(err => {
            setLoadingState(`Error: ${err.message}`);
        })
    }, [])

    return (
        <div className="posts" ref={postsRef}>
            <h1>POSTS</h1>
            <StateSwitch loadingState={loadingState} data={data} setSelectedPost={setSelectedPost}/>
            {
                selectedPost &&
                createPortal(
                    <div className="selected-popup">
                        <div className="selected-post">
                            <h1>{selectedPost.title}</h1>
                            <p>{selectedPost.body}</p>
                            <span>{selectedPost.userId}</span>
                            <div className="cross" onClick={() => setSelectedPost(null)}>X</div>
                        </div>
                    </div>
                    , document.body
                )
            }
        </div>
    )
}