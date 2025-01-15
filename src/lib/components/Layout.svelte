<script>
    import { page } from '$app/stores';
    import { Sidebar, Navbar } from 'flowbite-svelte';
</script>

<div class="flex h-screen bg-gray-100">
    <Sidebar>
        <!-- Navigation items -->
    </Sidebar>
    
    <div class="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div class="container mx-auto px-6 py-8">
                <slot />
            </div>
        </main>
    </div>
</div>