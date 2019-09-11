<template>
    <section>
        <section v-if="achievements.length > 0">
            <div class="box" v-for="achievement in achievements" v-bind:key="achievement.id">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ achievement.name }}</strong>
                            </p>
                            <p>
                                <span class="tag is-buefy">
                                    {{ achievement.value }} QXC
                                </span>
                            </p>
                            <p>
                                {{ achievement.description }}
                            </p>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-right">
                                <a class="level-item button is-success" v-on:click="promptRequest(achievement.id)">
                                    Request
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
        </section>
        <span v-else class="tag is-warning is-large">
            No achievements ...
        </span>
    </section>
</template>

<script>
    import achievementApi from '@/services/api/achievement/'
    import {mapActions} from 'vuex'

    export default {
        name: "RequestAchievements",

        data() {
            return {
                achievements: []
            }
        },

        async created() {
            this.achievements = await achievementApi.getAll();
        },

        methods: {
            ...mapActions('dialog', ['showDialog']),
            ...mapActions('loader', ['activateLoader']),
            ...mapActions('toast', ['showSuccessToast', 'showDangerToast']),

            promptRequest(id) {

                this.showDialog({
                    status: 'prompt',
                    message: `Enter note for admin?`,
                    inputAttrs: {
                        required: false,
                        size: 1000,
                        placeholder: 'Note here...'
                    },
                    onConfirm: (value) => this.createRequest(value, id)
                })
            },

            createRequest(note, id) {

                this.activateLoader(true);
                const request = note ? {"employee_note": note} : {};
                achievementApi.createRequest(request, id)
                    .then(() => {
                        this.activateLoader(false);
                        this.showSuccessToast("Achievement requested");
                    })
                    .catch(err => {
                        this.activateLoader(false);
                        this.showDangerToast(err.response ? err.response.data.message : err.message);
                    });

            }
        }
    }
</script>

<style scoped>
</style>
