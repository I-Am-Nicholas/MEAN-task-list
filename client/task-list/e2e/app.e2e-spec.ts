describe('Task-List App', () => {

  beforeEach(() => {
    browser.get("http://localhost:3000/");
  });

  let taskList = element(by.tagName("ul"));

  describe('Home Page',() => {

    it('Pre-interaction elements', () => {
      expect(browser.getTitle()).toEqual('Task List');
      expect(taskList.getText()).toBe("Polish Mark VII armour.\nTake Mark VII for test flight.\nDefeat super-villains");
    });

  })


});
