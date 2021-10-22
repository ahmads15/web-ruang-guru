import * as randomstring from 'randomstring';

const fs = require('fs');
const chai = require('chai');

const expectChai = chai.expect;
chai.use(require('chai-sorted'));

const { client } = require('nightwatch-api');

const timeOut = 30000;

// wait until element is present
export const waitElementPresent = async (elementSelector, customTimeout=timeOut) => {
  await client.waitForElementPresent(elementSelector, customTimeout);
};

export const waitUntilElementNotPresent = async (elementSelector) => {
  await client.waitForElementPresent(elementSelector, timeOut);
  await client.waitForElementNotPresent(elementSelector, timeOut);
};

// wait until element is visible
export const waitElementVisible = async (elementSelector) => {
  await waitElementPresent(elementSelector);
  await client.waitForElementVisible(elementSelector, timeOut);
};

// click element wait for present and visible
export const clickElement = async (elementSelector) => {
  await waitElementVisible(elementSelector);
  await client.click(elementSelector);
};

export const findElementviaXpath = async (elementSelector) => {
  client.useXpath();
  await waitElementVisible(elementSelector);
  client.useCss();
};

export const clickElementViaXpath = async (elementSelector) => {
  client.useXpath();
  await waitElementVisible(elementSelector);
  await client.click(elementSelector);
  client.useCss();
};

export const clickElementViaInject = async (elementSelector) => {
  await client.execute(function(selector) {
    document.querySelector(selector).click();
  }, [elementSelector])
};

// set value to element
export const setValueElement = async (elementSelector, value) => {
  await waitElementVisible(elementSelector);
  await client.clearValue(elementSelector);
  await client.setValue(elementSelector, value);
};

export const setValueElementViaXpath = async (elementSelector, value) => {
  client.useXpath();
  await waitElementVisible(elementSelector);
  await client.clearValue(elementSelector);
  await client.setValue(elementSelector, value);
  client.useCss();
};

// set value to element then press ENTER
export const setValueElementThenEnter = async (elementSelector, value) => {
  await waitElementVisible(elementSelector);
  await client.clearValue(elementSelector);
  await client.setValue(elementSelector, [value, client.Keys.ENTER]);
};

export const pressDown = async () => {
  await client.Keys.DOWN;
};

export const elementIsVisible = async (elementSelector) => {
  let cekIsVisible;
  await client.isVisible(elementSelector, (result) => {
    cekIsVisible = result.value;
  });
  return cekIsVisible;
};

export const getElementsLength = async (using, locator) => {
  let getLength;
  await client.elements(using, locator, (result) => {
    getLength = result.value.length;
  });
  return getLength;
};

// get text from element
export const getStringText = async (elementSelector) => {
  let text;
  await waitElementVisible(elementSelector);
  await client.getText(elementSelector, (result) => {
    text = result.value;
  });
  return text;
};

export const getStringTextXpath = async (elementSelector) => {
  let text;
  client.useXpath();
  await waitElementVisible(elementSelector);
  await client.getText(elementSelector, (result) => {
    text = result.value;
  });
  client.useCss();
  return text;
};

export const getElementsLengthXpath = async (using, locator) => {
  let getLength;
  client.useXpath();
  await client.elements(using, locator, (result) => {
    getLength = result.value.length;
  });
  client.useCss();
  return getLength;
};

export const getStringText2 = async (elementSelector) => {
  let text;
  await client.getText(elementSelector, (result) => {
    text = result.value;
  });
  return text;
};

export const getStringText3 = async (using, locator) => {
  client.getText(using, locator, (result) => {
    text = result.value;
  });
  return text;
};

export const getAttributeValue = async (elementSelector, attribute) => {
  let text;
  await client.getAttribute(elementSelector, attribute, (result) => {
    text = result.value;
  });
  return text;
};

export const getArrayLength = async (using, elementSelector) => {
  await client.elements(using, elementSelector, (result) => {
    getLength = result.value;
  });
  return getLength;
};

export const getStringTextElementXpath = async (elementSelector) => {
  await waitElementVisible(elementSelector);
  await client.useXpath().getText(elementSelector, (result) => {
    text = result.value;
  });
  return text;
};

// scroll to element
export const scrollToElement = async (elementSelector) => client.moveToElement(elementSelector, 0, 0);
// scroll to element via xpath
export const scrollToElementViaXPath = async (elementSelector) => {
  client.useXpath();
  await client.moveToElement(elementSelector, 0, 0);
  client.useCss();
};

