import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  IconButton,
  useToast,
  Spinner,
  Image,
} from '@chakra-ui/react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { supabase, RadioStation } from '../config/supabase';

const Radio = () => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const { data, error } = await supabase
        .from('radio_stations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setStations(data || []);
    } catch (error) {
      console.error('Error fetching radio stations:', error);
      toast({
        title: 'خطأ في تحميل محطات الراديو',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (station: RadioStation) => {
    try {
      if (currentlyPlaying === station.id) {
        audioRef.current?.pause();
        setCurrentlyPlaying(null);
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(station.url);
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
        toast({
          title: 'خطأ في تشغيل البث',
          description: 'يرجى المحاولة مرة أخرى',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });

      setCurrentlyPlaying(station.id);

      toast({
        title: `جاري تشغيل ${station.name}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error in handlePlay:', error);
      toast({
        title: 'خطأ في تشغيل البث',
        description: 'يرجى المحاولة مرة أخرى',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} textAlign="center">إذاعات القرآن الكريم</Heading>

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {stations.map((station) => (
            <Box
              key={station.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {station.name}
                </Text>
                {station.reciter && (
                  <Text color="gray.600" fontSize="sm">
                    {station.reciter}
                  </Text>
                )}
                {station.description && (
                  <Text color="gray.600" fontSize="sm" mt={1}>
                    {station.description}
                  </Text>
                )}
              </Box>
              <IconButton
                aria-label={currentlyPlaying === station.id ? 'إيقاف' : 'تشغيل'}
                icon={currentlyPlaying === station.id ? <FaStop /> : <FaPlay />}
                colorScheme={currentlyPlaying === station.id ? 'red' : 'green'}
                onClick={() => handlePlay(station)}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Radio;
