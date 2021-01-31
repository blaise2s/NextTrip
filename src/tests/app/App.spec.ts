// src/tests/app/App.spec.tsx
import 'chromedriver';
import {
  Builder,
  By,
  Capabilities,
  ThenableWebDriver,
  until
} from 'selenium-webdriver';
// import Chrome from 'selenium-webdriver/chrome';
import assert from 'assert';

// const CHROME_OPTIONS = new Chrome.Options()
//   .headless();

const APP_URL = 'http://localhost:3000/';

describe('App Suite', () => {
  let driver: ThenableWebDriver;

  before(() => {
    driver = new Builder()
      .withCapabilities(Capabilities.chrome())
      // .setChromeOptions(CHROME_OPTIONS)
      .build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Opens app and verifies brand', async () => {
    await driver.get(APP_URL);
    assert.strictEqual(await driver.getCurrentUrl(), APP_URL);
    const brand = await driver.findElement(By.id('brand'));
    assert.strictEqual(await brand.getText(), 'NextTrip');
  });

  it('Navigates to by stop', async () => {
    const byStopButton = await driver.findElement(By.id('by-stop'));
    await byStopButton.click();
    const stopInputLabel = await driver.findElement(By.id('stop-input-label'));
    assert.strictEqual(await stopInputLabel.getText(), 'Stop Number');
  });

  it('Searches by stop with known stop', async () => {
    const stopInput = await driver.findElement(By.id('stop-input'));
    await stopInput.sendKeys(56338);
    const stopSearchButton = await driver.findElement(By.id('stop-search'));
    await stopSearchButton.click();
    const routeTableHeadCell = await driver.wait(
      until.elementLocated(By.id('table-head-cell-Route')),
      3000
    );
    assert.strictEqual(await routeTableHeadCell.getText(), 'Route');
  });

  it('Displays error message when searched by stop with invalid stop', async () => {
    const stopInput = await driver.findElement(By.id('stop-input'));
    await stopInput.sendKeys(12345);
    const stopSearchButton = await driver.findElement(By.id('stop-search'));
    await stopSearchButton.click();
    const invalidStop = await driver.wait(
      until.elementLocated(By.id('invalid-stop')),
      3000
    );
    assert.strictEqual(
      await invalidStop.getText(),
      'Stop 5633812345 does not exist'
    );
  });

  it('Navigates to by route', async () => {
    const byStopButton = await driver.findElement(By.id('by-route'));
    await byStopButton.click();
    const routeSelectLabel = await driver.wait(
      until.elementLocated(By.id('select-route-label')),
      3000
    );
    const directionSelectLabel = await driver.wait(
      until.elementLocated(By.id('select-direction-label')),
      3000
    );
    const stopSelectLabel = await driver.wait(
      until.elementLocated(By.id('select-stop-label')),
      3000
    );
    assert.strictEqual(await routeSelectLabel.getText(), 'Route');
    assert.strictEqual(await directionSelectLabel.getText(), 'Direction');
    assert.strictEqual(await stopSelectLabel.getText(), 'Stop');
  });

  it('Displays departures by route', async () => {
    const routeSelect = await driver.findElement(By.id('select-route'));
    await routeSelect.click();
    const blueRoute = await driver.wait(
      until.elementLocated(By.id('901')),
      3000
    );
    await blueRoute.click();
    const directionSelect = await driver.findElement(By.id('select-direction'));
    await directionSelect.click();
    const southbound = await driver.wait(
      until.elementLocated(By.id('1')),
      3000
    );
    await southbound.click();
    const stopSelect = await driver.findElement(By.id('select-stop'));
    await stopSelect.click();
    const usBankStop = await driver.wait(
      until.elementLocated(By.id('USB2')),
      3000
    );
    await usBankStop.click();
    const routeTableHeadCell = await driver.wait(
      until.elementLocated(By.id('table-head-cell-Route')),
      3000
    );
    assert.strictEqual(await routeTableHeadCell.getText(), 'Route');
  });
});
