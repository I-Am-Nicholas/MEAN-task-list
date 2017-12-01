describe('Task-List App', () => {

  beforeEach(() => {
    browser.get("http://localhost:3000/");
  });

  let taskList = element(by.tagName("ul"));

  describe('Home Page',() => {

    it('should display the app\'s title', () => {
      expect(browser.getTitle()).toEqual('Task List');
      expect(taskList.isPresent()).toBe(true);
    });

  })


});
