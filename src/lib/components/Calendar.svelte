<script>
    import { onMount } from 'svelte';
    import { Calendar } from 'flowbite-svelte';
    import { calendarEvents } from '$lib/stores/calendarStore';

    let events = [];
    
    onMount(async () => {
        const response = await fetch('/api/calendar');
        events = await response.json();
    });
</script>

<div class="bg-white rounded-lg shadow p-4">
    <Calendar
        events={events}
        on:eventClick={handleEventClick}
        on:dateSelect={handleDateSelect}
    />
</div>