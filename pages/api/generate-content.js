import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log('Received request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;

  if (!topic) {
    console.log('No topic provided');
    return res.status(400).json({ error: 'Topic is required' });
  }

  const prompt = `Generate a LinkedIn post about ${topic}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const generatedContent = response.choices[0].message.content.trim();
    console.log('Generated content:', generatedContent);
    res.status(200).json({ content: generatedContent });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
}