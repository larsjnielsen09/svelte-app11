<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { Button, Card, Input, Textarea, Label, Alert } from 'flowbite-svelte';

    /** @type {import('./$types').ActionData} */
    export let form;

    let submitting = false;

    // Handle form submission with proper enhancement
    function submitForm() {
        submitting = true;
        return async ({ result }) => {
            submitting = false;
            if (result.type === 'success') {
                await goto('/tasks');
            }
        };
    }
</script>

<div class="container mx-auto p-4">
    <Card class="max-w-lg mx-auto">
        <h2 class="text-2xl font-bold mb-4">Create New Task</h2>
        
        {#if form?.error}
            <Alert color="red" class="mb-4">
                {form.error}
            </Alert>
        {/if}
        
        <form 
            method="POST" 
            use:enhance={submitForm}
            class="space-y-4"
        >
            <div>
                <Label for="title">Task Title</Label>
                <Input 
                    id="title"
                    name="title"
                    type="text"
                    value={form?.values?.title ?? ''}
                    required
                />
            </div>
            
            <div>
                <Label for="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={form?.values?.description ?? ''}
                    rows="4"
                />
            </div>
            
            <div>
                <Label for="due_date">Due Date</Label>
                <Input
                    id="due_date"
                    name="due_date"
                    type="date"
                    value={form?.values?.due_date ?? ''}
                />
            </div>
            
            <div class="flex justify-end space-x-2 pt-4">
                <Button 
                    color="alternative" 
                    href="/tasks"
                    disabled={submitting}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    color="primary"
                    disabled={submitting}
                >
                    {submitting ? 'Creating...' : 'Create Task'}
                </Button>
            </div>
        </form>
    </Card>
</div>