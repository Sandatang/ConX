import { adminLinks, brgyLinks, womenLinks } from "../constants"
import Navigation from "./Navigation"

const NavigationMapping = () => {
  const userRole = localStorage.getItem("role")
  return (
    <>
      {userRole === "Women" &&
        womenLinks.map((data) => (
          <Navigation
            key={data.id}
            link={data.link}
            title={data.title}
            icon={data.icon}
          />
        ))
      }


      {userRole === "Personnel" &&
        brgyLinks.map((data) => (
          <Navigation
            key={data.id}
            link={data.link}
            title={data.title}
            icon={data.icon}
          />
        ))
      }
      {userRole === "Admin" &&
        adminLinks.map((data) => (
          <Navigation
            key={data.id}
            link={data.link}
            title={data.title}
            icon={data.icon}
          />
        ))
      }
    </>
  )
}

export default NavigationMapping