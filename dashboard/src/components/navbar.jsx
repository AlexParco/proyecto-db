import {
  Box,
  Container,
  Button,
  Stack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
  Avatar,
  Center,
} from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { NavLink, useLocation } from "react-router-dom"

import NavBarLink from "./navlink"
import ThemeButton from "./themebuttton"
import { useAuth } from "../context/auth.context"


const NavBar = () => {
  let location = useLocation()
  const { logoutUser, isLogged } = useAuth()

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      zIndex={1}
    >
      <Container
        display="flex"
        p={2}
        pt={4}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Stack
          mr={5}
          ml={2}
          direction={{ base: 'column', sm: 'row' }}
          spacing='24px'
          display={{ base: 'none', sm: 'flex' }}
          width={{ base: 'full', sm: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ sm: 0 }}
        >
          <Box>
            <Menu>
              <MenuButton>
                <Avatar size='md' />
              </MenuButton>
              <MenuList>
                <NavLink to='/profile'>
                  <MenuItem>
                    Profile
                  </MenuItem>
                </NavLink>
                {
                  isLogged
                    ?
                    (
                      <MenuItem onClick={() => logoutUser()}>
                        Log Out
                      </MenuItem>
                    )
                    :
                    (
                      <NavLink
                        to='/login'
                      >
                        <MenuItem>
                          Log In
                        </MenuItem>
                      </NavLink>
                    )
                }
              </MenuList>
            </Menu>
          </Box>
          <NavBarLink _href='/' path={location.pathname}>
            Dashboard
          </NavBarLink>
          <NavBarLink _href='/employees' path={location.pathname}>
            Employees
          </NavBarLink>
          <NavBarLink _href='/calendar' path={location.pathname}>
            Calendar
          </NavBarLink>
        </Stack>

        <Box flex={1} align='right' mr={2}>
          <ThemeButton />
          <Box ml={2} display={{ base: 'inline-block', sm: 'none' }}>
            <Menu>
              <MenuButton
                variant='outline'
                as={IconButton}
                icon={<HamburgerIcon />}
                aria-label='Menu'
              >
              </MenuButton>

              <MenuList>
                <NavLink to='/'>
                  <MenuItem >Dashboard</MenuItem>
                </NavLink>
                <NavLink to='/employees'>
                  <MenuItem >Employees</MenuItem>
                </NavLink>
                <NavLink to='/calendar'>
                  <MenuItem >Calendar</MenuItem>
                </NavLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default NavBar 
