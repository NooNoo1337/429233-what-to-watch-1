import * as React from 'react';
import * as renderer from 'react-test-renderer';

import VideoPlayer from './video-player';
const mockVideo = [
  {
    'preview_image': `img/the-grand-budapest-hotel.jpg`,
    'preview_video_link': `https://some-link`,
  }
];

describe(`GenresListComponent`, () => {
  it(`should render component correctly`, () => {
    const tree = renderer
      .create(<VideoPlayer
        posterSrc={mockVideo[`preview_image`]}
        videoSrc={mockVideo[`preview_video_link`]}
        videoFormat="video/mp4"
        isVideoPlaying={false}
        isSoundOff={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
