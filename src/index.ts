import { Hono } from "hono";
const app = new Hono();

// Endpoint for the NEGATIVE test case (correct behavior).
// The og:image tag points directly to a blocked domain.
app.get("/no-trick", (c) => {
	const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>A Perfectly Normal Page</title>
        <meta property="og:title" content="A Perfectly Normal Page Title" />
        <meta property="og:description" content="There is nothing suspicious here, just a normal page with a normal image." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1542831371-29b0f74f9713?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29kaW5nfGVufDB8fDB8fHww" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <h1>This page uses OpenGraph tags.</h1>
      </body>
    </html>
  `;
	return c.html(html);
});

// Endpoint for the POSITIVE test case (the exploit).
// The og:image tag points to our redirector.
app.get("/trickster", (c) => {
	const host = c.req.header("host");
	const imageUrl = `https://${host}/image`; // This URL will perform the redirect.

	const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>A Perfectly Normal Page</title>
        <meta property="og:title" content="A Perfectly Normal Page Title" />
        <meta property="og:description" content="There is nothing suspicious here, just a normal page with a normal image." />
        <meta property="og:image" content="${imageUrl}" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <h1>This page uses OpenGraph tags to trick the download process.</h1>
      </body>
    </html>
  `;
	return c.html(html);
});

// The redirector endpoint. It redirects to an image on the blocked domain.
app.get("/image", (c) => {
	return c.redirect(
		"https://images.unsplash.com/photo-1542831371-29b0f74f9713?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29kaW5nfGVufDB8fDB8fHww",
		302,
	);
});

export default app;
