import { writable, derived } from 'svelte/store';
import { getTasks, createTask, updateTask, deleteTask } from '$lib/database/db';

function createTaskStore() {
    // Create our base store with writable
    const { subscribe, set, update } = writable([]);

    // Load initial tasks from database
    const loadTasks = async () => {
        try {
            const tasks = getTasks();
            set(tasks);
        } catch (error) {
            console.error('Failed to load tasks:', error);
            set([]);
        }
    };

    // Return our enhanced store with custom methods
    return {
        subscribe,
        // Load or reload all tasks
        load: loadTasks,
        
        // Add a new task
        add: async (task) => {
            try {
                const newTask = createTask(task);
                update(tasks => [...tasks, newTask]);
                return newTask;
            } catch (error) {
                console.error('Failed to create task:', error);
                throw error;
            }
        },
        
        // Update an existing task
        update: async (id, taskData) => {
            try {
                const updatedTask = updateTask(id, taskData);
                update(tasks => 
                    tasks.map(t => t.id === id ? updatedTask : t)
                );
                return updatedTask;
            } catch (error) {
                console.error('Failed to update task:', error);
                throw error;
            }
        },
        
        // Delete a task
        delete: async (id) => {
            try {
                await deleteTask(id);
                update(tasks => tasks.filter(t => t.id !== id));
            } catch (error) {
                console.error('Failed to delete task:', error);
                throw error;
            }
        }
    };
}

// Create and export our task store
export const taskStore = createTaskStore();

// Create derived stores for filtered views
export const pendingTasks = derived(taskStore, $tasks => 
    $tasks.filter(task => task.status === 'pending')
);

export const completedTasks = derived(taskStore, $tasks => 
    $tasks.filter(task => task.status === 'completed')
);