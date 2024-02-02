import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Login from "./assets/pages/Login"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<Login/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
