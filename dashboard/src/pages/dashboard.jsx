import {
  Box,
  Container,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber
} from "@chakra-ui/react"
import Cards from "../components/cards"

const Dashboard = () => {
  return (
    <Box as="main" pt={20}>
      <Container maxW="850px" pt={10} >
        <Cards />

      </Container>
    </Box>
  )
}

export default Dashboard