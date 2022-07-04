import { EditIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Container,
  Stack,
  Text,
  Image,
  useColorMode,
  Button,
  Icon,
  Badge,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  FormLabel,
  FormControl,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useAuth } from "../context/auth.context"

const Profile = () => {
  const { colorMode } = useColorMode()
  const { user, updateUser } = useAuth()

  return (
    <Box as="main" pt={20}>
      <Container maxW="850px" pt={10} >
        <Center>
          <Stack
            border='1px'
            borderColor={colorMode === 'light' ? ' #C5CFDC' : '#ffffff29'}
            p={10}
            borderRadius={8}
            minW={300}
            w='500px'
            pos='relative'
            direction={['column', 'row']}
            alignItems='center'
            spacing={8}
          >
            <Badge
              pos="absolute"
              right={4}
              top={3}
            >Admin</Badge>
            <Image boxSize='150px'
              src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' />
            <Box >
              <Text fontSize='2xl'>{user.name}
              </Text>
              <Text
                color={colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700'}
              >{user.email}</Text>
              <DrawerUpdateUser user={user} updateUser={updateUser} />
            </Box>
          </Stack>
        </Center>
      </Container>
    </Box >
  )
}

export default Profile

const DrawerUpdateUser = ({ user, updateUser }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({ name, email })
    onClose()
  }

  return (
    <>

      <IconButton
        color={'gray'}
        position={'absolute'}
        bottom={2}
        right={2}
        variant={'ghost'}
        icon={
          <Icon as={EditIcon} />
        }
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cambiar. . .</DrawerHeader>

          <DrawerBody
            onSubmit={handleSubmit}
            as={'form'} border={0} id='edituser'>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder={user.name} />
              <FormLabel mt={6}>Email</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email} />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' colorScheme='blue' form='edituser'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}