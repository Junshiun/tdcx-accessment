import { Link } from "react-router-dom"

// ### **Bonus Tasks (Optional but Recommended)**

// 2. **Routing**: Implement routing with **React Router** to handle multiple pages/views in a single-page application.

export const RouterLink = (props: {title: string, link: string}) => {
    return (
        <Link to={`/${props.link}`}>
            {
                props.title
            }
        </Link>
    )
}