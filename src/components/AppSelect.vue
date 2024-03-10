<script>
export default {

    name: 'AppSelect',

}
</script>

    <template>
        <select class="w-25" v-model="store.genreSearch" name="genres" id="" @change="$emit('search')">
            <option :value="0">---Select genre---</option>
            <option v-for="genre in store.selectArray">{{genre}}</option>
        </select>
    </template>

<style lang="scss">

</style>