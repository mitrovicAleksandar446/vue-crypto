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
                        <a v-if="!user.active" @click="activateInactiveUser(user.id)" class="button is-primary">
                            Activate
                        </a>
                        
                        <a v-if="user.active" @click="deactivateUser(user.id)" class="button is-danger">
                            Deactivate
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <span v-else class="tag is-warning is-large">
            There are no users ...
        </span>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import userApi from '@/services/api/user/'

    export default {
        name: "Users",

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
                        let user = this.users.find(user => user.id === userId);
                        user.active = true;
                        this.showSuccessToast("User activated");
                    });
            },

            deactivateUser(userId) {
                userApi.deactivateUser(userId)
                    .then(() => {
                        let user = this.users.find(user => user.id === userId);
                        user.active = false;
                        this.showSuccessToast("User deactivated");
                    });
            }
        },

        async created() {
            this.users = await userApi.getUsers();
        }
    }
</script>

<style scoped>

</style>