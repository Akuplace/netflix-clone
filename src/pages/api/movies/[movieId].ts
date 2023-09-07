import type {NextApiRequest, NextApiResponse} from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import {Prisma} from '.prisma/client';
import SelectSubset = Prisma.SelectSubset;
import MovieFindUniqueOrThrowArgs = Prisma.MovieFindUniqueOrThrowArgs;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const {movieId} = req.query;

    if (typeof movieId !== 'string' || !movieId) {
      throw new Error('Invalid Id');
    }

    const movie = await prismadb.movie.findUniqueOrThrow({
      where: {id: movieId},
    });

    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    return res.status(400).end();
  }
}
