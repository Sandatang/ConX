import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Login from "./pages/Login"
import MainContent from "./pages/MainContent"
import ManageUsers from "./pages/ManageUsers"
import Newsfeed from "./pages/Newsfeed"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import Register from "./pages/Register"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainContent />}>
            <Route path="/newsfeed" element={<Newsfeed />} />
            <Route path="/manageusers" element={<ManageUsers />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route >
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App