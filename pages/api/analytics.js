import { supabase } from '../../utils/supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (userError) throw userError

      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch total posts for the user
      const { count: totalPosts, error: postError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      if (postError) throw postError

      // Fetch user growth (posts in the last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      const { count: recentPosts, error: growthError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', thirtyDaysAgo)

      if (growthError) throw growthError

      res.status(200).json({
        user: userData,
        totalPosts,
        recentPosts
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
      res.status(500).json({ error: 'Failed to fetch analytics' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}