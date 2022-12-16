// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
      ],
      css: [
        '@/assets/css/style.scss',
        '@/assets/css/additional-styles/flatpickr.scss',
        '@/assets/css/additional-styles/theme.scss',
        '@/assets/css/additional-styles/range-slider.scss',
        '@/assets/css/additional-styles/toggle-switch.scss',
        '@/assets/css/additional-styles/utility-patterns.scss'
      ]
})
