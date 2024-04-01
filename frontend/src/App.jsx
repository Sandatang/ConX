import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import FollowedForum from "./components/Forum/FollowedForum"
import ForumContentContainer from "./components/Forum/ForumContentContainer"
import ForumSpecificTopicContainer from "./components/Forum/ForumSpecificTopicContainer"
import Thread from "./components/Forum/Thread"
import Topics from "./components/Forum/Topics"
import IsLogged from "./components/IsLogged"
import JobDetails from "./components/Job/JobDetails"
import Layout from "./components/Layout"
import ChangePassword from "./components/Settings/ChangePassword"
import ChangeUnConfirmed from "./components/Settings/ChangeUnConfirmed"
import PersonalInformation from "./components/Settings/PersonalInformation"
import BulletinBoard from "./pages/BulletinBoard"
import Forum from "./pages/Forum"
import JobLisintgs from "./pages/JobLisintgs"
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

            {/* BRGY Links */}
            <Route path="/bulletin" element={<BulletinBoard />} />
            <Route path="/manage-users" element={<ManageUsers />} />

            <Route path="/forum/*" element={<Forum />} >
                <Route path="topics" element={<Topics />} />
                <Route path="followed" element={<FollowedForum />} />
              {/* <Route path="topics/*" element={<ForumContentContainer />} >
              </Route>
              <Route path="my-forum/*" element={<ForumContentContainer />} >
              </Route> */}
            </Route>

            <Route path="forum/topics/:forumTitle/:id" element={<ForumSpecificTopicContainer />} >
              <Route index element={<Thread />} />
            </Route>

            <Route path="/jobs/*" element={<Layout />}>
              <Route index element={<JobLisintgs />} />
              <Route path=":id/details" element={<JobDetails />} />
            </Route>
            {/* End of BRGY Links */}

            {/* Women Links */}
            <Route path="/bulletin" element={<BulletinBoard />} />

            <Route path="/forum/*" element={<Forum />} >
              <Route path="topics/*" element={<ForumContentContainer />} >
                <Route index element={<Topics />} />
              </Route>
            </Route>

            <Route path="forum/topics/:forumTitle/:id" element={<ForumSpecificTopicContainer />} >
              <Route index element={<Thread />} />
            </Route>

            <Route path="/jobs/*" element={<Layout />}>
              <Route index element={<JobLisintgs />} />
              <Route path=":id/details" element={<JobDetails />} />
            </Route>
            {/* End of Women Links */}


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