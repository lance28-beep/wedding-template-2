'use client';

import { PrenupVideo } from './PrenupVideo';
import { audioPlayerMethods } from './AudioPlayer';

export const PrenupVideoWrapper = () => {
  return (
    <PrenupVideo 
      onVideoPlay={() => audioPlayerMethods.pauseAudio()}
      onVideoPause={() => audioPlayerMethods.resumeAudio()}
    />
  );
}; 