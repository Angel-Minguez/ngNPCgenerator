import { NgNPCgeneratorPage } from './app.po';

describe('ng-npcgenerator App', () => {
  let page: NgNPCgeneratorPage;

  beforeEach(() => {
    page = new NgNPCgeneratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
