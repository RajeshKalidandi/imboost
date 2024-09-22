import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Scheduler() {
  const { data: session, status } = useSession();
  const [schedule, setSchedule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the schedule to your backend
    console.log('Schedule submitted:', schedule);
    // Reset the form
    setSchedule('');
  };

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to access the scheduler.</div>;
  }

  return (
    <div>
      <h1>Post Scheduler</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="Enter your posting schedule here..."
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Save Schedule</button>
      </form>
    </div>
  );
}