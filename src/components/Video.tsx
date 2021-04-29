import React from 'react';
import { iImage } from '../consts/types';

type VideoProps = {
  video: iImage;
  height: number;
  width: number;
};

const Video: React.FC<VideoProps> = ({ video, height, width }) => {
  return (
    <video
      controls
      onClick={() => {}}
      poster={video.urlSmall}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <source src={video.videoUrl ?? undefined} type="video/mp4" />
    </video>
  );
};

export default Video;
