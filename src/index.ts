import { Hono } from "hono";

const app = new Hono();

const welcomeStrings = [
	"Hello Hono!",
	"To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/hono",
];

app.get("/", (c) => {
	return c.text(welcomeStrings.join("\n\n"));
});

app.get('/redirector-a', (c) => {
  const url = c.req.query('url')
  if (url) {
    return c.redirect(url)
  }
  return c.text('url query parameter is missing')
})

app.get('/redirector-b', (c) => {
  const url = c.req.query('url')
  if (url) {
    return c.redirect(url)
  }
  return c.text('url query parameter is missing')
})

app.get('/redirector-c', (c) => {
  const url = c.req.query('url')
  if (url) {
    return c.redirect(url)
  }
  return c.text('url query parameter is missing')
})

app.get('/redirector-d', (c) => {
  const url = c.req.query('url')
  if (url) {
    return c.redirect(url)
  }
  return c.text('url query parameter is missing')
})

app.get('/redirector-e', (c) => {
  const url = c.req.query('url')
  if (url) {
    return c.redirect(url)
  }
  return c.text('url query parameter is missing')
})

app.get('/monster', (c) => {
  // Generate a large HTML response to test for DoS vulnerabilities in oEmbed parsers.
  const sizeInMB = 10;
  const char = 'a';
  const monsterPayload = char.repeat(sizeInMB * 1024 * 1024);
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Monster</title>
    </head>
    <body>
      <h1>Monster Page</h1>
      <p>${monsterPayload}</p>
    </body>
    </html>
  `;
  return c.html(html);
})

export default app;
