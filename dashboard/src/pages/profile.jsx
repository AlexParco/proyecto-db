import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

const Profile = () => {
  return (
    <Box as="main" pt={20}>
      <Container maxW="850px" pt={10} >
        <div>
          profile
          <Drawer>

          </Drawer>
        </div>
      </Container>
    </Box>
  )
}

export default Profile