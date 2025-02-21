import { ChangeEvent, FormEvent, useState } from "react"
import './todo.css'

// ## **Task 1: Build a Todo List App**

// **Objective**: Create a simple todo list application that allows users to add, edit, delete, and mark items as completed.

// **Requirements**:

// - Users can add new todo items (with a title and optional description).
// - Users can mark items as completed (toggle between completed and not completed).
// - Users can edit the title and description of any todo.
// - Users can delete todo items.
// - Display a list of todos with their status (completed or not).
// - Use React hooks (`useState`, `useEffect`, etc.) and functional components.
// - Bonus: Implement local storage to save todos, so that data persists after page reload.

// **Skills Tested**:

// - React basics (useState, useEffect)
// - Event handling
// - Dynamic rendering with conditionals
// - Component structure and reusability
// - Optional: Handling side effects and persisting data

// ---

const title = "title";
const desc = "description";
const completed = "completed";

type TTodoList = {
    id: string,
    title: string,
    desc: string,
    completed: boolean
}

export const Todo = () => {

    const [todoList, setTodoList] = useState<TTodoList[]>(JSON.parse(localStorage.getItem("todo") || "[]"));

    const setLocal = (list: TTodoList[]) => {
        localStorage.setItem("todo", JSON.stringify(list))
    }

    const update = (ev: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        ev.preventDefault();

        const target = ev.target as HTMLInputElement;
        const targetId = target.parentElement?.id;

        const newList = todoList.map((item) => {
            return item.id === targetId? {
                ...item,
                [target.name]: target.value
            } : item
        })

        setLocal(newList);
        setTodoList(newList);
    }

    return (
        <div className="todo">
            <div style={{marginBottom: "1rem"}}>TODO List</div>
            <form onSubmit={(ev) => {
                ev.preventDefault();
                const form = new FormData(ev.target as HTMLFormElement);

                const newList = [...todoList, {
                    id: `${Date.now()}`,
                    title: form.get("title") as string,
                    desc: form.get("desc") as string,
                    completed: form.get("completed") === "on"
                }]

                setLocal(newList);
                setTodoList(newList);
            }}>
                <label htmlFor="title">Title:</label>
                <input name="title" id="title" required/>
                <label htmlFor="desc">Description:</label>
                <textarea name="desc" id="desc" />
                <label htmlFor="completed">Completed:</label>
                <input name="completed" id="completed" type="checkbox"/>
                <button type="submit" style={{gridColumn: "span 2"}}>Add</button>
            </form>
            {
                todoList.length > 0 &&
            <table>
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Description</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                {
                    todoList.map((item) => {
                        return (
                            <tr id={`${item.id}`} key={item.id}>
                                <td>
                                    <input defaultValue={item.title} name={title} onChange={update}/>
                                </td>
                                <td>
                                    <textarea defaultValue={item.desc} name={desc} onChange={update}/>
                                </td>
                                <td>
                                    <input defaultChecked={item.completed} type="checkbox" name={completed} onChange={update}/>
                                </td>
                                <td style={{border: "none"}}>
                                    <button onClick={() => {
                                        const newList = todoList.filter(todo => todo.id !== item.id);
                                        setLocal(newList);
                                        setTodoList(newList);
                                    }}>X</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            }
        </div>
    )
}