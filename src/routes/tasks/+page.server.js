import { getTasks } from '$lib/database/db';

export function load() {
    try {
        return {
            tasks: getTasks()
        };
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return {
            tasks: []
        };
    }
}