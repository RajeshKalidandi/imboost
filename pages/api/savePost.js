import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, post } = req.body;

  if (!userId || !post) {
    return res.status(400).json({ error: 'User ID and post content are required' });
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ user_id: userId, content: post }]);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
}