import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  direction: 'rtl',
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Select: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: 'green.500',
          },
        },
      },
    },
  },
});

export default theme;
