<template>
    <section>
        <section>
            <table v-if="achievements.length > 0" class="table is-striped is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Achievement</th>
                    <th>Note</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="achievement in achievements" :key="achievement.id">
                    <td>{{ achievement.created_at }}</td>
                    <td>{{ achievement.achievement.name }}</td>
                    <td>{{ achievement.employee_note }}</td>
                    <td>{{ achievement.status }}</td>
                </tr>
                </tbody>
            </table>
            <span v-else class="tag is-warning is-large">
                There are no requested achievements ...
            </span>
        </section>
    </section>
</template>

<script>
    import achievementApi from '@/services/api/achievement/'
    import {mapActions} from 'vuex'

    export default {
        name: "MyAchievements",

        data() {
            return {
                achievements: []
            }
        },

        methods: {
            ...mapActions('loader', ['activateLoader']),
        },

        async created() {
            this.activateLoader(true);
            this.achievements = await achievementApi.getMyAchievements('pending');
            this.activateLoader(false);
        }
    }
</script>

<style scoped>
</style>
