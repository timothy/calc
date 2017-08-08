import { TimeSheetAppPage } from './app.po';

describe('time-sheet-app App', () => {
  let page: TimeSheetAppPage;

  beforeEach(() => {
    page = new TimeSheetAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
