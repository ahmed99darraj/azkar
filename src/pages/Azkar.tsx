import { useEffect, useState } from 'react';
import { Box, Container, Heading, SimpleGrid, Text, Select, Spinner, useToast } from '@chakra-ui/react';
import { supabase, Zikr, Category } from '../config/supabase';

const Azkar = () => {
  const [azkar, setAzkar] = useState<Zikr[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchCategories();
    fetchAzkar();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'خطأ في تحميل التصنيفات',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchAzkar = async () => {
    try {
      setLoading(true);
      let query = supabase.from('azkar').select('*');
      
      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory);
      }

      const { data, error } = await query.order('id');
      
      if (error) throw error;
      setAzkar(data || []);
    } catch (error) {
      console.error('Error fetching azkar:', error);
      toast({
        title: 'خطأ في تحميل الأذكار',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAzkar();
  }, [selectedCategory]);

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading mb={4} textAlign="center">الأذكار</Heading>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          mb={6}
        >
          <option value="all">جميع الأذكار</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} {category.icon}
            </option>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {azkar.map((zikr) => (
            <Box
              key={zikr.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
            >
              <Text fontSize="lg" mb={3}>
                {zikr.text}
              </Text>
              {zikr.count && (
                <Text color="gray.600" fontSize="sm">
                  عدد المرات: {zikr.count}
                </Text>
              )}
              {zikr.description && (
                <Text color="gray.600" fontSize="sm" mt={2}>
                  {zikr.description}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Azkar;
