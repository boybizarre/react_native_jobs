import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endPoint, query) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    headers: {
      'X-RapidAPI-Key': '228f85ca7dmsheb0a6b839d87a20p183b19jsnc707cbff8f01',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {
      ...query
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error.response.data.message, 'fetch error');
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch }
}

export default useFetch;