// scroll down workaround (using filter in plp) USE WITH CAUTION
// emulate pressing space button on a page by setting a
// space value to an element that CAN NOT receive value
export const scrollDown = async (elementSelector) => client.setValue(elementSelector, ' ');

// assert value between
export const rupiahPlain = async (elementSelector) => {
  await scrollToElement(elementSelector);
  texts = await getStringText(elementSelector);
  let textPolos = String(texts).split('.').join('');
  textPolos = textPolos.replace('Rp', '');
  return textPolos;
};

export const assertElementEqualText = async (elementSelector, expectedText) => {
  await waitElementVisible(elementSelector);
  return client.getText(elementSelector, async (result) => this.assert.equal(result.value, expectedText));
};

export const assertEqualText = async (actualText, ExpectedText) => {
  await waitElementVisible(actualText);
  return this.assert.equal(actualText, ExpectedText);
};

// get value field
export const getValue = async (elementSelector) => {
  let text;
  await waitElementVisible(elementSelector);
  await client.getValue(elementSelector, (result) => {
    text = result.value;
  });
  return text;
};

// expect value field is equal
export const expectValueFieldIsEqual = async (elementSelector, expectedText) => {
  await waitElementPresent(elementSelector);
  const texts = await getValue(elementSelector);
  return client.assert.equal(texts, expectedText);
};

// check if the given element contains the specific text
export const assertContainsText = async (elementSelector, expectedText) => {
  await waitElementVisible(elementSelector);
  return client.assert.containsText(elementSelector, expectedText);
};

export const expectNotContainsText = async (elementSelector, expectedText) => {
  await waitElementVisible(elementSelector);
  return client.expect.element(elementSelector).text.to.not.contain(expectedText);
};

// check if the given element equals the specific text
export const expectElementEqualText = async (elementSelector, expectedText) => {
  await waitElementVisible(elementSelector);
  await client.expect.element(elementSelector).text.to.equal(expectedText);
};

export const expectElementEqualTextXpath = async (elementSelector, expectedText) => {
  client.useXpath();
  await waitElementVisible(elementSelector);
  await client.expect.element(elementSelector).text.to.equal(expectedText);
  client.useCss();
};

export const expectElementNotEqualText = async (elementSelector, expectedText) => {
  await waitElementVisible(elementSelector);
  return client.expect.element(elementSelector).text.to.not.equal(expectedText);
};

export const expectElementEqualValue = async (elementSelector, expectedValue) => {
  await waitElementVisible(elementSelector);
  return client.expect.element(elementSelector).to.have.value.that.equals(expectedValue);
};

// expect not equal value
export const expectElementNotEqualValue = async (elementSelector, expectedValue) => {
  await waitElementVisible(elementSelector);
  return client.expect.element(elementSelector).to.have.value.not.equals(expectedValue);
};

// assert page title
export const assertPageTitle = async (expectedValue) => client.assert.title(expectedValue);

// sleep/pause page
export const pauseSleep = async (timeSleep) => client.pause(timeSleep);

export const expectEnabled = async (elementSelector) => client.expect.element(elementSelector).to.be.enabled;

export const expectNotEnabled = async (elementSelector) => client.expect.element(elementSelector).to.not.be.enabled;

export const expectNotFound = async (elementSelector) => client.expect.element(elementSelector).not.to.be.present;

// expect to be visible
export const expectVisible = async (elementSelector) => {
  await waitElementVisible(elementSelector);
  return client.expect.element(elementSelector).to.be.visible;
};

// expect to be contains
export const expectElementContainText = async (elementSelector, expectedText) => {
  await waitElementVisible(elementSelector);
  return client.expect.element(elementSelector).text.to.contain(expectedText);
};

// expect to be present
export const expectPresent = async (elementSelector) => {
  await waitElementPresent(elementSelector);
  return client.expect.element(elementSelector).to.be.present;
};

export const expectPresentXpath = async (elementSelector) => {
  client.useXpath();
  await waitElementPresent(elementSelector);
  client.useCss();
};

// expect to not be visible
export const expectNotVisible = async (elementSelector) => client.expect.element(elementSelector).to.not.be.visible;

// choose an option from dropdown list
export const chooseOptionValue = async (elementSelector, selectedOption) => {
  waitElementVisible(elementSelector);
  return client.click(elementSelector, () => {
    pauseSleep(2000);
    if (selectedOption === '') { client.click(`${elementSelector}>option[value]`); } else { client.click(`${elementSelector}>option[value='${selectedOption}']`); }
  });
};

