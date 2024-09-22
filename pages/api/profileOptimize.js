import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profileSummary } = req.body;

  if (!profileSummary) {
    return res.status(400).json({ error: 'Profile summary is required' });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Optimize this LinkedIn profile summary for better engagement and professional appeal. Maintain the original tone and key points, but enhance clarity and impact:\n\n${profileSummary}`,
      max_tokens: 150,
      temperature: 0.7,
    });

    const optimizedSummary = response.data.choices[0].text.trim();
    res.status(200).json({ optimizedSummary });
  } catch (error) {
    console.error('Error optimizing profile:', error);
    res.status(500).json({ error: 'Failed to optimize profile summary' });
  }
}