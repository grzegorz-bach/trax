import { Playlist, Song, User } from "@prisma/client";
import React from "react";
import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/SongTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { getColor } from "../../utils/helpers";

type Props = {
  playlist: Playlist & { songs: Song[] };
};

const PlaylistPage = ({ playlist }: Props) => {
  const color = getColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  try {
    const { id }: User = validateToken(req.cookies.TRAX_ACCESS_TOKEN);

    const playlist = await prisma.playlist.findFirst({
      where: {
        id: +query.id,
        userId: id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return {
      props: {
        playlist,
      },
    };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

export default PlaylistPage;
