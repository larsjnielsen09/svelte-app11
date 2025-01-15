<script>
    import { Card } from 'flowbite-svelte';
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Task Manager</h1>
    
    <Card>
        <h2 class="text-xl text-gray-700 mb-4">Quick Links</h2>
        
        <div class="space-y-3">
            <a 
                href="/tasks" 
                class="block p-3 text-center rounded-lg hover:bg-gray-100 transition-colors"
            >
                View Tasks
            </a>
            
            <a 
                href="/tasks/new" 
                class="block p-3 text-center rounded-lg hover:bg-gray-100 transition-colors"
            >
                Create New Task
            </a>
            
            <a 
                href="/calendar" 
                class="block p-3 text-center rounded-lg hover:bg-gray-100 transition-colors"
            >
                View Calendar
            </a>
        </div>
    </Card>
</div>