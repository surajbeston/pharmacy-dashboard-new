<template>
    <div>
        <div class="m-5">
            <div v-for="success of successMessages" :key="success"
                class="px-4 py-2 m-2 rounded-sm text-sm bg-green-100 border border-green-200 text-green-600">


                <div class="flex w-full justify-between items-start">
                    <div class="flex">
                        <svg class="w-4 h-4 shrink-0 fill-current text-green-500 mt-[3px] mr-3" viewBox="0 0 16 16">
                            <path
                                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
                        </svg>
                        <div>{{ success }}</div>
                    </div>
                    <button @click="removeMessage(success)" class="opacity-70 hover:opacity-80 ml-3 mt-[3px]">
                        <div class="sr-only">Close</div>
                        <svg class="w-4 h-4 fill-current">
                            <path
                                d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

const successMessages = useSuccessMessages()

function removeMessage(msg) {
    var index = successMessages.value.indexOf(msg)
    successMessages.value.splice(index, 1)
}

watch(successMessages, (newVal) => {
    if (successMessages.value.length > 0) {
        setTimeout(() => {
            successMessages.value = []
        }, 10000);
    }
})

</script>