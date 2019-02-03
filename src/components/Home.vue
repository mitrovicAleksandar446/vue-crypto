<template>
    <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="columns">
                    <div class="column is-12">
                        <div class="container content">
                            <i class="is-large fab fa-ethereum"></i>
                            <i class="is-large fas">QXC</i>
                            <h1 class="title">Code <em>All</em> The Things</h1>
                            <h3 class="subtitle">
                                Collection of code goodies for next-level dev
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
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-3">
                        <aside class="is-medium menu">
                            <p class="menu-label">
                                categories
                            </p>
                            <ul class="menu-list">
                                <li class="is-right"><a href="#const" class="is-active"><i class="fab fa-css3-alt"></i>
                                    CSS</a>
                                </li>
                                <li><a href="#let" class="is-active"><i class="fab fa-js"></i> JS</a></li>
                                <li><a href="#let" class="is-active"><i class="fab fa-html5"></i> HTML</a></li>
                            </ul>
                        </aside>
                    </div>
                    <div class="column is-9">
                        <h1>Home component</h1>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style lang="scss" scoped>
    .menu-list li {
        margin: 5px
    }

    .menu-list li a:hover {
        background: $buefy-purple;
    }

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