import { AccountCircle, Announcement, Book, Forum, ManageAccounts, Password, Settings, VideoCameraFront } from "@mui/icons-material";

export const brgyLinks = [
  {
    id: "bulletin",
    link: "/bulletin",
    title: "Bulletin Board",
    icon: <Announcement fontSize="medium" className="!text-blue-500" />
  },

  {
    id: "newsfeed",
    link: "/workshop",
    title: "Workshop",
    icon: <VideoCameraFront fontSize="medium" className="!text-yellow-500" />
  },

  {
    id: "joblistings",
    link: "/jobs",
    title: "Job Listings",
    icon: <Book fontSize="medium" className="!text-pink-500" />
  },
  {
    id: "forum",
    link: "/forum/topics",
    title: "Forum",
    icon: <Forum fontSize="medium" className="!text-red-500" />
  },


  {
    id: "manage-users",
    link: "/manage-users",
    title: "Manage Users",
    icon: <ManageAccounts fontSize="medium" className="!text-violet-500" />
  },
  {
    id: "setting",
    link: "/settings",
    title: "Settings",
    icon: <Settings fontSize="medium" className="!text-orange-500" />
  },
];

export const settingLinks = [
  {
    id: "personal",
    link: "/personal-information",
    title: "Personal Information",
    icon: <AccountCircle fontSize="small" className="!text-slate-800 mr-2  self-end" />
  },
  {
    id: "changepassword",
    link: "/confirmation",
    title: "Change Password",
    icon: <Password fontSize="small" className="!text-slate-800 mr-2  self-end" />
  },
  // {
  //   id: "contacts",
  //   link: "/contacts",
  //   title: "Contacts",
  //   icon: <ContactEmergency fontSize="small" className="!text-slate-800 mr-2  self-end" />
  // },
]


export const topics = [
  {
    link: "/topics",
    title: "Threads"
  },
  {
    link: "/following",
    title: "Following"
  },
  {
    link: "/my-forum",
    title: "My Forum"
  },
]

