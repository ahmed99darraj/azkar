import { useState, useEffect } from 'react';
import { Box, Container, Heading, SimpleGrid, Card, CardBody, Text, Spinner, Center, useToast } from '@chakra-ui/react';
import { supabase } from '../config/supabase';

interface Zikr {
  id: number;
  text: string;
  count?: number;
  description?: string;
  category?: string;
}

const Azkar = () => {
  const [azkar, setAzkar] = useState<Zikr[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchAzkar = async () => {
      try {
        const { data, error } = await supabase
          .from('azkar')
          .select('*')
          .order('id');

        if (error) throw error;
        setAzkar(data || []);
      } catch (error) {
        console.error('Error fetching azkar:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء تحميل الأذكار',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAzkar();
  }, [toast]);

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="green.500" />
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        الأذكار
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {azkar.map((zikr) => (
          <Card key={zikr.id}>
            <CardBody>
              <Text fontSize="lg" mb={4}>
                {zikr.text}
              </Text>
              {zikr.count && (
                <Text color="green.500" fontWeight="bold">
                  عدد المرات: {zikr.count}
                </Text>
              )}
              {zikr.description && (
                <Text mt={2} color="gray.600">
                  {zikr.description}
                </Text>
              )}
              {zikr.category && (
                <Text mt={2} color="blue.500">
                  {zikr.category}
                </Text>
              )}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Azkar;
