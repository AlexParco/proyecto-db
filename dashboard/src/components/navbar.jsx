import {
  Box,
  Container,
  Stack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Avatar,
  Heading,
  useColorMode,
} from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

import NavBarLink from "./navlink"
import ThemeButton from "./themebuttton"
import { useAuth } from "../context/auth.context"

const NavBar = () => {
  const { colorMode } = useColorMode()
  let location = useLocation()
  const { logoutUser, isLogged } = useAuth()

  return (
    <Box
      as="nav"
      position="fixed"
      bg={colorMode === 'light' ? '#ffffff40' : '#202023'}
      w="100%"
      zIndex={2}
    >
      <Container
        display="flex"
        p={2}
        pt={4}
        maxW="1050px"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        {
          !isLogged
            ? (
              <Heading size='lg'>Dashboard </Heading>
            )
            : (

              <Stack
                mr={5}
                ml={2}
                direction={{ base: 'row' }}
                spacing='18px'
                display={{ base: 'flex' }}
                width={{ base: 'auto' }}
                alignItems="center"
                flexGrow={1}
                mt={0}
              >
                <Box>
                  <Menu>
                    <MenuButton>
                      <Avatar size='md' />
                    </MenuButton>
                    <MenuList>
                      <NavBarLink _href='/profile'>
                        <MenuItem>
                          Profile
                        </MenuItem>
                      </NavBarLink>
                      <MenuItem onClick={() => logoutUser()}>
                        Log Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <NavBarLink _href='/' path={location.pathname}>
                  Dashboard
                </NavBarLink>
              </Stack>

            )
        }
        <Box flex={1} align='right' mr={2}>
          <ThemeButton />
        </Box>
      </Container>
    </Box>
  )
}

export default NavBar 
