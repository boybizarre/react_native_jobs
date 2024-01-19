import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

import useFetch from '../../../hooks/useFetch';

import styles from './nearbyjobs.style';

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });

  console.log(data, 'fetched data');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary} />
        ) : error ? (
          <Text> Something went wrong! </Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              job={job}
              key={`nearby-job-${job.job_id}`}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
