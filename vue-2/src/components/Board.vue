<script>
import Vue from 'vue'
import EmptyCircles from '@/components/EmptyCircles.vue'
import Piece from '@/components/Piece.vue'

export default Vue.extend({
    name: 'Board',
    components: {
        EmptyCircles,
        Piece,
    },
    data () {
        return {
            PIECES_COLUMNS: 7,
            PIECES_ROWS: 6,
            PIECES_COLORS: ['red', 'yellow'],
            currentColor: 'red',
            piecesAdded: { 'red': [], 'yellow': [] }
        }
    },
    computed: {
        createEmptySquares () {
            let n = 0;
            let emptyPieces = []

            for (let rowSq = 0; rowSq < this.PIECES_ROWS; rowSq++) {
                for (let colSq = 0; colSq < this.PIECES_COLUMNS; colSq++) {
                    emptyPieces.push({
                        row: rowSq,
                        col: colSq,
                        id: n
                    })
                    n++
                }
            }

            return emptyPieces
        }
    },
    methods: {
        changeColor () {
            this.currentColor = this.currentColor === this.PIECES_COLORS[0] ? this.PIECES_COLORS[1] : this.PIECES_COLORS[0]
        },
        addPiece (data) {
            this.piecesAdded[this.currentColor].push(data.emptyId)
            console.log(this.piecesAdded)
        }
    },

})
</script>

<template>
    <div class="board animate__animated animate__bounceInLeft">
        <empty-circles
            v-for="(circle) in createEmptySquares"
            :key="circle.id"
            :circle="circle"
            @change_color="changeColor"
            :color="currentColor"
            @add_piece="addPiece"
        />
    </div>
</template>

<style scoped>
.board {
  display: grid;
  background: rgb(10,33,187);
  background: linear-gradient(0deg, rgba(10,33,187,1) 0%, rgba(23,142,247,1) 100%);
  border: solid 10px;
  border-color: blue;
  border-radius: 1em;
  box-shadow: inset 1px 1px 5px #333;
  height: 90vh;
  aspect-ratio: 1.13 / 1;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  align-items: center;
  gap: 1em;
  padding: 1em; 
  animation-duration: 1s;
  
}
</style>