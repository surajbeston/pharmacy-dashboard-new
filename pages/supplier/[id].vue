<template>
    <div>
        <AsyncDropDown objectsUrl="/meds/manufacturer/with_initial/" nameAttribute="name" valueAttribute="id"
            @selectedObject="selectManufacturer">
        </AsyncDropDown>
    </div>
</template>

<script setup>
import AsyncDropDown from '~/components/utils/AsyncDropdown.vue';

function selectManufacturer(manufacturer) {
    console.log(manufacturer)
}

</script>