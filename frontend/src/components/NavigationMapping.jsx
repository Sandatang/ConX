import { brgyLinks } from "../constants"
import Navigation from "./Navigation"

const NavigationMapping = () => {
  return (
    <>
        {
            brgyLinks.map((data) => (
                <Navigation
                    key = {data.id}
                    link = {data.link}
                    title = {data.title}
                    icon = {data.icon}
                />
            ))
        }
    </>
  )
}

export default NavigationMapping