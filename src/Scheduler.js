import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const SchedulerComponent = () => {
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(events);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };
    fetchData();
  }, []);

  const commitChanges = async ({ added, changed, deleted }) => {
    try {
      if (added) {
        const docRef = await addDoc(collection(db, "events"), added);
        setData([...data, { id: docRef.id, ...added }]);
      }
      if (changed) {
        const updatedData = data.map(appointment => (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        setData(updatedData);
        for (const id in changed) {
          const eventRef = doc(db, "events", id);
          await updateDoc(eventRef, changed[id]);
        }
      }
      if (deleted) {
        const updatedData = data.filter(appointment => appointment.id !== deleted);
        setData(updatedData);
        await deleteDoc(doc(db, "events", deleted));
      }
    } catch (error) {
      console.error("Error committing changes: ", error);
    }
  };

  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState currentDate={currentDate} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView />
        <WeekView />
        <MonthView />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
};

export default SchedulerComponent;
