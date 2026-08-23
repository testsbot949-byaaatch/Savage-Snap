const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = process.env.PORT || 3000;

const options = {
  width: parseInt(process.env.SCREEN_WIDTH, 10) || 1920,
  height: parseInt(process.env.SCREEN_HEIGHT, 10) || 1080,
};

async function startServer() {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || puppeteer.executablePath(),
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    defaultViewport: { width: options.width, height: options.height },
  });

  app.get("/", async (req, res) => {
    const { url, width, height, full } = req.query;
    if (!url) {
      return res.status(400).send("Missing url parameter");
    }

    const w = parseInt(width, 10) || options.width;
    const h = parseInt(height, 10) || options.height;
    const isFull = full === "true";

    try {
      const page = await browser.newPage();

      await page.setViewport({
        width: w,
        height: h,
      });

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
          "AppleWebKit/537.36 (KHTML, like Gecko) " +
          "Chrome/115.0.0.0 Safari/537.36"
      );

      await page.goto(url, { waitUntil: "networkidle2" });

      await page.evaluate(async () => {
        await document.fonts.ready;
        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        });
      });

      let buffer = await page.screenshot({ type: "png", fullPage: isFull });

      await page.close();

      res.set("Content-Type", `image/png`);
      res.setHeader("Content-Disposition", `inline; filename="screenshot.png"`);
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  process.on("SIGINT", async () => {
    await browser.close();
    process.exit();
  });
}

startServer();
