import { Box, Container, Heading, Text, SimpleGrid, Card, CardBody } from '@chakra-ui/react';

const Home = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="2xl" mb={4}>
          مرحباً بكم في الموسوعة الإسلامية
        </Heading>
        <Text fontSize="xl">
          مصدر شامل للأذكار والقرآن الكريم
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Card>
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>
              الأذكار
            </Heading>
            <Text>
              مجموعة متنوعة من الأذكار والأدعية من مصادر موثوقة
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading as="h3" size="lg" mb={4}>
              راديو القرآن
            </Heading>
            <Text>
              استمع إلى تلاوات القرآن الكريم من 18 قارئ مختلف
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
