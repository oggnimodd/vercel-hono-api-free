import { Hono } from "hono";

const app = new Hono();

const welcomeStrings = [
	"Hello Hono!",
	"To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/hono",
];

app.get("/", (c) => {
	return c.text(welcomeStrings.join("\n\n"));
});

app.get("/redirector-a", (c) => {
	const url = c.req.query("url");
	if (url) {
		return c.redirect(url);
	}
	return c.text("url query parameter is missing");
});

app.get("/redirector-b", (c) => {
	const url = c.req.query("url");
	if (url) {
		return c.redirect(url);
	}
	return c.text("url query parameter is missing");
});

app.get("/redirector-c", (c) => {
	const url = c.req.query("url");
	if (url) {
		return c.redirect(url);
	}
	return c.text("url query parameter is missing");
});

app.get("/redirector-d", (c) => {
	const url = c.req.query("url");
	if (url) {
		return c.redirect(url);
	}
	return c.text("url query parameter is missing");
});

app.get("/redirector-e", (c) => {
	const url = c.req.query("url");
	if (url) {
		return c.redirect(url);
	}
	return c.text("url query parameter is missing");
});

app.get("/monster", (c) => {
	const host = c.req.header("host");
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

app.get("/monster-oembed", (c) => {
	const host = c.req.header("host");
	// Create a redirect chain for the image URL.
	const finalImageUrl =
		"https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4JmubmYDJnFtstwHbaZPev/0c3576832aae5b1a4d98c8c9f98863c3/Vercel_Home_OG.png";
	const redirectChainUrl =
		`https://${host}/redirector-a?url=` +
		encodeURIComponent(
			`https://${host}/redirector-b?url=` +
				encodeURIComponent(
					`https://${host}/redirector-c?url=` +
						encodeURIComponent(
							`https://${host}/redirector-d?url=` +
								encodeURIComponent(
									`https://${host}/redirector-e?url=` +
										encodeURIComponent(finalImageUrl),
								),
						),
				),
		);

	const oembed = {
		version: "1.0",
		type: "photo",
		provider_name: "Monster",
		title: "Monster Redirect Chain",
		url: redirectChainUrl,
		width: 695,
		height: 363,
	};

	return c.json(oembed);
});

app.get("/benign-page", (c) => {
	const host = c.req.header("host");
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

app.get("/benign-oembed.json", (c) => {
	const oembed = {
		version: "1.0",
		type: "rich",
		provider_name: "Benign Test",
		title: "This is a Benign oEmbed Title",
		html: "<p>This is the benign HTML content that should appear in the onebox.</p>",
	};
	return c.json(oembed);
});

// Step 1: The page that gets Oneboxed
app.get("/trickster", (c) => {
	const host = c.req.header("host");
	// This is the URL that will perform the redirect to the final image.
	// This will be placed in the og:image tag.
	const imageUrl = `https://${host}/image`;

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
        <h1>This page uses OpenGraph tags to trick the Oneboxer.</h1>
      </body>
    </html>
  `;
	return c.html(html);
});

// Step 2: The malicious oEmbed response
app.get("/trickster-oembed.json", (c) => {
	const host = c.req.header("host");
	const imageUrl = `https://${host}/image`;

	const oembed = {
		version: "1.0",
		type: "rich",
		provider_name: "Bug Hunter Inc.",
		title: "A Perfectly Normal Image",
		html: `<img src="${imageUrl}" alt="innocent image" width="435" height="499">`,
	};

	return c.json(oembed);
});

app.get("/image", (c) => {
	return c.redirect(
		"https://images.unsplash.com/photo-1563720241311-a5d7a994956f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		302,
	);
});

export default app;
