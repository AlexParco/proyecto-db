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
    <>
      <StatGroup
        mt={10}
        p={4}
        border='1px'
        borderRadius={8}
        borderColor={colorMode === 'light' ? '#C5CFDC' : '#ffffff29'}
      >
        <Stat
        >
          <StatLabel>Sent</StatLabel>
          <StatNumber>89,2</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23%
          </StatHelpText>
        </Stat>
        <Stat
        >
          <StatLabel>Sent</StatLabel>
          <StatNumber>504,00</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            50%
          </StatHelpText>
        </Stat>
        <Stat
        >
          <StatLabel>Sent</StatLabel>
          <StatNumber>70,23</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            54.50%
          </StatHelpText>
        </Stat>
      </StatGroup >
      <StatGroup
        p={4}
        border='1px'
        borderRadius={8}
        mt={10} borderColor={colorMode === 'light' ? '#C5CFDC' : '#ffffff29'}
      >
        <Stat
        >
          <StatLabel>Sent</StatLabel>
          <StatNumber>123,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            21.34%
          </StatHelpText>
        </Stat>
        <Stat
        >
          <StatLabel>Sent</StatLabel>
          <StatNumber>40.50</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            90%
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
    </>
  )
}

export default Cards