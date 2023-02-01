<template>
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <!-- history button  -->
            <div class="mb-8">
                <button style="display: block; height: 30px; padding: 0; width: 75px"
                    class="ml-auto text-center text-indigo-400 font-bold rounded py-2 w-2/12 focus:outline-none bg-white-900 border-2 border-indigo-400">
                    History
                </button>
            </div>
            <!-- history buttton ends  -->
            <!-- manufacturer name starts here  -->
            <div class="mb-8">
                <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">
                    {{ genericName.name }}
                </h1>
            </div>
            <!-- ends here  -->
            <div class="border-t border-gray-200">
                <div class="space-y-8 mt-8">
                    <div>
                        <div style="display: flex; flex-direction: column" class="grid gap-5 md:grid-cols-3">
                            <div>
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="mandatory">Salt Code<span
                                            class="text-red-500">*</span></label>
                                    <input v-model="genericName.salt_code" id="mandatory" class="form-input w-full"
                                        type="text" required :disabled="id == 'new'" />
                                </div>
                                <div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1" for="mandatory">Name<span
                                                class="text-red-500">*</span></label>
                                        <input v-model="genericName.name" id="mandatory" class="form-input w-full"
                                            type="text" required />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1" for="mandatory">Strength<span
                                                class="text-red-500">*</span></label>
                                        <input v-model="genericName.strength" id="mandatory" class="form-input w-full"
                                            type="text" required />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1" for="mandatory">Datetime
                                            Added<span class="text-red-500">*</span></label>
                                        <input v-model="datetimeAdded" id="mandatory" class="form-input w-full"
                                            type="datetime-local" required />
                                    </div>
                                </div>
                                <div class="flex justify-end gap-5 mt-5">
                                    <button @click="deleteGenericName()" v-if="id == 'new'"
                                        class="btn bg-red-500 hover:bg-red-600 text-white">
                                        Delete
                                    </button>
                                    <button @click="saveGenericName()"
                                        class="btn bg-green-500 hover:bg-green-600 text-white">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup>
import consolaGlobalInstance from 'consola';


const route = useRoute()
const id = route.params.id

const genericName = ref({
    salt_code: "",
    name: "",
    strength: "",
    datetime_added: ""
})

onMounted(async () => {
    if (id == 'new') {

    }
    else {
        genericName.value = await useBaseFetch(`/admin-api/meds/genericname/${id}`)
    }
})

const datetimeAdded = computed({
    get() {
        if (genericName.value.datetime_added) {
            return genericName.value.datetime_added
        }
    },
    set(datetime) {
        datetime =  new Date(datetime)
        genericName.value.datetime_added = datetime.toISOString().replace("Z", "")
    }
})

async function saveGenericName() {
    if (id == 'new') {
        var response = await useBaseFetch("/admin-api/meds/genericname/", {
            method: "POST",
            body: genericName.value
        })
    }
    else{
        console.log(genericName.value)
        var response = await useBaseFetch(`/admin-api/meds/genericname/${id}/`, {
            method: "PATCH", 
            body: genericName.value
        })
    }
    console.log(response)
}

function deleteGenericName() {

}

</script>