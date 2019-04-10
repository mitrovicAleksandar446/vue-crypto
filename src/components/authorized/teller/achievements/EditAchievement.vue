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
                             v-model="achievement.name"
                             v-validate="'required|min:3'"
                             name="name"
                             maxlength="30"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field label="Description"
                         maxlength="200">
                    <b-input type="textarea"
                             v-model="achievement.description"
                             name="description"
                             maxlength="200"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field label="Value"
                         :type="{'is-danger': errors.has('value')}"
                         :message="errors.first('value')">
                    <b-input type="number"
                             v-model="achievement.value"
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
    import {mapActions} from 'vuex';
    import achievementApi from '@/services/api/achievement/';

    export default {
        name: "EditAchievement",

        data() {
            return {
                achievementId: this.$route.params.id,
                achievement: null
            }
        },

        async created() {
            this.achievement = await achievementApi.get(this.achievementId);
        },

        methods: {
            ...mapActions('toast', ['showDangerToast', 'showSuccessToast']),

            validateBeforeUpdate() {
                this.$validator.validateAll().then(this.update);
            },

            update(valid) {

                if (valid) {
                    achievementApi.update(this.achievement, this.achievementId)
                        .then(() => {
                            this.showSuccessToast('Achievement updated');
                            setTimeout(() => this.$router.push({name: 'achievements'}), 1000);
                        })
                        .catch(err => this.showDangerToast(err.response.data.message));
                }
            }
        }
    }
</script>

<style scoped>
    .form-wrapper {
        margin-top: 30px;
        max-width: 500px;
    }
</style>