import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('white', '#202023')(props)
    },
    form: {
      bg: mode('', '')(props),
      border: '1px',
      borderColor: mode('#C5CFDC', '#ffffff29')(props),
    },
  })
}

const component = {
  TableContainer: {
    border: '1px',
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, component })

export default theme
