import { UQAdminPage } from './app.po';

describe('uqadmin App', () => {
  let page: UQAdminPage;

  beforeEach(() => {
    page = new UQAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
