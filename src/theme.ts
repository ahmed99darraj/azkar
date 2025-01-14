import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: '"Noto Sans Arabic", sans-serif',
    body: '"Noto Sans Arabic", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      defaultProps: {
        colorScheme: 'green',
      },
    },
    Card: {
      baseStyle: {
        container: {
          boxShadow: 'lg',
          rounded: 'lg',
          p: 4,
        },
      },
    },
  },
});

export default theme;
