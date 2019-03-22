<template>
    <section>
        <section v-if="requests.length > 0">
            <div class="box" v-for="request in requests" v-bind:key="request.id">
                <article class="media">
                    <div class="media-left">
                        <span class="icon is-large">
                          <i class="is-large fas fa-award" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ request.username }}</strong>
                                <br>
                                Requested a reward of <strong>{{ request.value }} QXC</strong> for {{ request.achievement.name }}
                            </p>
                            <p v-if="request.employee_note">
                                <em>"{{ request.employee_note }}"</em>
                            </p>
                        </div>
                        <nav class="level is-mobile teller-note">
                            <p v-if="request.teller_note">
                                <em><u>"{{ request.teller_note }}"</u></em>
                                <span class="icon is-large teller-note-btn" title="Click to enter edit mode">
                                  <i class="is-small fas fa-edit" aria-hidden="true"></i>
                                </span>
                            </p>
                        </nav>
                        <nav class="level is-mobile">
                            <div class="level-right">
                                <a class="level-item button is-success">
                                    Approve
                                </a>
                                <a class="level-item button is-danger">
                                    Reject
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
        </section>
        <span v-else class="tag is-warning is-large">
            No pending requests ...
        </span>
    </section>
</template>

<script>
    import achievementApi from '@/services/api/achievement/'

    export default {
        name: "RewardRequests",

        data() {
            return {
                requests: []
            }
        },

        async created() {
            this.requests = await achievementApi.getRequests('pending');
            console.log(this.requests);
        }

    }
</script>

<style scoped>
    .is-large.fas {
        font-size: 2em;
    }

    .teller-note-btn {
        cursor: pointer;
    }
</style>