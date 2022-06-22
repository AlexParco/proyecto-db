import {
  Box,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode
} from "@chakra-ui/react"

const Cards = () => {
  const { colorMode } = useColorMode()
  return (
    <StatGroup
      p={4}
      border='1px'
      borderRadius={8}
      borderColor={colorMode === 'light' ? '#C5CFDC' : '#ffffff29'}
    >
      <Stat
      >
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>
      <Stat
      >
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>
      <Stat
      >
        <StatLabel>Sent</StatLabel>
        <StatNumber>345,670</StatNumber>
        <StatHelpText>
          <StatArrow type='increase' />
          23.36%
        </StatHelpText>
      </Stat>
    </StatGroup >
  )
}

export default Cards