// choose an option from dropdown list based on the class
export const chooseOptionClass = async (elementSelector, value) => {
  waitElementVisible(elementSelector);
  return client.click(elementSelector, () => {
    if (value === '') {
      client.click(`${elementSelector}>option[class]`);
    } else {
      waitElementVisible(`${elementSelector}>option[class='ts-option-${value.replace(/\\|\/|\)|\(||\.|,|\s/g, '').toLowerCase()}']`);
      client.click(`${elementSelector}>option[class='ts-option-${value.replace(/\\|\/|\)|\(||\.|,|\s/g, '').toLowerCase()}']`);
    }
  });
};

export const expectElementSelected = async (elementSelector) => client.expect.element(elementSelector).to.be.selected;

export const assertElementNotPresent = async (elementSelector) => client.waitForElementNotPresent(elementSelector, timeOut);

export const waitUntilElementEnabled = async (elementSelector) => {
  await waitElementPresent(elementSelector);
  await client.waitForElementVisible(`${elementSelector}:enabled`, timeOut);
};

export const waitUntilElementDisabled = async (elementSelector) => {
  await waitElementPresent(elementSelector);
  await client.waitForElementVisible(`${elementSelector}:disabled`, timeOut);
};

export const deleteAllInputText = async () => {
  await client.keys([client.Keys.CONTROL, 'a'], () => {
    client.keys(client.Keys.DELETE);
  });
};

// switch windows to others tab page
export const switchWindows = async () => {
  await client.windowHandles((result) => {
    // 0 == current main window, 1 == new tab
    const handle = result.value[1];
    client.switchWindow(handle);
  });
};

export const stayWindows = async () => {
  await client.windowHandles((result) => {
    // 0 == current main window, 1 == new tab
    const handle = result.value[0];
    client.switchWindow(handle);
  });
};

// close a new tab and handle current windows
export const closeAndHandleWindows = async () => {
  // close windows
  client.closeWindow();
  // handle current windows
  client.window_handles((result) => {
    // 0 == current main window, 1 == new tab
    const handle = result.value[0];
    client.switchWindow(handle);
  });
};

export const assertUrlEquals = async (urlText) => client.assert.urlEquals(urlText);

export const assertUrlContains = async (urlText) => client.assert.urlContains(urlText);

export const assertUrlNotContains = async (urlText) => client.assert.not.urlContains(urlText);

export const expectAttributeEquals = async (elementLocator, attributeName, value) => client.expect.element(elementLocator).to.have.attribute(attributeName)
  .equals(value);

// to assert that an attribute (eg. src, href) have the expected value
export const expectAttributeContain = async (elementSelector, attribute, value) => client.assert.attributeContains(elementSelector, attribute, value);

// check if an element contain a css with the specified value
export const assertCssEqual = async (elementSelector, cssAttribute, value) => client.expect.element(elementSelector).to.have.css(cssAttribute).which.equals(value);

// recieve an array and an element selector
// get a value from element and remove that value from array
// choose a new value randomly from an array
export const chooseNewRandomly = async (availableValues, currentValue) => {
  const newValues = await availableValues.filter((value) => value !== currentValue);
  return newValues[Math.floor(Math.random() * newValues.length)];
};

// recieve 2 strings
// store a value in local storage
// only works in the same browser session!
export const storeInLocalStorage = async (key, storedValue) => {
  await client.execute(async function (key, storedValue) {
    await window.localStorage.setItem(key, storedValue);
    return true;
  }, [key, storedValue]);
};

// recieve 1 string
// get a value from local storage
export const getFromLocalStorage = async (key) => {
  let value;
  await client.execute(function (key) {
    return window.localStorage.getItem(key);
  }, [key], function (result) {
    value = result.value;
  });
  return value;
};

// compare element with text stored in local storage
// only works in the SAME browser session!!!
export const compareElementTextWithLocalStorage = async (key, elementSelector) => {
  const value = await getFromLocalStorage(key);
  await expectElementEqualText(elementSelector, value);
};

// compare element with text stored in local storage
// only works in the SAME browser session!!
export const compareElementValueWithLocalStorage = async (key, elementSelector) => {
  const value = await getFromLocalStorage(key);
  await expectElementEqualValue(elementSelector, value);
};

// return a random plate number
export const generateRandomPlateNumber = async () => {
  const prefix = randomstring.generate({
    capitalization: 'uppercase',
    charset: 'alphabetic',
    length: 1,
  });
  const middle = randomstring.generate({
    charset: 'numeric',
    length: 4,
  });
  const suffix = randomstring.generate({
    capitalization: 'uppercase',
    charset: 'alphabetic',
    length: 3,
  });
  return `${prefix + middle + suffix}`;
};

