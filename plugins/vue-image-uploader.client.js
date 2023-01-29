import ImageUploader from 'vue-image-upload-resize'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        nuxtApp.vueApp.use(ImageUploader)
    }
})