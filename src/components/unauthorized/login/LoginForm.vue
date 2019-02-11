<template>
    <div class="container">
        <h1 class="title">
            Login
        </h1>
        <b-field label="Email"
                 type="is-danger"
                 message="This email is invalid">
            <b-input type="email" maxlength="30" placeholder="Email here..."></b-input>
        </b-field>
        <b-field label="Password"
                 type="is-warning"
                 :message="['Password is too short', 'Password must have at least 8 characters']">
            <b-input type="password" maxlength="30" placeholder="Password here..."></b-input>
        </b-field>

        <b-field>
            <a class="button is-primary">Login</a>
        </b-field>

        <span>Don't have an account ? </span>
        <span>
            <router-link :to="{ path: 'register' }"> <a>Register</a> </router-link>
        </span>
    </div>
</template>

<script>
    export default {
        name: "LoginForm"
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