// generate a random X length number
export const generateXLengthNumber = async (length) => randomstring.generate({ charset: 'numeric', length: `${length}` });

export const readThingsUp = async (path) => fs.readFileSync(path, 'utf8');

export const setCookie = async (cookie) => {
  await client.setCookie(cookie);
};

// expect array to contain
export const chaiExpectArrayContain = async (array, expectedValues) => expectChai(array).to.have.members(expectedValues);

// expect sorted array using Chai
export const chaiExpectArraySortedAsc = async (array) => expectChai(array).to.be.sorted({ descending: false });

// expect array contain letter
export const chaiInclude = async (elements, array) => chai.assert.include(elements, array);

export const setCookies = async (email) => {
  let readAttempt = false;
  let attemptCounter = 0;
  let cookies = {};

  do {
    readAttempt = false;
    try {
      cookies = await JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));
    } catch (err) {
      if (attemptCounter >= 9) {
        throw err;
      }
      console.log(attemptCounter, err);
      readAttempt = true;
    }
    attemptCounter += 1;
  } while (readAttempt && attemptCounter < 10);

  cookies[email].forEach((cookie) => {
    client.execute(function (cookie) {
      document.cookie = cookie;
      return true;
    }, [cookie]);
  });
};

// convert [XYZ 1234 YUIN] to [1234]
export const convertToAngka = async (valueInput) => parseInt(valueInput.replace(/[^0-9]/g, ''), 10);

// convert Rp[Space]123[Space]Milyar to [123000000000]
export const convertStringCurencyToInteger = async (valueInput) => {
  const valueSplite = await valueInput.split(' ');
  const value = {
    Milyar: '000000000',
    Ribu: '0000',
    Juta: '000000',
    Ratus: '00',
    Triliun: '000000000000',
  };
  // variabel untuk mengubah Rp 5  Milyar ke Rp 5000000000
  const rpInteger = await valueInput.replace(valueSplite[2], value[`${valueSplite[2]}`]);
  return convertToAngka(rpInteger);
};
export const rangeValueValidation = async (element, valueElement, valMin, valMax) => {
  await scrollToElement(element);
  const toInteger = await Number(valueElement);
  const valMin1 = await Number(valMin);
  const valMax1 = await Number(valMax);
  if (valMin1 <= toInteger && valMax1 >= toInteger) {
    await waitElementVisible(element);
    await expectVisible(element);
  } else {
    await expectNotVisible(element);
  }
};

// validation of 2 number range for prices scenario
export const rangeValueValidationHarga = async (elementInspected, valMin, valMax) => {
  await scrollToElement(elementInspected);
  const valueElement = await getStringText(elementInspected);
  const toInteger = await convertToAngka(valueElement);
  if ((valMin <= toInteger && valMax >= toInteger) || valueElement === 'Hubungi Kami') {
    await expectVisible(elementInspected);
  } else {
    await expectNotVisible(elementInspected);
  }
};

// to assert title page Homepage
export const expectPageTitle = async (pageTitle) => client.assert.title(pageTitle);

export const replaceMetaSyntax = (text, world) => {
  if (text.includes('%total_list%')) {
    text = text.replace(/%total_list%/g, world.totalList);
  }
  if (text.includes('%tahun%')) {
    text = text.replace(/%tahun%/g, world.tahun);
  }
  if (text.includes('%bulan%')) {
    text = text.replace(/%bulan%/g, world.bulan);
  }
  if (text.includes('%harga_termurah%')) {
    text = text.replace(/%harga_termurah%/g, world.hargaTermurah);
  }
  if (text.includes('%brand%')) {
    text = text.replace(/%brand%/g, world.brand);
  }
  if (text.includes('%model%')) {
    text = text.replace(/%model%/g, world.model);
  }
  if (text.includes('%variant%')) {
    text = text.replace(/%variant%/g, world.variant);
  }
  if (text.includes('%harga_produk%')) {
    text = text.replace(/%harga_produk%/g, world.hargaProduk);
  }
  if (text.includes('%transmisi_produk%')) {
    text = text.replace(/%transmisi_produk%/g, world.transmisiProduk);
  }
  if (text.includes('%warna_produk%')) {
    text = text.replace(/%warna_produk%/g, world.warnaProduk);
  }
  return text;
};

// get selected css property value from a selector
export const getCssProperty = async (selector, cssProperty) => {
  let getResult;
  await waitElementVisible(selector);
  await client.getCssProperty(selector, cssProperty, (result) => {
    getResult = result.value;
  });
  return getResult;
};
