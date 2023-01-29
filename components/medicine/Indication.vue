<template>
    <div class="border flex flex-wrap gap-5 p-2 w-full">
        <div class="flex gap-1 border-2 rounded-sm" v-for="indication in indications" :key="indication">
            <div class="bg-blue-200 px-2">
                {{ indication }}
            </div>
            <span @click="removeIndication(indication)" class="rotate-45 scale-150 pl-1 pr-1.5 text-red-500 cursor-pointer">+</span>
        </div>
        <div>
            <input ref="input" class="border px-2 w-[200px]" v-model="searchText" @keyup.enter="addIndication()" type="text" placeholder="indication" @blur="removeSuggestions()" >
            <div class="relative w-[200px] z-10">
                <div class="absolute">
                    <div v-for="suggestion in suggestions" :key="suggestion" @click="addIndication(suggestion.name)" class="border rounded p-1 w-[200px] bg-blue-50 hover:bg-blue-100 cursor-pointer">
                        {{ suggestion.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>


const searchText = ref("")

const props = defineProps(["existingIndications"])
const emit = defineEmits(["changed"])

const indications = ref([])

const suggestions = ref()

const apiURL = useApiURL()

const input = ref(null)

watch(() => props.existingIndications, (newIndications) => {
    console.log(newIndications)
    indications.value = newIndications
})

async function addIndication(indication) {
    suggestions.value = []
    if (indication){
        indications.value.push(indication)
    }
    else if (searchText.value){
        indications.value.push(searchText.value)
        try{
        var response = await $fetch(`${apiURL.value}/meds/indication/`, {
            method: 'POST',
            body: {"name": searchText.value}
        })
        }
        catch{

        }
    }
    emit("changed", indications.value)
    input.value.focus()
    searchText.value = ""
}

watch(searchText, async (text) => {
    if (text){
        var response = await useBaseFetch(`/meds/indication/?name__startswith=${text}`)
        suggestions.value = response.results.filter((result) => {
            return indications.value.indexOf(result.name) == -1
        })
    }
})

function removeIndication(indication) {
    var index = indications.value.indexOf(indication)
    indications.value.splice(index, 1)
    emit("changed", indications.value)
}

function removeSuggestions(){
    setTimeout(() => {
        suggestions.value = []
    }, 200);
}

</script>