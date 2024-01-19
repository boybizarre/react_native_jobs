import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

import useFetch from '../../../hooks/useFetch';

import styles from './popularjobs.style';

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'React Developer',
    num_pages: 1,
  });

  const [selectedJob, setSelectedJob] = useState();

  const handlePress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  console.log(data, 'fetched data');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
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
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.job_id}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handlePress={handlePress}
                selectedJob={selectedJob}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
