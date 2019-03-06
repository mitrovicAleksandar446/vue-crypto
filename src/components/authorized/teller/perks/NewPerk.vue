<template>
    <section>
        <div>
            <router-link :to="{name: 'managePerks'}" class="button is-buefy">
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
                             v-validate="'required|min:3'"
                             name="name"
                             maxlength="30"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field label="Description"
                          maxlength="200">
                    <b-input type="textarea"
                             name="description"
                             maxlength="30"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field class="file"
                         :type="{'is-danger': errors.has('image')}"
                         :message="errors.first('image')">
                    <b-upload data-vv-as="image"
                              v-validate="'required|image'"
                              name="image">
                        <a class="button is-buefy">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload image</span>
                        </a>
                    </b-upload>
                    <!--<span class="file-name" v-if="file">-->
                        <!--{{ file.name }}-->
                    <!--</span>-->
                </b-field>
                <b-field label="Value"
                         :type="{'is-danger': errors.has('value')}"
                         :message="errors.first('value')">
                    <b-input type="number"
                             v-validate="'required|numeric'"
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
    export default {
        name: "NewPerk",

        data() {
            return {
                perk: {
                    name: null,
                    description: null,
                    image: null,
                    value: null
                }
            }
        },

        methods: {

            validateBeforeCreate() {
                this.$validator.validateAll().then(result => {
                    alert(result);
                });
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