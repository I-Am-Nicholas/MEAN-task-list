
describe('task-list App', () => {

  beforeEach(() => {
    browser.get("http://localhost:3000/");
  });

  it('should display welcome message', () => {
    expect(browser.getTitle()).toEqual('TaskList');
  });
  
});
