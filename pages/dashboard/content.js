import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Content() {
  const { data: session, status } = useSession();
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGeneratedContent('');

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate content. Please try again.');
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to access content generation.</div>;
  }

  return (
    <div>
      <h1>Generate LinkedIn Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic for your LinkedIn post..."
        />
        <button type="submit">Generate Post</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generatedContent && (
        <div>
          <h2>Generated LinkedIn Post:</h2>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
}