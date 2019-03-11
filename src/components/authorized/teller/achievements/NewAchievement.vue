<template>
    <section>
        <div>
            <router-link :to="{name: 'achievements'}" class="button is-buefy">
                <i class="fas fa-chevron-left"></i>
                Back
            </router-link>
        </div>
        <div class="form-wrapper">
            <form @submit.prevent="validateBeforeCreate">
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
                        Create
                    </button>
                </b-field>
            </form>
        </div>
    </section>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "NewAchievement",

        data() {
            return {
                achievement: {
                    name: null,
                    description: null,
                    value: 1
                }
            }
        },

        methods: {
            ...mapActions('achievement', ['createNewAchievement']),

            validateBeforeCreate() {
                this.$validator.validateAll().then(this.create);
            },

            create(valid) {
                if (valid) {
                    this.createNewAchievement(this.achievement)
                        .then(() => {
                            this.$toast.open({
                                message: 'Achievement created',
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
        }
    }
</script>

<style scoped>
    .form-wrapper {
        margin-top:30px;
        max-width:500px;
    }
</style>