import { GroupByArtistPipe } from './group-by-artist.pipe';

describe('GroupByArtistPipe', () => {
  it('create an instance', () => {
    const pipe = new GroupByArtistPipe();
    expect(pipe).toBeTruthy();
  });
});
