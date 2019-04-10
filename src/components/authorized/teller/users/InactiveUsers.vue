<template>
    <div>
        <table v-if="users.length > 0" class="table is-striped is-hoverable is-fullwidth">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <th>{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.address }}</td>
                    <td>
                        <a @click="activateInactiveUser(user.id)" class="button is-primary">
                            Activate
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <span v-else class="tag is-warning is-large">
            No inactive users ...
        </span>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import userApi from '@/services/api/user/'

    export default {
        name: "InactiveUsers",

        data() {
            return {
                users: []
            }
        },

        methods: {
            ...mapActions('toast', ['showSuccessToast']),

            activateInactiveUser(userId) {
                userApi.activateUser(userId)
                    .then(() => {
                        this.users = this.users.filter(user => user.id !== userId);
                        this.showSuccessToast("User activated");
                    });
            }
        },

        async created() {
            this.users = await userApi.getInactiveUsers();
        }
    }
</script>

<style scoped>

</style>