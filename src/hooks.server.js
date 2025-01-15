import { initializeDatabase } from '$lib/database/init';

initializeDatabase();

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    return resolve(event);
}