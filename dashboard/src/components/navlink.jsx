import { Text } from "@chakra-ui/react"
import { Link, NavLink } from "react-router-dom"

const NavBarLink = ({ children, _href, path, _target }) => {
  const active = path === _href
  return (
    <Text
      borderBottom={active ? '2px' : undefined}
      borderColor={active ? 'teal.300' : undefined}
    >
      <NavLink
        to={_href}
        target={_target}
      >
        {children}
      </NavLink>
    </Text>
  )
}

export default NavBarLink