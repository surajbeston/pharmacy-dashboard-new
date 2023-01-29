
<template>
    <div class="border border-gray-200 w-full rounded-md">
        <div class="flex justify-end m-5">
            <AsyncDropdown v-if="showAsyncDropdown" :objects-url="objectsUrl" :name-attribute="nameAttribute"
                :value-attribute="valueAttribute" @selected-object="addObject"></AsyncDropdown>
            <Dropdown v-else :name-attribute="nameAttribute" :objects="dropdownObjects"
                :value-attribute="valueAttribute" @selected-object="addObject"></Dropdown>
        </div>
        <div class="flex flex-wrap m-5 gap-5">
            <div v-for="object in sortedObjects" :key="object[valueAttribute]"
                class="inline-flex min-w-80 px-4 py-2 rounded-sm text-sm  shadow-lg border border-gray-200 text-gray-600 bg-blue-100"
                :class="{ 'bg-green-400': object.justAdded }">
                <div class="flex w-full justify-between items-start">
                    <div class="flex">
                        <div>{{ object[nameAttribute] }}</div>
                    </div>
                    <button class="opacity-70 hover:opacity-80 ml-3 mt-[3px]" @click="removeObject(object)">
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

//addition of "objectsUrl" field will use AsyncDropdown instead of Dropdown
//to use base Dropdown "objects" should be passed and "objectsUrl" should be ignored

import consolaGlobalInstance from 'consola';
import AsyncDropdown from './AsyncDropdown.vue';
import Dropdown from './Dropdown.vue';

const props = defineProps(["objectsUrl", "objects", "nameAttribute", "valueAttribute", "initialObjects", "sort"])
const emit = defineEmits(["objectSelected"])

const showAsyncDropdown = ref('false')
const dropdownObjects = ref([])

const selectedObjects = ref([])

const errorMessages = useFetchErrors()

onMounted(async () => {
    if (props.objectsUrl) {

    }
    else {
        showAsyncDropdown.value = false
        dropdownObjects.value = props.objects
    }
    if (props.initialObjects) {
        selectedObjects.value = props.initialObjects
    }
})

const sortedObjects = computed(() => {
    if (props.sort) {
        return selectedObjects.value.sort((a, b) => a[props.nameAttribute] > b[props.nameAttribute] ? 1 : a[props.nameAttribute] < b[props.nameAttribute] ? -1 : 0)
    }
    else {
        return selectedObjects.value
    }
})

function addObject(object) {
    var contains = false
    selectedObjects.value.forEach((each) => {
        if (each[props.valueAttribute] == object[props.valueAttribute]) {
            contains = true
        }
    })
    console.log(selectedObjects.value)
    console.log(object)
    console.log(contains)
    if (!contains) {
        object.justAdded = true
        selectedObjects.value.push(object)
        emitObjectValues()
    }
    else{
        errorMessages.value.push(`${object[props.nameAttribute]} is already present.`)
    }
}

function removeObject(object) {
    var index = selectedObjects.value.indexOf(object)
    selectedObjects.value.splice(index, 1)
    emitObjectValues()
}

function emitObjectValues() {
    var selectedValues = []
    selectedObjects.value.forEach((each) => {
        selectedValues.push(each[props.valueAttribute])
    })
    emit("objectSelected", selectedValues)
}

</script>