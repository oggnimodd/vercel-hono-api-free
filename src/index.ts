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
  const host = c.req.header('host');
  // Create a redirect chain for the image URL.
  const finalImageUrl = 'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4JmubmYDJnFtstwHbaZPev/0c3576832aae5b1a4d98c8c9f98863c3/Vercel_Home_OG.png';
  const redirectChainUrl = `https://${host}/redirector-a?url=` + encodeURIComponent(
    `https://${host}/redirector-b?url=` + encodeURIComponent(
      `https://${host}/redirector-c?url=` + encodeURIComponent(
        `https://${host}/redirector-d?url=` + encodeURIComponent(
          `https://${host}/redirector-e?url=` + encodeURIComponent(finalImageUrl)
        )
      )
    )
  );

  const oembed = {
    version: '1.0',
    type: 'photo',
    provider_name: 'Monster',
    title: 'Monster Redirect Chain',
    url: redirectChainUrl,
    width: 695,
    height: 363,
  };

  return c.json(oembed);
});

app.get('/benign-page', (c) => {
  const host = c.req.header('host');
  const oembedUrl = `https://${host}/benign-oembed.json`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Benign Page</title>
      <link rel="alternate" type="application/json+oembed" href="${oembedUrl}" title="Benign oEmbed">
    </head>
    <body>
      <h1>Benign Page for oEmbed Testing</h1>
    </body>
    </html>
  `;
  return c.html(html);
});

app.get('/benign-oembed.json', (c) => {
  const oembed = {
    version: '1.0',
    type: 'rich',
    provider_name: 'Benign Test',
    title: 'This is a Benign oEmbed Title',
    html: '<p>This is the benign HTML content that should appear in the onebox.</p>',
  };
  return c.json(oembed);
})

export default app;
