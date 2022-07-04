import { chakra, Box, Flex, Image, Link, Heading } from "@chakra-ui/react"

const Extras = () => {
  return (
    <>
      <Heading mb="40px">Employees</Heading>
      <Flex
        mb={6}
        gap="20px"
      >
        <Box
          w="xs"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mx="auto"
        >
          <Image
            w="full"
            h={56}
            fit="cover"
            src="https://bit.ly/code-beast"
            alt="avatar"
          />

          <Box py={5} textAlign="center">
            <Link
              display="block"
              fontSize="2xl"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontWeight="bold"
            >
              Leo Tioluwani
            </Link>
            <chakra.span
              fontSize="sm"
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              Software Engineer
            </chakra.span>
          </Box>
        </Box>
        <Box
          w="xs"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mx="auto"
        >
          <Image
            w="full"
            h={56}
            fit="cover"
            src='https://bit.ly/dan-abramov'
            alt="avatar"
          />

          <Box py={5} textAlign="center">
            <Link
              display="block"
              fontSize="2xl"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontWeight="bold"
            >
              Dan Abramov
            </Link>
            <chakra.span
              fontSize="sm"
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              Product manager
            </chakra.span>
          </Box>
        </Box>
        <Box
          w="xs"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          mx="auto"
        >
          <Image
            w="full"
            h={56}
            fit="cover"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
          />

          <Box py={5} textAlign="center">
            <Link
              display="block"
              fontSize="2xl"
              color="gray.800"
              _dark={{
                color: "white",
              }}
              fontWeight="bold"
            >
              John Doe
            </Link>
            <chakra.span
              fontSize="sm"
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
            >
              Software Engineer
            </chakra.span>
          </Box>
        </Box>
      </Flex>

    </>
  )
}

export default Extras
