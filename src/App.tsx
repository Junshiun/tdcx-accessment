import { Todo } from './tasks/todo/todo'
import './App.css'
import { SearchFilter } from './tasks/filter/filter'
import { NavBar } from './tasks/navbar/navbar'
import { ApiIntegration } from './tasks/api/api'
import { Counter } from './tasks/counter/counter'
import { CardComponent } from './tasks/card/card'
import { Form } from './tasks/form/form'
import { useState } from 'react'
import { Shopping } from './tasks/context/context'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouterLink } from './tasks/router/router'

const books = [
  "Mockingbird",
  "1984",
  "Pride and Prejudice",
  "The Great Gatsby",
  "Moby Queen",
  "War and Peace",
  "The Catcher in the Rye",
  "The Hobbit",
  "Brave New World",
  "The Lord of the Rings"
]

const TabRenderer = () => {

  const tabs = [
    {
      title: "Todo",
      component: <Todo />
    },
    {
      title: "Search Filter",
      component: <SearchFilter items={books}/>
    },
    {
      title: "NavBar",
      component: <NavBar />
    },
    {
      title: "API",
      component: <ApiIntegration />
    },
    {
      title: "Counter",
      component: <Counter />
    },
    {
      title: "Card",
      component: <CardComponent title="The Title" image="https://images.pexels.com/photos/30649137/pexels-photo-30649137/free-photo-of-fresh-berry-yogurt-bowl-on-elegant-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>
    },
    {
      title: "Form",
      component: <Form />
    },
    {
      title: "Context API",
      component: <Shopping />
    },
    {
      title: "Router",
      component: (
        <>
          <RouterLink title="page 1" link='page1'/>
          <br/>
          <RouterLink title="page 2" link='page2'/>
        </>
      )
    }
  ]

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <ul className='tabs'>
        {
          tabs.map((tab, index) => {
            return (
              <li key={tab.title} className={`tab ${activeTab === index? "active": ""}`} onClick={() => setActiveTab(index)}>
                {
                  tab.title
                }
              </li>
            )
          })
        }
      </ul>
      {
          tabs[activeTab].component
      }
    </>
  )
}

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<TabRenderer />} />
        <Route path="page1" element={<h3>This is page 1</h3>} />
        <Route path="page2" element={<h3>This is page 2</h3>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
