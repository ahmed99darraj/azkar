import { useState, useEffect } from 'react';
import { Box, Container, Heading, SimpleGrid, Card, CardBody, Text, Button, useToast } from '@chakra-ui/react';
import { supabase } from '../config/supabase';

interface RadioStation {
  id: number;
  name: string;
  url: string;
  description?: string;
}

const Radio = () => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const { data, error } = await supabase
          .from('radio_stations')
          .select('*')
          .order('id');

        if (error) throw error;
        setStations(data || []);
      } catch (error) {
        console.error('Error fetching radio stations:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء تحميل محطات الراديو',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchStations();
  }, [toast]);

  const playStation = (station: RadioStation) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(station.url);
    newAudio.play().catch((error) => {
      console.error('Error playing audio:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تشغيل المحطة',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });

    setAudio(newAudio);
    setCurrentStation(station);
  };

  const stopPlaying = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setCurrentStation(null);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" mb={4}>
          راديو القرآن الكريم
        </Heading>
        {currentStation && (
          <Text fontSize="lg" color="green.500" mb={4}>
            يتم الآن تشغيل: {currentStation.name}
          </Text>
        )}
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {stations.map((station) => (
          <Card key={station.id}>
            <CardBody>
              <Text fontSize="lg" mb={2}>
                {station.name}
              </Text>
              {station.description && (
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {station.description}
                </Text>
              )}
              <Button
                colorScheme="green"
                onClick={() => playStation(station)}
                mr={2}
              >
                تشغيل
              </Button>
              {currentStation?.id === station.id && (
                <Button colorScheme="red" onClick={stopPlaying}>
                  إيقاف
                </Button>
              )}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Radio;
