<template>
    <div class="w-80">
        <div class="relative inline-flex w-full z-20">
            <button tabindex="0" @blur="closeDropdown()" @click="openDropdown = !openDropdown"
                class="btn w-full flex  min-w-44 bg-white border-gray-200 button-border hover:border-gray-300 text-gray-500 hover:text-gray-600 make-difference"
                aria-label="Select date range" aria-haspopup="true">
                <span class="flex ">
                    <span>{{ selectedObjectName }} ({{ selectedObject }})</span>
                </span>
                <svg class="shrink-0 ml-1 fill-current text-gray-400" width="11" height="7" viewBox="0 0 11 7">
                    <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                </svg>
            </button>
            <transition enter-active-class="transition ease-out duration-100 transform"
                enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-out duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">

                <div v-show="openDropdown"
                    class="z-20 absolute top-full left-0 w-full bg-white border border-gray-200 pb-1.5 rounded shadow-lg overflow-scroll mt-1 max-h-[300px]">
                    <div class="relative">
                        <input v-model="initialText" @focus="focusOnFilter()" @blur="focusedOnFilter = false" id="small"
                            class="form-input w-full px-2 py-1 sticky top-0 shadow-sm" type="text"
                            placeholder="Filter Text" />
                        <div v-for="object in listObjects" :key="object[valueAttribute]"
                            class="font-medium text-sm text-gray-600 divide-y divide-gray-200" x-ref="options">
                            <button tabindex="0"
                                class="flex items-center justify-between w-full hover:bg-gray-50 py-2 px-3 cursor-pointer"
                                @click="selectObject(object[valueAttribute])">
                                <span :class="{ 'text-indigo-500': object[valueAttribute] == selectedObject }">{{
                                        object[nameAttribute]
                                }} ({{ object[valueAttribute] }})</span>
                                <svg class="shrink-0 ml-2 fill-current "
                                    :class="{ 'text-indigo-500': object[valueAttribute] == selectedObject }" width="12"
                                    height="9" viewBox="0 0 12 9">
                                    <path
                                        d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(["selectedObject"])
const props = defineProps(["objectsUrl", "showText", "nameAttribute", "valueAttribute", "initialObject"])
const selectedObject = ref(null)
const loaded = ref(true)

const openDropdown = ref(false)

const initialText = ref('')

const listObjects = ref([])

const selectedObjectName = ref('Select Item')

watch(initialText, async (text) => {
    if (text) {
        try {
            listObjects.value = await useBaseFetch(props.objectsUrl, {
                method: 'POST',
                body: { 'initial_letters': text }
            })
        }
        catch (err) {
            console.log(err.response)
        }
    }
})

onMounted(() => {
    if (props.initialObject) {
        selectedObject.value = props.initialObject[props.valueAttribute]
        selectedObjectName.value = props.initialObject[props.nameAttribute]
    }
    initialText.value = "a"
})

function selectObject(objectValue) {
    selectedObject.value = objectValue
    var obj = listObjects.value.filter((obj) => {
        return obj[props.valueAttribute] == selectedObject.value
    })
    emit("selectedObject", obj[0])
    selectedObjectName.value = obj[0][props.nameAttribute]
    openDropdown.value = false
}

const focusedOnFilter = ref(false)

function focusOnFilter() {
    focusedOnFilter.value = true
}

function closeDropdown() {
    setTimeout(() => {
        if (!focusedOnFilter.value) {
            openDropdown.value = false
        }
    }, 200);
}

</script>

<style scoped>
.make-difference {

    justify-content: space-between;
}

.button-border {
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
</style>