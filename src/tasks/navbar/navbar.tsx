import { useEffect, useState } from "react";
import "./navbar.css"

// ### **Task 3: Create a Responsive Navbar with Dynamic Links**

// **Objective**: Create a responsive navigation bar that adapts based on screen size.

// **Requirements**:

// - Create a navigation bar (`Navbar`) with a list of links (e.g., Home, About, Services, Contact).
// - On desktop screens, display the links in a horizontal row.
// - On mobile screens, collapse the links into a hamburger menu.
// - Clicking the hamburger icon should toggle the display of the links.
// - Use CSS Flexbox or Grid to structure the layout.
// - Bonus: Use a CSS-in-JS library (like `styled-components` or `emotion`) to style the component.

// **Skills Tested**:

// - CSS for responsiveness (media queries, Flexbox/Grid)
// - React state management (e.g., toggling the hamburger menu)
// - Understanding of mobile-first design
// - Bonus: Use of CSS-in-JS libraries

export const NavBar = () => {

    const links = ["Home", "About", "Services", "Contact"];
    const [collapse, setCollapse] = useState(false);

    const resizeEvent = () => {
        if (window.innerWidth >= 640) {
            setCollapse(false)
        } else {
            setCollapse(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeEvent);

        return () => window.removeEventListener("resize", resizeEvent)
    }, [])

    return (
        <div className="navbar">
            <div>
                <div className="hamburger" onClick={() => setCollapse(prev => !prev)}>
                    {
                        Array(3).fill("").map((_, index) => {
                            return (
                                <div key={index}></div>
                            )
                        })
                    }
                </div>
                <div className={`links ${collapse? "collapse": ""}`}>
                {
                    links.map((link) => {
                        return (
                            <a href={`#${link}`} key={link}>
                                {
                                    link
                                }
                            </a>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}