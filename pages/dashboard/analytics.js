import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Analytics() {
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchAnalytics(session.user.id);
    }
  }, [session]);

  const fetchAnalytics = async (userId) => {
    try {
      const response = await fetch(`/api/analytics?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view analytics.</div>;
  }

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {analytics ? (
        <div>
          <p>Total Posts: {analytics.totalPosts}</p>
          <p>Recent Posts (last 30 days): {analytics.recentPosts}</p>
          {/* Add more analytics data as needed */}
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
}