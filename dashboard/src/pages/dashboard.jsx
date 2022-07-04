import {
  Box,
  Container,
} from "@chakra-ui/react"
import Cards from "../components/cards"
import Extras from "../components/extras"
import TableEmployees from "../components/tableemployees"

const Dashboard = () => {

  return (
    <Box as="main">
      <Container maxW="1050px" >
        <Extras />
        <TableEmployees />
        <Cards />
      </Container>
    </Box>
  )
}

export default Dashboard