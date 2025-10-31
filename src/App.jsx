import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Quiz from "./components/features/quiz/Quiz"
import DrinkCard from "./components/features/DrinkCard"
import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MenuPage"

export default function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />} >
               <Route index element={<HomePage />} />
               <Route path="quiz" element={<Quiz />} />
               <Route path="menu" element={<MenuPage />} />
               <Route path="menu/:id" element={<DrinkCard />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}