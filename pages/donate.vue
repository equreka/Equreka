<template>
  <main role="main" class="donate">
    <div class="container">
      <h2 class="page-title">{{ $t('page.donate.title') }}</h2>
      <p class="lead">{{ $t('page.donate.lead') }}</p>
      <p>{{ $t('page.donate.paragraph') }}</p>
      <a href="https://github.com/sponsors/DerianAndre" class="btn btn-dark btn-icon m-2" target="_blank" rel="noopener nofollow">
        <i class="bi bi-github"></i> {{ $t('page.donate.button-github') }}
      </a>
      <a href="https://paypal.me/Derianandre" class="btn btn-primary btn-icon m-2" target="_blank" rel="noopener nofollow">
        <i class="bi bi-credit-card"></i> {{ $t('page.donate.button-paypal') }}
      </a>
    </div>
  </main>
</template>

<script>
  export default {
    head() {
      return {
        bodyAttrs: {
          class: `page-donate`
        }
      }
    }
  }
</script>