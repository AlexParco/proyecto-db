import { Box, Container } from "@chakra-ui/react"
import NavBar from "../components/navbar"

const Main = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Container maxW="850px" pt={20} >
        {children}
      </Container>
    </Box>
  )
}

export default Main