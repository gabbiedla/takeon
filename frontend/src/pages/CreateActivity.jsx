import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Input,
  NativeSelect,
  Button,
  Space,
  NumberInput,
  Group,
} from '@mantine/core';

import { TimeInput, DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { IconDeviceFloppy } from '@tabler/icons-react';

dayjs.extend(timezone);

/**
 * Page with the form to create a new activity
 * @TODO: extract to reuse when editing an activity
 *
 * @returns {JSX.Element} Page to create a new activity
 */
const CreateActivity = () => {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState({
    name: '',
    date: dayjs().add(1, 'week'),
    location: '',
    url: '',
    time: '18:00',
    capacity: '', // Default value
    category: '',
    timeZone: dayjs.tz.guess(),
  });

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if the user is logged in (you can customize this based on your authentication logic)
    const isLoggedIn = !!localStorage.getItem('userInfo');

    if (!isLoggedIn) {
      // If user is not logged in, you may redirect them to the login page or show an error message
      console.error(
        'User is not logged in. Redirect to login page or show an error.'
      );
      return navigate('/');
    }
  }, [navigate]);

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting activity data:', activityData);

    try {
      const [formattedDate = ''] = activityData.date.toISOString().split('T');

      console.log({ formattedDate });
      // Create a new object with the formatted date
      const requestData = {
        ...activityData,
        date: formattedDate,
      };

      console.log('POST activity data:', { activity: requestData });

      const response = await axios.post('/api/activities', requestData);

      console.log('Activity created:', { response: response.data });
      console.log('Navigating to view activity:', response.data?._id);
      navigate(`/activity/${response.data._id}/view`);
    } catch (error) {
      console.error('Error creating activity:', { error });
    }
  };

  // If the user is not logged it, it would have been redirected. This would never be reached.
  if (!userInfo) {
    return <div>User is not logged in.</div>;
  }

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <Container className="activity-form-container rounded">
        <h4 className="form-title">Event Details</h4>
        <h6 className="sub-title">
          Unsure about the details? You can edit the details later.{' '}
        </h6>
        <Input.Wrapper label="Activity Name *">
          <Input
            type="text"
            name="name"
            value={activityData.name}
            onChange={handleChange}
          />
        </Input.Wrapper>

        <Input.Wrapper label="Location">
          <Input
            type="text"
            name="location"
            value={activityData.location}
            onChange={handleChange}
          />
        </Input.Wrapper>

        <DatePickerInput
          label="Date"
          firstDayOfWeek={0}
          valueFormat="MM/DD/YYYY"
          value={activityData.date}
          onChange={(value) =>
            setActivityData({ ...activityData, date: value })
          }
        />

        <TimeInput
          label="Time"
          format="12"
          value={activityData.time}
          onChange={handleChange}
          name="time"
        />

        <Input.Wrapper label="Got a link? Share it here!">
          <Input
            type="text"
            name="url"
            value={activityData.url}
            onChange={handleChange}
          />
        </Input.Wrapper>

        <Input.Wrapper label="How many people can join?">
          <NativeSelect
            name="capacity"
            value={activityData.capacity}
            onChange={handleChange}
            data={[
              '',
              'group',
              ...Array.from(Array(20).keys()).map((number) =>
                (number + 1).toString()
              ),
            ]}
          />
        </Input.Wrapper>
        {/* <Input.Wrapper label="Accepting">
          <Group>
            Dropdown for predefined ranges
            <NativeSelect
              name="predefinedRange"
              value={activityData.predefinedRange}
              onChange={(event) => {
                const range = event.target.value.split('-');
                handleChange({
                  target: {
                    name: 'capacity',
                    value: { min: range[0] || '', max: range[1] || '' },
                  },
                });
              }}
              data={[
                { value: '', label: 'Select a range' },
                { value: '1-5', label: '1-5' },
                { value: '6-10', label: '6-10' },
                { value: '11-20', label: '11-20' },
              ]}
            />

            Custom Min/Max Input
            <NumberInput
              placeholder="Min"
              value={activityData.capacity.min || ''}
              onChange={(value) =>
                handleChange({
                  target: {
                    name: 'capacity',
                    value: { ...activityData.capacity, min: value || '' },
                  },
                })
              }
            />
            <NumberInput
              placeholder="Max"
              value={activityData.capacity.max || ''}
              onChange={(value) =>
                handleChange({
                  target: {
                    name: 'capacity',
                    value: { ...activityData.capacity, max: value || '' },
                  },
                })
              }
            />
          </Group>
        </Input.Wrapper> */}

        <Input.Wrapper label="Category (for your visibility)">
          <Input
            type="text"
            name="category"
            value={activityData.category}
            onChange={handleChange}
          />
        </Input.Wrapper>
        <Space h="md" />
        <Button
          className="ga4-create-submit-btn"
          // data-ga="create-activity-submit"
          type="submit"
        >
          {/* <IconDeviceFloppy /> &nbsp;Add */}
          <strong>Create</strong>
        </Button>
      </Container>
    </form>
  );
};

export default CreateActivity;
