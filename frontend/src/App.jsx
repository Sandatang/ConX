import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import ForumSpecificTopicContainer from "./components/Forum/ForumSpecificTopicContainer"
import Topics from "./components/Forum/Topics"
import IsLogged from "./components/IsLogged"
import ChangePassword from "./components/Settings/ChangePassword"
import ChangeUnConfirmed from "./components/Settings/ChangeUnConfirmed"
import PersonalInformation from "./components/Settings/PersonalInformation"
import Forum from "./pages/Forum"
import MainContent from "./pages/MainContent"
import ManageUsers from "./pages/ManageUsers"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import Register from "./pages/Register"
import Settings from "./pages/Settings"
import Thread from "./components/Forum/Thread"
import ForumContentContainer from "./components/Forum/ForumContentContainer"
import JobLisintgs from "./pages/JobLisintgs"
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<IsLogged />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainContent />}>
            {/* BRGY Links */}
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/forum/*" element={<Forum />} >
              <Route path="topics/*" element={<ForumContentContainer />} >
                <Route index element={<Topics />} />
              </Route>
            </Route>
            <Route path="forum/topics/:forumTitle" element={<ForumSpecificTopicContainer />} >
              <Route index element={<Thread />} />
            </Route>
            <Route path="/jobs" element={<JobLisintgs/>}/>
            {/* End of BRGY Links */}


            <Route path="/settings/*" element={<Settings />} >
              <Route path="personal-information" element={<PersonalInformation />} />
              <Route path="confirmation/*" element={<ChangeUnConfirmed />} >
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
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