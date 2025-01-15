import { createTask } from '$lib/database/db';
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        try {
            // Get form data
            const formData = await request.formData();
            
            // Create task object from form data
            const taskData = {
                title: formData.get('title'),
                description: formData.get('description'),
                due_date: formData.get('due_date'),
                status: 'pending'
            };

            // Validate required fields
            if (!taskData.title) {
                return fail(400, {
                    error: 'Title is required',
                    values: taskData
                });
            }

            // Create the task
            const newTask = createTask(taskData);

            // Return success response
            return {
                success: true,
                task: newTask
            };
        } catch (error) {
            console.error('Failed to create task:', error);
            return fail(500, {
                error: 'Failed to create task. Please try again.',
                values: Object.fromEntries(await request.formData())
            });
        }
    }
};