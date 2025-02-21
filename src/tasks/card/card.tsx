import "./card.css"

// ### **Task 6: Design a Card Component with Props**

// **Objective**: Create a reusable card component that can accept different props for customizing its content.

// **Requirements**:

// - Create a `Card` component that displays:
//   - A title
//   - An image
//   - A description
//   - A "Read More" button (optional)
// - The component should accept these values as props, and dynamically render them.
// - Bonus: Style the card with a hover effect (like changing the background color on hover).

// **Skills Tested**:

// - Component reusability and props
// - Dynamic rendering based on props
// - Basic CSS styling (hover effects)

// ---

export const CardComponent = (props: {
    title: string;
    image: string;
    desc: string;
}) => {

    const { title, image, desc } = props;

    return (
        <div className="card">
            <h3>{title}</h3>
            <div className="img-container">
                <img src={image}/>
            </div>
            <div>{desc}</div>
        </div>
    )
}