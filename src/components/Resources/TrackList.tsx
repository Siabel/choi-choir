"use client";

import { useState, useRef } from "react";

interface Track {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  lyrics: string;
}

const dummyTracks: Track[] = [
  {
    id: "1",
    title: "연습곡 1",
    description: "첫 번째 연습곡",
    audioUrl: "/dummy/track1.mp3",
    lyrics: "가사 1\n가사 2\n가사 3",
  },
  {
    id: "2",
    title: "연습곡 2",
    description: "두 번째 연습곡",
    audioUrl: "/dummy/track2.mp3",
    lyrics: "가사 A\n가사 B",
  },
];

export default function TrackList() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };

  return (
    <div className="space-y-4">
      {dummyTracks.map((track) => (
        <div
          key={track.id}
          className="bg-white shadow p-4 rounded flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{track.title}</h3>
              <p className="text-sm text-gray-600">{track.description}</p>
            </div>
            <button
              onClick={() => handlePlay(track)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              재생
            </button>
          </div>

          {currentTrack?.id === track.id && (
            <div className="mt-4">
              <audio
                ref={audioRef}
                src={currentTrack.audioUrl}
                controls
                className="w-full"
              />
              <pre className="mt-2 bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                {currentTrack.lyrics}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}