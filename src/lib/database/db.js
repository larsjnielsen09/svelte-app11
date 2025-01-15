import Database from 'better-sqlite3';
import { dev } from '$app/environment';

// Use a more specific database path to avoid permission issues
const dbPath = dev ? './data/dev.db' : './data/prod.db';

function createDatabase() {
    try {
        // Ensure the database is properly initialized with error handling
        const db = new Database(dbPath, { 
            verbose: console.log,
            fileMustExist: false
        });
        
        // Enable foreign keys and WAL mode for better performance
        db.pragma('foreign_keys = ON');
        db.pragma('journal_mode = WAL');
        
        return db;
    } catch (error) {
        console.error('Failed to create database:', error);
        throw error;
    }
}

const db = createDatabase();

// Improved task creation with proper error handling and data validation
export function createTask(taskData) {
    // Validate required fields
    if (!taskData.title) {
        throw new Error('Task title is required');
    }

    try {
        // Use a prepared statement for better security and performance
        const stmt = db.prepare(`
            INSERT INTO tasks (
                title, 
                description, 
                due_date, 
                status
            ) VALUES (
                @title, 
                @description, 
                @due_date, 
                @status
            )
        `);

        // Ensure all fields are properly formatted
        const task = {
            title: taskData.title,
            description: taskData.description || '',
            due_date: taskData.due_date || null,
            status: taskData.status || 'pending'
        };

        const result = stmt.run(task);
        
        // Return the newly created task
        return {
            id: result.lastInsertRowid,
            ...task
        };
    } catch (error) {
        console.error('Failed to create task:', error);
        throw error;
    }
}