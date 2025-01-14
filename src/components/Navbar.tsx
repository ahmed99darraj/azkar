import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box bg="green.500" px={4} py={3}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Heading as="h1" size="lg" color="white">
          الموسوعة الإسلامية
        </Heading>
        <Flex gap={6}>
          <Text
            color="white"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => navigate('/')}
          >
            الرئيسية
          </Text>
          <Text
            color="white"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => navigate('/azkar')}
          >
            الأذكار
          </Text>
          <Text
            color="white"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => navigate('/radio')}
          >
            الراديو
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
