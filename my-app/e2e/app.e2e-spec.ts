import { AppPage } from './app.po';

describe('mean App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Our MongoDB is Workings!');
  });
});
