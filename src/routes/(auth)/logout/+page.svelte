<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        goto('/login');
    });
</script>

<div>
    <h1>Logout</h1>
    <p>You have been logged out successfully.</p>
    <a href="/login">Login again</a>
</div>
