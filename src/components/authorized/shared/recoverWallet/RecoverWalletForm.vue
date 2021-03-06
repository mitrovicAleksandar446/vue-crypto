<template>
    <section>
        <div v-if="!wallet">
            <div>
                <h1 class="title">
                    Recover wallet
                </h1>
            </div>
            <div>
                <form @submit.prevent="validateBeforeRecovering">
                    <b-field label="Password"
                             :type="{'is-danger': errors.has('password')}"
                             :message="errors.first('password')">
                        <b-input type="password"
                                 v-model="password"
                                 name="password"
                                 v-validate="'required|min:3'"
                                 placeholder="Password here" maxlength="30">
                        </b-input>
                    </b-field>

                    <b-field label="Confirm password"
                             :type="{'is-danger': errors.has('passwordConfirm')}"
                             :message="[{
                                'The confirm password field is required' : errors.firstByRule('passwordConfirm', 'required'),
                                'The confirm password is not valid' : errors.firstByRule('passwordConfirm', 'is')
                             }]">
                        <b-input type="password"
                                 v-model="passwordConfirm"
                                 name="passwordConfirm"
                                 v-validate="{ required: true, is: password }"
                                 placeholder="Password repeat here..." maxlength="30"></b-input>
                    </b-field>
                    <b-field label="Mnemonic"
                             :type="{'is-danger': errors.has('mnemonic')}"
                             :message="errors.first('mnemonic')">
                        <b-input type="textarea"
                                 v-model="mnemonic"
                                 v-validate="'required|min:30'"
                                 name="mnemonic"
                                 maxlength="200"
                                 placeholder="Mnemonic here...">
                        </b-input>
                    </b-field>

                    <b-field>
                        <button type="submit" class="button is-primary">
                            Recover
                        </button>
                    </b-field>
                </form>
            </div>
        </div>
        <div v-else>
            <span class="tag is-success is-large">
                You have a wallet
            </span>
        </div>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'

    export default {
        name: "RecoverWalletForm",

        data() {
            return {
                mnemonic: null,
                password: null,
                passwordConfirm: null
            }
        },

        computed: {
            ...mapState({
                user: state => state.user.authUser,
                wallet: state => state.wallet.wallet
            })
        },

        methods: {
            ...mapActions('wallet', ['recoverWallet']),
            ...mapActions('loader', ['activateLoader']),
            ...mapActions('toast', ['showSuccessToast', 'showDangerToast']),

            validateBeforeRecovering() {
                this.$validator.validateAll().then(this.recover);
            },

            recover(valid) {

                if (valid) {

                    try {
                        this.activateLoader(true);
                        this.recoverWallet({
                            email: this.user.email,
                            password: this.password,
                            mnemonic: this.mnemonic
                        });
                        this.clearForm();
                        this.activateLoader(false);
                        this.showSuccessToast('Wallet successfully recovered');
                    } catch (err) {
                        this.showSuccessToast(err.message);
                        this.clearForm();
                        this.activateLoader(false);
                    }
                }
            },

            clearForm() {
                this.mnemonic = null;
                this.password = null;
                this.passwordConfirm = null;
                this.$validator.reset();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        color: $buefy-purple;
        margin-bottom: 30px;
    }
</style>