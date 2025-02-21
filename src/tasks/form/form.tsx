import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./form.css"

// ### **Task 7: Build a Simple Form with Validation**

// **Objective**: Create a form component that includes basic form validation.

// **Requirements**:

// - Create a form with fields: `Name`, `Email`, and `Password`.
// - Validate the form fields:
//   - Name should be required.
//   - Email should be a valid email format.
//   - Password should be at least 8 characters long.
// - Display error messages when validation fails.
// - Bonus: Use a state management library like `Formik` or `React Hook Form` to handle the form logic.

// **Skills Tested**:

// - Form handling in React
// - Conditional rendering for error messages
// - Validation techniques (manual or with libraries)
// - Bonus: Integration with form libraries

// ---

export const Form = () => {

    const { register, formState: {errors}, handleSubmit } = useForm();

    const submit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <form className="form" onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor="name">Name: </label>
                <div className="input-field">
                    <input {...register("name", {required: true})}/>
                    {
                        errors.name && <span>Name should be required.</span>
                    }
                </div>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <div className="input-field">
                    <input {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}/>
                    {
                        errors.email && <span>Email should be a valid email format.</span>
                    }
                </div>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <div className="input-field">
                    <input {...register("password", {
                        required: true,
                        minLength: 8
                    })} type="password"/>
                    {
                        errors.password && <span>Password should be at least 8 characters long.</span>
                    }
                </div>
            </div>
            <input type="submit" />
        </form>
    )
}