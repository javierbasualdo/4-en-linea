<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'Empty',
    props: {
        circle: { required: true },
        color: { required: true },
    },
    data () {
        return {
            
        }
    },
    computed: {
        
    },
    methods: {
        addSquare (e) {
            let sq = e.target
            this.$emit('change_color')
            const squareEmpty = this.availableRowColumns(sq)

            if (squareEmpty !== null) {
                this.$emit('add_piece', { emptyId: +squareEmpty.dataset.id })
            //     this.piecesAdded[this.currentColor].push(+squareEmpty.dataset.id);
            //     const props = { color: this.currentColor, taken: () => squareTaken(this.currentColor) };
            //     // const piece = new Piece(props);
            //     // squareEmpty.appendChild(piece);
            //     // squareEmpty.classList.add('disabled');
            //     // squareEmpty.onclick = false;
            //     console.log(this.piecesAdded)
            // } else {
            //     alert(`No more pieces in column`)
            }
        },
        availableRowColumns (sq) {
            const col = sq.dataset.col;
            const columnEl = document.querySelectorAll(`[data-col="${col}"]`);
            const columns = [...columnEl].reverse();
            const empty = columns.find(col => col.innerHTML === "");
            
            if (empty) {
                return empty;
            }
            return null
        }
    }
})
</script>

<template>
    <div 
        :data-row="circle.row"
        :data-col="circle.col"
        :data-id="circle.id"
        @click="addSquare"
        class="empty-square"
    >
    </div>
</template>

<style scoped>
.empty-square {
  border: solid 3px blue;
  border-radius: 50%;
  aspect-ratio: 1;
  box-shadow: 1px 3px 1px #333, inset 1px 13px 15px #333;
  cursor: pointer;
  overflow: hidden;
}
.empty-square:hover {
  box-shadow: inset 3px 3px 30px white;
}
.empty-square:empty:hover::before {
  content: '\2193';
  display: grid;
  place-content: center;
  height: 100%;
  font-size: 3em;
  color: white;
}
</style>
