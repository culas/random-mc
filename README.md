# Random Minecraft Tracker

A helper to keep track of the item drops in your randomized Minecraft playthrough. Inspired by [Osie's](https://www.twitch.tv/osie) streams based on the [Minecraft Randomizer](https://fasguy.net/minecraft_randomizer/).

Built with [SvelteKit](https://kit.svelte.dev/) and a MongoDB database.

## Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

> Check out the [Svelte](https://svelte.dev/docs/) and [SvelteKit](https://kit.svelte.dev/docs/) Documentations

---

For full functionality you need to create `.env` file in the `src` directory with informations to connect to your MongoDB database. See `template.env` for reference.
