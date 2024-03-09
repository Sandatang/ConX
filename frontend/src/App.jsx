import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ChangePassword from "./components/ChangePassword"
import IsLogged from "./components/IsLogged"
import PersonalInformation from "./components/PersonalInformation"
import MainContent from "./pages/MainContent"
import ManageUsers from "./pages/ManageUsers"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import Register from "./pages/Register"
import Settings from "./pages/Settings"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route path="/login" element={<IsLogged />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainContent />}>
            <Route path="/manageusers" element={<ManageUsers />} />
            <Route path="/settings/*" element={<Settings />} >
              <Route path="personal-information" element={<PersonalInformation />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>

          </Route>
        </Route>
      </Route >
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App