<template>
    <!-- <div>
        <select id="object" class="form-select mt-2" @change="selectObject()" ref="selectedObject">
            <option value="">{{ showText }}</option>
            <option v-for="object in objects" :key="object[valueAttribute]" :value="object[valueAttribute]">
            {{
                    object[nameAttribute]
            }}</option>
        </select>
    </div> -->

    <div class="w-80">
        <div v-if="loaded" class="relative inline-flex w-full">
            <button @click="openDropdown = !openDropdown"
                class="btn w-full justify-between min-w-44 bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
                aria-label="Select date range" aria-haspopup="true">
                <span class="flex items-center">
                    <span>Select Object</span>
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
                    class="z-10 absolute top-full left-0 w-full bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-scroll mt-1 max-h-[300px]">
                    <input v-model="search" id="small" class="form-input w-full px-2 py-1" type="text"
                        placeholder="Filter Text" />
                    <div v-for="object in results" :key="object[valueAttribute]"
                        class="font-medium text-sm text-gray-600 divide-y divide-gray-200" x-ref="options">
                        <button tabindex="0"
                            class="flex items-center justify-between w-full hover:bg-gray-50 py-2 px-3 cursor-pointer"
                            @click="selectObject()">
                            <span>{{ object[nameAttribute] }}</span>
                            <svg class="shrink-0 ml-2 fill-current text-indigo-400" width="12" height="9"
                                viewBox="0 0 12 9">
                                <path
                                    d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </transition>
            <pre>{{  results  }}</pre>
        </div>
    </div>
</template>

<script setup>
import { useVueFuse, VueFuse } from "vue-fuse"

const emit = defineEmits(["selectedObject"])
const props = defineProps(["objects", "showText", "nameAttribute", "valueAttribute"])
const selectedObject = ref(null)
const loaded = ref(true)

const openDropdown = ref(false)


const { search, results, noResults } = computed(() => {
    console.log("in computed")
    useVueFuse(objects, { keys: [props.nameAttribute] })
})

const objects = computed(() => props.objects)

function selectObject() {
    // emit("selectedObject", selectedObject.value.value)
}

watch(() => props.objects, (objects) => {
    console.log(search)
    console.log(results)
})



</script>