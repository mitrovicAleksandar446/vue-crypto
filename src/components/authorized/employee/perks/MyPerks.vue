<template>
    <section>
        <section>
            <table v-if="perks.length > 0" class="table is-striped is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Perk</th>
                    <th>Value (QXC)</th>
                    <th>Note</th>
                    <th>Teller Note</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="perk in perks" :key="perk.id">
                    <td>{{ perk.created_at }}</td>
                    <td>{{ perk.perk.name }}</td>
                    <td>{{ perk.value }}</td>
                    <td>{{ perk.employee_note }}</td>
                    <td>{{ perk.teller_note }}</td>
                    <td>{{ perk.status }}</td>
                </tr>
                </tbody>
            </table>
            <span v-else class="tag is-warning is-large">
                There are no requested perks ...
            </span>
        </section>
    </section>
</template>

<script>
    import perkApi from '@/services/api/perk/'
    import {mapActions} from 'vuex'

    export default {
        name: "MyPerks",

        data() {
            return {
                perks: []
            }
        },

        methods: {
            ...mapActions('loader', ['activateLoader']),
        },

        async created() {
            this.activateLoader(true);
            this.perks = await perkApi.getMyPerks('pending');
            this.activateLoader(false);
        }
    }
</script>

<style scoped>
</style>