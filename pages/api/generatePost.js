import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a LinkedIn post about ${topic}`,
      max_tokens: 100,
      temperature: 0.7,
    });

    const generatedPost = response.data.choices[0].text.trim();
    res.status(200).json({ post: generatedPost });
  } catch (error) {
    console.error('Error generating post:', error);
    res.status(500).json({ error: 'Failed to generate post' });
  }
}