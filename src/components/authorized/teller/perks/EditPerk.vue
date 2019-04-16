<template>
    <section v-if="perk">
        <div>
            <router-link :to="{name: 'perks'}" class="button is-buefy">
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
                <b-field label="Image">
                    <figure class="image">
                        <img :src="perk.image" alt="perk-image"/>
                    </figure>
                </b-field>
                <b-field class="file"
                         :type="{'is-danger': errors.has('image')}"
                         :message="errors.first('image')">
                    <b-upload accept="image/*"
                              v-model="file"
                              data-vv-as="image"
                              name="image">
                        <a class="button is-buefy">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload image</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="file">
                        {{ file.name }}
                    </span>
                </b-field>
                <b-field label="Value"
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
                        Update
                    </button>
                </b-field>
            </form>
        </div>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'
    import perkApi from '@/services/api/perk/'
    import {filesystem} from "@/utils/helpers/";

    export default {
        name: "EditPerk",

        data() {
            return {
                file: null,
                perkId: this.$route.params.id,
                perk: {
                    name: null,
                    description: null,
                    image: null,
                    value: 1
                }
            }
        },

        methods: {
            ...mapActions('toast', ['showDangerToast', 'showSuccessToast']),

            validateBeforeUpdate() {
                this.$validator.validateAll().then(this.update);
            },

            update(valid) {

                if (valid) {
                    const payload = new FormData;
                    payload.append("name", this.perk.name);
                    payload.append("description", this.perk.description);
                    payload.append("value", this.perk.value);
                    if (this.file) {
                        payload.append("image", this.file);
                    }

                    perkApi.update(payload,  this.perkId)
                        .then(() => {
                            this.showSuccessToast("Perk updated");
                            setTimeout(() => this.$router.push({name: 'perks'}), 1000);
                        })
                        .catch(err => this.showDangerToast(err.response.data.message));
                }
            }
        },

        async created() {
            this.perk = await perkApi.get(this.perkId);
            this.perk.image = filesystem(this.perk.image);
        }
    }
</script>

<style scoped lang="scss">
    .form-wrapper {
        margin-top: 30px;
    }

    img {
        width: 300px;
        height: auto;
        border-radius: 6px;
        box-shadow: 3px 2px 3px rgba(#000, 0.1), 0 0 0 1px rgba(#000, 0.1);
        border: 3px solid $buefy-purple;
    }
</style>