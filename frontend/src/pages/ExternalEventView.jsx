import { useEffect } from 'react';
import Activity from '../components/ExternalActivityDetails';
import { Container } from '@mantine/core';

import { useParams } from 'react-router-dom';
import { useGetActivityDetailsQuery } from '../slices/activitiesApiSlice';
import CopyURLButton from '../components/CopyUrlButton';

const ExternalEventView = () => {
  const { id: activityId } = useParams();

  const {
    data: activity,
    isLoading,
    error,
  } = useGetActivityDetailsQuery(activityId);

  // Use useEffect to execute side effects (like fetching data) after rendering
  useEffect(() => {
    // Fetch activity details here using activityId
  }, [activityId]); // Re-fetch data when activityId changes

  return (
    <Container>
      <h1>Activity Details</h1>
      <div className="buttons">
        <CopyURLButton />
      </div>
      {error && <p>Error: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      {activity && (
        <div>
          <Activity activity={activity} />
        </div>
      )}
    </Container>
  );
};

export default ExternalEventView;
