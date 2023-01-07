<template>
    <div>
        <div id="danger-modal"
            class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center transform px-4 sm:px-6 bg-slate-300/50"
            role="dialog" aria-modal="true" v-show="showModal">
            <div class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
                <div class="p-5 flex space-x-4">
                    <!-- Icon -->
                    <!-- <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100">
                        <svg class="w-4 h-4 shrink-0 fill-current text-red-500" viewBox="0 0 16 16">
                            <path
                                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                        </svg>
                    </div> -->
                    <!-- Content -->
                    <div>
                        <!-- Modal header -->
                        <div class="mb-2">
                            <div class="text-lg font-semibold text-gray-800">{{ infoTitle }}</div>
                        </div>
                        <!-- Modal content -->
                        <div class="text-sm mb-10">
                            <div class="space-y-2">
                                <slot>

                                </slot>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div v-show="showCancel" v-if="!deleting" class="flex flex-wrap justify-end space-x-2">
                            <button class="btn-sm border-gray-200 btn-border hover:border-gray-300 text-gray-600"
                                @click="cancel">Cancel</button>
                        </div>
                        <div v-else class="flex justify-center">

                            <svg aria-hidden="true"
                                class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["infoTitle", "showModal", "showCancel"])
const emit = defineEmits(["cancelled"])

const deleting = ref(false)
const router = useRouter()


function cancel() {
    emit("cancelled", false)
}

</script>

<style>

.btn-border{
    border-color: rgb(226 232 240 / var(--tw-border-opacity));
}

</style>