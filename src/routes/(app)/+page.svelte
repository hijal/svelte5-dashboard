<script lang="ts">
    import Table from '$components/ui/Table.svelte';
    import type { PageData } from './$types';

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
</script>

<svelte:head>
    <title>Home | Triple-A Merchant Dashboard</title>
</svelte:head>

<div class="flex max-w-full flex-col justify-center gap-4 px-4">
    <Table data={data.users}>
        {#snippet header()}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Created At</th>
            <th>Updated At</th>
        {/snippet}

        {#snippet row(user)}
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.country}</td>
            <td>{new Date(user.created_at).toLocaleString()}</td>
            <td>{new Date(user.updated_at).toLocaleString()}</td>
        {/snippet}
    </Table>
</div>
