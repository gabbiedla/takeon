import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateActivityMutation,
  useGetActivityDetailsQuery,
  useDeleteActivityMutation,
} from '../slices/activitiesApiSlice';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const ActivityEdit = () => {
  const { id: activityId } = useParams();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [, setDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');
  const [capacity, setCapacity] = useState('');
  const [category, setCategory] = useState('');
  const [timeZone] = useState(dayjs.tz.guess());

  const {
    data: activity,
    isLoading,
    refetch,
    error,
  } = useGetActivityDetailsQuery(activityId);

  //   console.log(activity);

  const [updateActivity, { isLoading: LoadingUpdate }] =
    useUpdateActivityMutation();

  const navigate = useNavigate();

  //reutrn all product details
  useEffect(() => {
    if (activity) {
      console.log('Received Activity from API', { activity });

      setName(activity.name || '');
      setLocation(activity.location || '');
      setDate(activity.date || '');
      setFormattedDate(activity.date || '');
      setTime(activity.time || '');
      setUrl(activity.url || '');
      setCapacity(activity.capacity || '');
      setCategory(activity.category || '');
    }
  }, [activity, timeZone]);

  const formatDate = (inputDate) => {
    // Implement your date formatting logic here
    // For example, you can use the Date object to format the date
    const formatted = new Date(inputDate).toISOString().split('T')[0];
    return formatted;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedActivity = {
      _id: activityId,
      name,
      location,
      date: formattedDate,
      time,
      url,
      capacity,
      category,
      timeZone,
    };

    const result = await updateActivity(updatedActivity);
    refetch();

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Activity updated');
      console.log('Navigating to view activity');
      navigate(`/activity/${activityId}/view`);
    }
  };

  const [deleteActivity, { isLoading: loadingDelete }] =
    useDeleteActivityMutation();

  const deleteHandler = async (id) => {
    console.log('Before deleteActivity');
    if (window.confirm('Are you sure?')) {
      try {
        await deleteActivity(id);
        console.log('After deleteActivity');
        refetch();
        // navigate('/');
        navigate('/home/:userId');
      } catch (err) {
        console.error('Error deleting activity:', err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Link
        to="/home/:userId"
        className="btn btn-light my-3 ga4-event-back-btn"
      >
        Go Back
      </Link>
      {isLoading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div>
          <h2>Error: {error}</h2>
        </div>
      )}
      <FormContainer>
        <h1>Edit Activity</h1>
        {LoadingUpdate && <Loader />}
        {loadingDelete && <Loader />}

        {/* {isLoading ? <Loading />} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              value={formattedDate}
              //   onChange={(e) => setDate(e.target.value)}
              onChange={(e) => {
                // Update the formatted date state when the user selects a new date
                const selectedDate = e.target.value;
                setDate(selectedDate); // Update the raw date state if needed
                setFormattedDate(formatDate(selectedDate));
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="capacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-2 ga4-event-update-btn"
          >
            Update
          </Button>
          <Button
            variant="danger"
            className="my-2 ga4-event-delete-btn"
            onClick={() => deleteHandler(activity._id)}
          >
            Delete
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ActivityEdit;
