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
  const host = c.req.header('host');
  const oembedUrl = `https://${host}/monster-oembed`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Monster</title>
      <link rel="alternate" type="application/json+oembed" href="${oembedUrl}" title="Monster oEmbed">
    </head>
    <body>
      <h1>Monster Page</h1>
      <p>This page is designed to test oEmbed consumers with a large payload.</p>
    </body>
    </html>
  `;
  return c.html(html);
});

app.get('/monster-oembed', (c) => {
  // Generate a large oEmbed JSON response to test for DoS vulnerabilities.
  const sizeInMB = 4;
  const char = 'a';
  const monsterPayload = 'a'.repeat(sizeInMB * 1024 * 1024);

  const oembed = {
    version: '1.0',
    type: 'rich',
    provider_name: 'Monster',
    title: 'Monster oEmbed',
    html: `<h1>Monster oEmbed</h1><p>${monsterPayload}</p>`,
  };

  return c.json(oembed);
})

export default app;
