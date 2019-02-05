<template>
    <section class="hero is-primary">
        <div class="hero-body">
            <div class="columns">
                <div class="column is-12">
                    <div class="container content">
                        <i class="is-large fab fa-ethereum"></i>
                        <i class="is-large fas">QXC</i>
                        <h1 class="title">Code <em>All</em> The Things</h1>
                        <h3 class="subtitle">
                            Collection of code goodies
                        </h3>
                        <a href="http://git.quantox.tech/aleksa446/quantox-vue" target="_blank"
                           class="button is-primary is-large">
                                <span class="icon">
                                  <i class="fab fa-github"></i>
                                </span>
                            <span>Github</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .hero.is-primary {
        background: linear-gradient(to top right, #524ad0 10%, #D099FA);
    }

    .is-large.fab {
        font-size: 7em;
    }

    .is-large.fas {
        font-size: 5em;
        margin-left: 0.2em;
    }
</style>