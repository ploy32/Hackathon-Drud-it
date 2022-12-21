const puppeteer = require("puppeteer"); // npm i puppeteer
const fs = require("fs"); // optional, to write to file
let medUrl = "https://www.infomed.co.il/drugs/codeine/";
//-----------------------------------------------------------------------------------------------------
async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  //---------------------------------------------------------------------------------------------------
  const getDetails = await page.evaluate(() => {
    const allNames = document.querySelector(
      ".centeredContent .description"
    ).nextElementSibling;
    const innerHTML = allNames.innerText;
    return innerHTML;
  });
  // fs.writeFileSync("description.json", JSON.stringify(getDetails));
  console.log("getDetails: ", getDetails);
  //---------------------------------------------------------------------------------------------------
  // returns an array of all the names → [ 'Simvacor', 'Simvastatin-Teva', 'Simovil', 'Simvaxon' ]
  await browser.close();
}

run(medUrl);
