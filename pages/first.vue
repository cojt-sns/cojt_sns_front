<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered ">
        <h1 class="title is-size-1 has-text-weight-bold">
          Grouping SNS
        </h1>
        <h2 class="subtitle is-size-1">
          welcome
        </h2>
        <nav class="level">
          <div class="level-item">
            <nuxt-link
              to="./make_new_account"
              class="button is-link is-focused is-size-3"
            >
              Join
            </nuxt-link>
          </div>
          <div class="level-item">
            <nuxt-link to="./login" class="button is-link is-focused is-size-3"
              >Login</nuxt-link
            >
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>
