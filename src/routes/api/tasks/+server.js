import { json } from '@sveltejs/kit';
import { db } from '$lib/database';

export async function GET({ url }) {
    const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [1]);
    return json(tasks);
}

export async function POST({ request }) {
    const task = await request.json();
    const result = await db.run(
        'INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)',
        [1, task.title, task.description, task.due_date]
    );
    return json({ id: result.lastID, ...task });
}