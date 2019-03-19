<template>
    <div class="container">
        <div>
            <h1 class="title">
                Login
            </h1>
        </div>
        <div>
            <form @submit.prevent="validateBeforeLogin">
                <b-field label="Email"
                         :type="{'is-danger': errors.has('email')}"
                         :message="errors.first('email')">
                    <b-input type="email"
                             v-model="user.email"
                             v-validate="'required|email'"
                             name="email"
                             maxlength="30"
                             placeholder="Email here...">

                    </b-input>
                </b-field>
                <b-field label="Password"
                         :type="{'is-danger': errors.has('password')}"
                         :message="errors.first('password')">
                    <b-input type="password"
                             v-model="user.password"
                             v-validate="'required|min:3'"
                             name="password"
                             maxlength="30"
                             placeholder="Password here...">

                    </b-input>
                </b-field>

                <b-field>
                    <button type="submit" class="button is-primary">
                        Login
                    </button>
                </b-field>
            </form>
        </div>
        <div>
            <span>Don't have an account ? </span>
            <span>
                <router-link :to="{ path: 'register' }"> <a>Register</a> </router-link>
            </span>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {mapGetters} from 'vuex';
    import {mapState} from 'vuex';
    import {TELLER_ID} from "../../../utils/role-types";

    export default {
        name: "LoginForm",

        data() {
            return {
                user: {
                    email: null,
                    password: null
                }
            }
        },

        computed: {
            ...mapGetters('user', ['userRoles']),
            ...mapState({
                authUser: state => state.user.authUser
            })
        },

        methods: {

            ...mapActions('user', ['signIn', 'getUser']),
            ...mapActions('wallet', ['loadWallet']),
            ...mapActions('dialog', ['showDialog']),
            ...mapActions('loader', ['activateLoader']),

            validateBeforeLogin() {
                this.$validator.validateAll().then(this.login);
            },

            async login(valid) {
                if (valid) {
                    this.activateLoader(true);
                    const credentials = {
                        email: this.user.email,
                        password: this.user.password
                    };

                    try {
                        await this.signIn(credentials);
                        this.loadWallet(credentials);
                        await this.getUser();
                    } catch (err) {
                        this.activateLoader(false);
                        this.showDialog({
                            message: err.response ? err.response.data.message : err.message,
                            type: "is-danger"
                        });
                        return;
                    }

                    this.activateLoader(false);
                    this.$toast.open({
                        message: 'You have successfully signed in',
                        type: 'is-success',
                        position: 'is-bottom'
                    });

                    setTimeout(() => this.redirectAfterLogin(), 1000);
                    return;
                }
                this.activateLoader(false);
                this.$toast.open({
                    message: 'Form is not valid! Please check the fields.',
                    type: 'is-danger',
                    position: 'is-bottom'
                });
            },

            redirectAfterLogin() {
                let redirectTo = "employeeHome";
                if (this.userRoles.includes(TELLER_ID)) {
                    redirectTo = "tellerHome";
                }
                this.$router.replace({name: redirectTo});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 30px;
        width: 300px;
    }

    .container h1 {
        color: $buefy-purple;
        margin-bottom: 30px;
    }
</style>