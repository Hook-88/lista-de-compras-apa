import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddNewRecipePage from './pages/AddNewRecipePage.jsx'
import RecipesPage from "./pages/RecipesPage.jsx"
import RecipePage from "./pages/RecipePage.jsx"
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<App />} path="/">
                <Route element={<h1>Shopping list</h1>} index/>
                <Route path="recipes" element={<RecipesPage />}/>
                <Route path="recipes/:id" element={<RecipePage />}/>
                <Route path="add-new-recipe" element={<AddNewRecipePage />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

