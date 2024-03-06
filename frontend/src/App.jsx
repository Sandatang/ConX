import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Homepage from "./pages/Homepage"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage/>}/>
        </Route>
      </Route >
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App