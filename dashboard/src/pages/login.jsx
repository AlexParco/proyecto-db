import {
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
    navigate('/', { replace: true })
  }

  return (
    <Flex
      flexDirection="column"
      p={8}
      as="form" onSubmit={handleSubmit}
    >
      <Heading mb={6}>Log In</Heading>
      <FormControl isRequired>
        <Input
          type='email'
          value={email}
          placeholder="Example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          mb={6}
        />
      </FormControl>
      <FormControl isRequired>
        <Input
          type='password'
          value={password}
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          mb={6}
          autoComplete='off'
        />
      </FormControl>
      <Button type="submit" colorScheme="teal" mb={6}>
        Log In
      </Button>
    </Flex>
  )
}

export default Login