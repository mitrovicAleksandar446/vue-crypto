<template>
    <div class="container">
        <h1 class="title">
            Login
        </h1>
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

        <span>Don't have an account ? </span>
        <span>
            <router-link :to="{ path: 'register' }"> <a>Register</a> </router-link>
        </span>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {mapState} from 'vuex';

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
            ...mapState({
                authUser: state => state.user.authUser,
                userIsTeller: state => state.user.isTeller
            })
        },

        methods: {

            ...mapActions('user', ['signIn', 'saveUserInfo']),
            ...mapActions('wallet', ['loadWallet']),
            ...mapActions('dialog', ['showDialog']),

            validateBeforeLogin() {
                this.$validator.validateAll().then(this.login);
            },

            async login(valid) {
                if (valid) {
                    const credentials = {
                        email: this.user.email,
                        password: this.user.password
                    };

                    try {
                        await this.signIn(credentials);
                    } catch (err) {
                        this.showDialog({message: "User not found", type: "is-danger"});
                        return;
                    }

                    this.loadWallet(credentials);
                    await this.saveUserInfo();

                    this.$toast.open({
                        message: 'You have successfully signed in',
                        type: 'is-success',
                        position: 'is-bottom'
                    });

                    setTimeout(() => this.redirectAfterLogin(), 1000);
                    return;
                }
                this.$toast.open({
                    message: 'Form is not valid! Please check the fields.',
                    type: 'is-danger',
                    position: 'is-bottom'
                });
            },

            redirectAfterLogin() {
                let redirectTo = "employeeHome";
                if (this.userIsTeller) {
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
    }
</style>