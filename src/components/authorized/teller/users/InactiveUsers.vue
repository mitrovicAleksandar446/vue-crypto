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
    import {mapState} from 'vuex'

    export default {
        name: "InactiveUsers",

        computed: {
            ...mapState({
                users: state => state.teller.inactiveUsersList
            })
        },

        methods: {
            ...mapActions('teller', ['getInactiveUsersList', 'activateUser']),

            activateInactiveUser(userId) {
                this.activateUser(userId)
                    .then(() => {
                        this.$toast.open({
                            message: 'User activated',
                            type: 'is-success',
                            position: 'is-top-right'
                        });
                    });
            }
        },

        created() {
            this.getInactiveUsersList();
        }
    }
</script>

<style scoped>

</style>