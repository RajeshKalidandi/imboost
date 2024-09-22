import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { content, scheduledFor, userId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        content,
        scheduledFor,
        userId,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error scheduling post' });
  }
}