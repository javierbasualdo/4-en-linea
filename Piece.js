import animation from "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" assert { type: "css"};
import styles from "./piece.css" assert { type: "css" };

class Piece extends HTMLElement {
    constructor(props) {
        super();

        this.props = props;
        this.attachShadow({mode: 'open'});

        const squarePiece = document.createElement('div');
        squarePiece.classList.add('piece');
        squarePiece.classList.add('animate__animated', 'animate__fadeInDownBig', 'animate__faster');
        squarePiece.style.backgroundColor = this.props.color;
        squarePiece.dataset.color = this.props.color;
        const innerPiece = document.createElement('div');
        innerPiece.classList.add('inner-piece');
        squarePiece.appendChild(innerPiece);

        this.shadowRoot.appendChild(squarePiece);
    }

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets.push(animation);
        this.shadowRoot.adoptedStyleSheets.push(styles);
        this.shadowRoot.addEventListener("animationend", this, false);
    }

    handleEvent(event) {
        if(event.type === "animationend") {
            this.props.taken();
        }
    }
}

customElements.define('game-piece', Piece);

export default Piece;