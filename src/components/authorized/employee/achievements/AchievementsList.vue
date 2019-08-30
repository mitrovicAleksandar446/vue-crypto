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
                                <a class="level-item button is-success" v-on:click="promptRequest">
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
        name: "AchievementsList",

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

            promptRequest() {

                this.showDialog({
                    status: 'prompt',
                    message: `Enter note for admin?`,
                    inputAttrs: {
                        required: false,
                        size: 1000,
                        placeholder: 'Note here...'
                    },
                    onConfirm: (value) => this.createRequest(value)
                })
            },

            createRequest(note) {
                alert(note);
            }
        }
    }
</script>

<style scoped>
    .tag {
        font-size: 1em;
    }
</style>