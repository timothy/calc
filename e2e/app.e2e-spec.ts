import { WorkTimeCountDownDesktopPage } from './app.po';

describe('work-time-count-down-desktop App', () => {
  let page: WorkTimeCountDownDesktopPage;

  beforeEach(() => {
    page = new WorkTimeCountDownDesktopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
