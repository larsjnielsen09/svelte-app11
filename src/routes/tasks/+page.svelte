<script>
    import { Button, Card } from 'flowbite-svelte';
    import TaskCard from '$lib/components/TaskCard.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let tasks = data.tasks;

    async function handleEdit(event) {
        const task = event.detail;
        console.log('Editing task:', task);
        // We'll implement the actual edit functionality later
    }

    async function handleDelete(event) {
        const taskId = event.detail;
        console.log('Deleting task:', taskId);
        // We'll implement the actual delete functionality later
    }
</script>

<div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Tasks Overview</h1>
        <Button href="/tasks/new">Add New Task</Button>
    </div>

    {#if tasks.length === 0}
        <Card>
            <p class="text-center text-gray-600">No tasks yet. Why not create one?</p>
        </Card>
    {:else}
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each tasks as task}
                <TaskCard 
                    {task}
                    on:edit={handleEdit}
                    on:delete={handleDelete}
                />
            {/each}
        </div>
    {/if}
</div>