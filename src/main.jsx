import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddNewRecipePage from './pages/AddNewRecipePage.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<App />} path="/">
                <Route element={<h1>Shopping list</h1>} index/>
                <Route path="recipes" element={<h1>Recipes</h1>}/>
                <Route path="recipes/:id" element={<h1>Recipe id</h1>}/>
                <Route path="add-new-recipe" element={<AddNewRecipePage />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

