import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import EmailConfirmationMessage from "./components/EmailConfirmationMessage"
import FollowedForum from "./components/Forum/FollowedForum"
import ForumSpecificTopicContainer from "./components/Forum/ForumSpecificTopicContainer"
import MyForum from "./components/Forum/MyForum"
import Thread from "./components/Forum/Thread"
import Topics from "./components/Forum/Topics"
import IsLogged from "./components/IsLogged"
import JobDetails from "./components/Job/JobDetails"
import Layout from "./components/Layout"
import ChangePassword from "./components/Settings/ChangePassword"
import ChangeUnConfirmed from "./components/Settings/ChangeUnConfirmed"
import PersonalInformation from "./components/Settings/PersonalInformation"
import Analytics from "./pages/Analytics"
import BulletinBoard from "./pages/BulletinBoard"
import Forum from "./pages/Forum"
import JobLisintgs from "./pages/JobLisintgs"
import MainContent from "./pages/MainContent"
import ManageUsers from "./pages/ManageUsers"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import Register from "./pages/Register"
import Settings from "./pages/Settings"
import Testimonial from "./pages/Testimonial"
import Workshop from "./pages/Workshop"
import Livelihood from "./components/Workshop/Livelihood"
import SelfDefense from "./components/Workshop/SelfDefense"
import Resources from "./components/Workshop/Resources"
import SelfGrowth from "./components/Workshop/SelfGrowth"
import AllTestimonial from "./components/Testimonials/AllTestimonial"
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<IsLogged />} />
        <Route path="/register" element={<Register />} />
        <Route path="/email/confirmation/Success" element={<EmailConfirmationMessage />} />
        <Route path="/email/error/Error" element={<EmailConfirmationMessage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainContent />}>

            {/* BRGY Links */}
            {
              localStorage.getItem('role') === 'Personnel' &&
              <>
                <Route path="/bulletin" element={<BulletinBoard />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/workshop" element={<Workshop />} />
                <Route path="/testimonial/*" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Testimonial />} />
                  <Route path="view" element={<AllTestimonial />} />
                </Route>

                <Route path="/forum/*" element={<Forum />} >
                  <Route path="topics" element={<Topics />} />
                  <Route path="followed" element={<FollowedForum />} />
                  <Route path="my-forum" element={<MyForum />} />
                </Route>

                <Route path="/workshop/*" element={<Workshop />} >
                  <Route path="livelihood" element={<Livelihood />} />
                  <Route path="self-defense" element={<SelfDefense />} />
                  <Route path="self-growth" element={<SelfGrowth />} />
                </Route>

                <Route path="workshop/:category/:workshopTitle/:id" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Resources />} />
                </Route>

                <Route path="forum/topic/:forumTitle/:id" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Thread />} />
                </Route>

                <Route path="/jobs/*" element={<Layout />}>
                  <Route index element={<JobLisintgs />} />
                  <Route path=":id/details" element={<JobDetails />} />
                </Route>
              </>
            }

            {/* End of BRGY Links */}
            {/* BRGY Links */}
            {
              localStorage.getItem('role') === 'Admin' &&
              <>
                <Route path="/bulletin" element={<BulletinBoard />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/testimonial/*" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Testimonial />} />
                  <Route path="view" element={<AllTestimonial />} />
                </Route>

                <Route path="/forum/*" element={<Forum />} >
                  <Route path="topics" element={<Topics />} />
                  <Route path="followed" element={<FollowedForum />} />
                  <Route path="my-forum" element={<MyForum />} />
                </Route>

                <Route path="/workshop/*" element={<Workshop />} >
                  <Route path="livelihood" element={<Livelihood />} />
                  <Route path="self-defense" element={<SelfDefense />} />
                  <Route path="self-growth" element={<SelfGrowth />} />
                </Route>

                <Route path="workshop/:category/:workshopTitle/:id" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Resources />} />
                </Route>

                <Route path="forum/topic/:forumTitle/:id" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Thread />} />
                </Route>

                <Route path="/jobs/*" element={<Layout />}>
                  <Route index element={<JobLisintgs />} />
                  <Route path=":id/details" element={<JobDetails />} />
                </Route>
              </>
            }

            {/* End of BRGY Links */}


            {/* Women Links */}

            {
              localStorage.getItem('role') === 'Women' &&
              <>
                <Route path="/bulletin" element={<BulletinBoard />} />
                <Route path="/testimonial/*" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Testimonial />} />
                  <Route path="view" element={<AllTestimonial />} />
                </Route>
                <Route path="/workshop" element={<Workshop />} />

                <Route path="/forum/*" element={<Forum />} >
                  <Route path="topics" element={<Topics />} />
                  <Route path="followed" element={<FollowedForum />} />
                  <Route path="my-forum" element={<MyForum />} />
                </Route>

                <Route path="/workshop/*" element={<Workshop />} >
                  <Route path="livelihood" element={<Livelihood />} />
                  <Route path="self-defense" element={<SelfDefense />} />
                  <Route path="self-growth" element={<SelfGrowth />} />
                </Route>

                <Route path="workshop/:category/:workshopTitle/:id" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Resources />} />
                </Route>

                <Route path="forum/topic/:forumTitle/:id" element={<ForumSpecificTopicContainer />} >
                  <Route index element={<Thread />} />
                </Route>

                <Route path="/jobs/*" element={<Layout />}>
                  <Route index element={<JobLisintgs />} />
                  <Route path=":id/details" element={<JobDetails />} />
                </Route>
              </>
            }
            {/* End of Women Links */}


            <Route path="/settings/*" element={<Settings />} >
              <Route path="profile" element={<PersonalInformation />} />
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