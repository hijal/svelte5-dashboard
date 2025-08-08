<script lang="ts">
    import Button from '$components/ui/Button.svelte';
    import Table from '$components/ui/Table.svelte';

    import {
        createErrorToast,
        createSuccessToast,
        createWarningToast,
        createInfoToast,
    } from '$utils/toast';

    const showSuccessToast = () => {
        createSuccessToast('This is a success toast!');
    };

    const showErrorToast = () => {
        createErrorToast('This is an error toast!');
    };

    const showWarningToast = () => {
        createWarningToast('This is a warning toast!');
    };

    const showInfoToast = () => {
        createInfoToast('This is an info toast!');
    };
</script>

<svelte:head>
    <title>Home | Triple-A Merchant Dashboard</title>
</svelte:head>

<div class="flex flex-col justify-center gap-4">
    <h1 class="text-dark-purple text-center text-5xl">
        Welcome to the Triple-A Merchant Dashboard
    </h1>

    <div class="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="success" onclick={showSuccessToast}>Success</Button>
        <Button variant="error" onclick={showErrorToast}>Error</Button>
        <Button variant="secondary" onclick={showInfoToast}>Secondary</Button>
        <Button variant="warning" onclick={showWarningToast}>Warning</Button>
    </div>

    <Table data={[] as { firstName: string; lastName: string; username: string }[]}>
        {#snippet header()}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
        {/snippet}
        {#snippet row(d)}
            <td>{d.firstName}</td>
            <td>{d.lastName}</td>
            <td>{d.username}</td>
        {/snippet}
    </Table>
</div>
