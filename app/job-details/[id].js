import { useCallback, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

// components
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';

// constants
import { COLORS, SIZES, icons } from '../../constants';

// hooks
import useFetch from '../../hooks/useFetch';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {

  const router = useRouter();
  const params = useLocalSearchParams();
  // const glob = useGlobalSearchParams();

  // console.log("Local:", local.id, "Global:", glob.id);

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id
  });

  const [refreshing, setRefreshing] = useState();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch();
    setRefreshing(false)
  }, [])

  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );
      case 'Qualifications':
        return <Specifics title='Qualifications' points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
      case 'Responsibilities':
        return <Specifics
          title='Responsibilities'
          points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
        />
      default:
        return null;
        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite, height: 300 },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={icons.left} dimension='60%' handlePress={() => router.back()} />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
        ),
        headerTitle: '',
      }} />

      <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {isLoading ? (
            <ActivityIndicator size='small' color={COLORS.primary} />
          ) : error ? (<Text> Something went wrong! </Text>) : data?.length === 0 ? (
            <Text> No data to display </Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                companyName={data[0].employer_name}
                jobTitle={data[0].job_title}
                location={data[0].job_country}
              />
              <JobTabs tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab} />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
      </>
    </SafeAreaView>
  )
}

export default JobDetails;