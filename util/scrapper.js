const puppeteer = require('puppeteer');

exports.scrap = () => {
  let final = [];
  finalFiltered = [];
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.nrhmhp.gov.in/content/immunisation');

    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('tr'));
      return tds.map((td) => td.innerText);
    });
    data.forEach((entry) => {
      let finalObj = {
        name: '',
        whenToGive: '',
        dose: '',
        route: '',
        site: '',
      };
      let temp = entry.split('\t');
      finalObj.name = temp[0];
      finalObj.whenToGive = temp[1];
      finalObj.dose = temp[2];
      finalObj.route = temp[3];
      finalObj.site = temp[4];
      final.push(finalObj);
    });
    final.forEach((entry) => {
      if (entry.name && entry.whenToGive && entry.site !== 'Site') {
        finalFiltered.push(entry);
      }
    });
    // console.log(finalFiltered);
    await browser.close();
  })();
  return finalFiltered;
};
