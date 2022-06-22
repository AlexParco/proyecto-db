import {
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth.context"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()
    loginUser({ email, password })

    navigate('/')
  }

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        p={12}
        borderRadius={8}
        as="form" onSubmit={handleSubmit}
      >
        <Heading mb={6}>Log In</Heading>
        <FormControl isRequired>
          <Input
            type='email'
            value={email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            mb={6}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            type='password'
            value={password}
            placeholder="#########"
            onChange={(e) => setPassword(e.target.value)}
            mb={6}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mb={6}>
          Log In
        </Button>
      </Flex>
    </Flex >
  )
}

export default Login