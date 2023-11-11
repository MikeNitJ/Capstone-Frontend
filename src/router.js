import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Order from "./pages/Order"
import { foodIndexLoader } from "./loader"
import FoodShow from "./pages/FoodShow"

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/order" element={<Order/>} loader={foodIndexLoader}/>
        <Route path="/food/:id" element={<FoodShow/>} loader={foodIndexLoader}/>
    </>
))

export default router