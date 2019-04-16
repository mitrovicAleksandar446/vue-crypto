<template>
    <section>
        <div>
            <router-link :to="{name: 'perks'}" class="button is-buefy">
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
                             v-model="perk.name"
                             v-validate="'required|min:3'"
                             name="name"
                             maxlength="30"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field label="Description"
                          maxlength="200">
                    <b-input type="textarea"
                             v-model="perk.description"
                             name="description"
                             maxlength="200"
                             placeholder="Name here...">

                    </b-input>
                </b-field>
                <b-field class="file"
                         :type="{'is-danger': errors.has('image')}"
                         :message="errors.first('image')">
                    <b-upload accept="image/*"
                              v-model="perk.image"
                              data-vv-as="image"
                              v-validate="'required'"
                              name="image">
                        <a class="button is-buefy">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload image</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="perk.image">
                        {{ perk.image.name }}
                    </span>
                </b-field>
                <b-field label="Value (QXC)"
                         :type="{'is-danger': errors.has('value')}"
                         :message="errors.first('value')">
                    <b-input type="number"
                             v-model="perk.value"
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
    import perkApi from '@/services/api/perk/';

    export default {
        name: "NewPerk",

        data() {
            return {
                perk: {
                    name: null,
                    description: null,
                    image: null,
                    value: 1
                }
            }
        },

        methods: {

            ...mapActions('toast', ['showSuccessToast', 'showDangerToast']),

            validateBeforeCreate() {
                this.$validator.validateAll().then(this.create);
            },

            create(valid) {

                if (valid) {
                    const payload = new FormData();
                    payload.append("name", this.perk.name);
                    if (this.perk.description) {
                        payload.append("description", this.perk.description);
                    }
                    payload.append("image", this.perk.image);
                    payload.append("value", this.perk.value);

                    perkApi.create(payload)
                        .then(() => {
                            this.showSuccessToast('Perk created');
                            setTimeout(() => this.$router.push({name: 'perks'}), 1000);
                        })
                        .catch(err => this.showDangerToast(err.response.data.message));
                }
            }
        }
    }
</script>

<style scoped>
    .form-wrapper {
        margin-top:30px;
    }

    .upload {
        margin-right: 10px;
    }
</style>