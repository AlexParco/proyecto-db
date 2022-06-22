import TableEmployees from '../components/tableemployees'
import { Box, Container } from "@chakra-ui/react"

const Employees = () => {

  return (
    <Box as="main" pt={20}>
      <Container maxW="850px" pt={10} >
        <TableEmployees />
      </Container>
    </Box>
  )
}

export default Employees