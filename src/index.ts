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

export default app;
