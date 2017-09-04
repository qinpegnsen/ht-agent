import { Ng2anglePage } from './app.po';

describe('hawthorn-agent App', function() {
  let page: Ng2anglePage;

  beforeEach(() => {
    page = new Ng2anglePage();
  });

  it('should display Angle in h1 tag', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angle');
  });
});
