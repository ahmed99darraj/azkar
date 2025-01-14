import { Box, Flex, Link, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="green.500" px={4} py={3}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Heading as="h1" size="lg" color="white">
          الموسوعة الإسلامية
        </Heading>
        <Flex gap={6}>
          <Link as={RouterLink} to="/" color="white" fontWeight="bold">
            الرئيسية
          </Link>
          <Link as={RouterLink} to="/azkar" color="white" fontWeight="bold">
            الأذكار
          </Link>
          <Link as={RouterLink} to="/radio" color="white" fontWeight="bold">
            الراديو
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
