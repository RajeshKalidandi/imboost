import { useState } from 'react';

export default function TestGenerateContent() {
  const [prompt, setPrompt] = useState('');
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
        body: JSON.stringify({ prompt }),
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

  return (
    <div>
      <h1>Test Content Generation</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Generate Content</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generatedContent && (
        <div>
          <h2>Generated Content:</h2>
          <p>{generatedContent}</p>
        </div>
      )}
    </div>
  );
}