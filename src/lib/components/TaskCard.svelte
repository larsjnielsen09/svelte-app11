<script>
    import { Button } from 'flowbite-svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';

    const sampleTask = {
        id: 1,
        title: "Test Task",
        description: "This is a test task",
        due_date: new Date().toISOString(),
    };

    function handleEdit(event) {
        console.log('Edit task:', event.detail);
    }

    function handleDelete(event) {
        console.log('Delete task:', event.detail);
    }
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Task Manager</h1>
    <div class="mb-4">
        <Button>Test Button</Button>
    </div>
    <div class="max-w-md">
        <TaskCard 
            task={sampleTask} 
            on:edit={handleEdit}
            on:delete={handleDelete}
        />
    </div>
</div>