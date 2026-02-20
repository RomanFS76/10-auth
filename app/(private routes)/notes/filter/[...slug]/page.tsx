import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ search?: string; page?: string; tag?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug?.[0] === 'all' ? 'All' : slug?.[0];

  const title =
    tag === 'All'
      ? 'All notes | NoteHub'
      : `Notes filtered by ${tag} | NoteHub`;

  const description =
    tag === 'All'
      ? 'Browse all your notes in one place. Organize, search, and manage your thoughts with NoteHub.'
      : `Browse notes filtered by "${tag}". Stay organized and focused with NoteHub.`;

  const url =
    tag === 'All'
      ? 'https://notehub.io/notes'
      : `https://notehub.io/notes/filter/${slug?.[0]}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub filter',
        },
      ],
      type: 'website',
    },
  };
}

const NotesByCategory = async ({ params, searchParams }: Props) => {
  const { slug } = await params;

  const search = (await searchParams)?.search || '';
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];
  const page = Number((await searchParams)?.page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
