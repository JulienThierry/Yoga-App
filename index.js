const main = document.querySelector("main");
const basicArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];
let exerciceArray = [];

// Local Storage function to get Exercice Array
(() => {
  if (localStorage.exercices) {
    exerciceArray = JSON.parse(localStorage.exercices);
  } else {
    exerciceArray = basicArray;
  }
})();

class Exercice {}

const utils = {
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },

  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.store();
          }
        });
      });
    });
  },

  handleEventArrow: function () {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position !== 0) {
            [
              ([exerciceArray[position], exerciceArray[position - 1]] = [
                exerciceArray[position - 1],
                exerciceArray[position],
              ]),
            ];
            page.lobby();
            this.store();
          } else {
            position++;
          }
        });
      });
    });
  },

  deleteItems: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArray = exerciceArray.filter(
          (exo) => exo.pic != e.target.dataset.pic
        );
        exerciceArray = newArray;
        page.lobby();
        this.store();
      });
    });
  },

  reboot: function () {
    exerciceArray = basicArray;
    page.lobby();
    this.store();
  },

  store: function () {
    localStorage.exercices = JSON.stringify(exerciceArray);
  },
};

const page = {
  lobby: function () {
    let mapArray = exerciceArray
      .map((exo) => {
        return `
                <li>
                <div class="card-header">
                <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
                <span>min</span>
                </div>
                <img src="./img/${exo.pic}.png" />
                <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
                <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
                </li>
        `;
      })
      .join("");

    utils.pageContent(
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'> Commencer <i class='fas fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItems();
    reboot.addEventListener("click", () => utils.reboot());
  },

  routine: function () {
    utils.pageContent("Routine", "Exercice", null);
  },

  finish: function () {
    utils.pageContent(
      "Terminé ! ",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class='btn-reboot'> Réinitialiser </button>"
    );
  },
};

page.lobby();
