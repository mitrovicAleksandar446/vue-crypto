<template>
    <section v-if="achievement">
        <div>
            <router-link :to="{name: 'achievements'}" class="button is-buefy">
                <i class="fas fa-chevron-left"></i>
                Back
            </router-link>
        </div>
        <div class="form-wrapper">
            <form @submit.prevent="validateBeforeUpdate">
                <b-field label="Name"
                         :type="{'is-danger': errors.has('name')}"
                         :message="errors.first('name')">
                    <b-input type="text"
                             v-model="name"
                             v-validate="'required|min:3'"
                             name="name"
                             maxlength="30"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field label="Description"
                         maxlength="200">
                    <b-input type="textarea"
                             v-model="description"
                             name="description"
                             maxlength="200"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field label="Value"
                         :type="{'is-danger': errors.has('value')}"
                         :message="errors.first('value')">
                    <b-input type="number"
                             v-model="value"
                             v-validate="'required|numeric|min_value:1'"
                             name="value"
                             placeholder="Value here...">

                    </b-input>
                </b-field>
                <b-field>
                    <button type="submit" class="button is-buefy">
                        Update
                    </button>
                </b-field>
            </form>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "EditAchievement",

        data() {
            return {
                achievementId: this.$route.params.id
            }
        },

        computed: {
            ...mapState({
                achievement: state => state.achievement.achievement
            }),

            name: {
                get() {
                    return this.achievement.name;
                },

                set(name) {
                    this.$store.commit('achievement/setAchievement', {name});
                }
            },

            description: {
                get() {
                    return this.achievement.description;
                },

                set(description) {
                    this.$store.commit('achievement/setAchievement', {description});
                }
            },

            value: {
                get() {
                    return this.achievement.value;
                },

                set(value) {
                    this.$store.commit('achievement/setAchievement', {value});
                }
            }
        },

        methods: {
            ...mapActions('achievement', ['getAchievement', 'updateAchievement']),

            validateBeforeUpdate() {
                this.$validator.validateAll().then(this.update);
            },

            update(valid) {

                if (valid) {
                    this.updateAchievement({payload: this.achievement, achievementId: this.achievementId})
                        .then(() => {
                            this.$toast.open({
                                message: 'Achievement updated',
                                type: 'is-success',
                                position: 'is-top-right'
                            });
                            setTimeout(() => this.$router.push({name: 'achievements'}), 1000);
                        })
                        .catch(err => {
                            this.$toast.open({
                                message: err.response.data.message,
                                type: 'is-danger',
                                position: 'is-top-right'
                            });
                        });
                }
            }
        },

        created() {
            this.getAchievement(this.achievementId);
        }
    }
</script>

<style scoped>
    .form-wrapper {
        margin-top: 30px;
        max-width: 500px;
    }
</style>