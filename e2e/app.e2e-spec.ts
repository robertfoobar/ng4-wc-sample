import { Ng4WcConsumerPage } from './app.po';

describe('ng4-wc-consumer App', () => {
  let page: Ng4WcConsumerPage;

  beforeEach(() => {
    page = new Ng4WcConsumerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
