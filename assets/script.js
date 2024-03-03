// le tableau slides dans lequel on va ranger nos différentes photos pour le carousel
const slides = [
    {
        "image":"slide1.jpg",
        "tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
    },
    {
        "image":"slide2.jpg",
        "tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
    },
    {
        "image":"slide3.jpg",
        "tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
    },
    {
        "image":"slide4.png",
        "tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
    }
];

// les variables des flèches ainsi que la classe pour y mettre les slides
const flecheDeDroite = document.getElementById('flecheD');
const flecheDeGauche = document.getElementById('flecheG');
const bannerImg = document.querySelector('.banner-img');
let currentIndex = 0;

//on créer une fonction qui dans laquelle on va dire :
// si currentIndex est strictement égale a -1 et que la direction est strictement égale a gauche alors je veux afficher la slide précédente 
// et sinon l'inverse 
function updateCarousel(index, direction) {
    if (currentIndex === -1 && direction === 'left') {
        currentIndex = slides.length - 1;
    } else if (currentIndex === slides.length && direction === 'right') {
        currentIndex = 0;
    }
// la on va chercher les images que l'ont a mit dans le tableau slides et les mettre dans la var bannerImg que l'ont a creer précedement 
// avec le document .querySelector on va choisir de creer une balise p dans lequel il y aura les taglines 
    const imagePath = `assets/images/slideshow/${slides[currentIndex].image}`;
    bannerImg.src = imagePath;
    bannerImg.alt = `Slide ${currentIndex + 1}`;
    const tagLine = slides[currentIndex].tagLine;
    document.querySelector('p').innerHTML = tagLine;
    console.log(`Clic sur la flèche ${direction}`);
}
// cette fonction va nous permettre de mettre a jour les dots en leurs ajoutant la classe css selectionné ou en l'enlevant
function updateDots(index, dots) {
    dots.forEach(dot => {
        dot.classList.remove('dot_selected');
    });
    dots[index].classList.add('dot_selected');
    console.log("Mise à jour des points indicateurs");
}
// on creer une var parentElement pour aller chercher la class dots dans le html avec le querySelector
let parentElement = document.querySelector('.dots');

// index = 0 , si index est inférieur a la slide alors ajoute un span 
// la div span est ensuite créer ici pour mettre les dots dans le html 
// ligne 62 on ajoute une classe "other_dot_" avec différents chiffre en fonction de leurs créations
for (let i = 0; i < slides.length; i++) {
    let newElement = document.createElement('span');
    newElement.classList.add('dot');
    newElement.classList.add('other_dot_' + (i + 1));
    parentElement.appendChild(newElement);
}
// on creer la var dot et on va chercher tous les span qu'ont a créer précédemment 
let dots = document.querySelectorAll(".dot");
// dans cette fonction, on creer le click qui sur les dots ce qui va permettre
// de changer de slide au clic
dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentIndex = index;
        updateCarousel(currentIndex, 'dot');
        updateDots(currentIndex, dots);
        console.log("Clique sur un dot");
    });
});
// on creer dans cette fonction et dans la suivante un ecouteur de clique sur les flèches 
//lorsque celle ci sont cliqué les slides iront a l'image de gauche ou de droite
// et la dots correspondant a l'image sera sélectionné
flecheDeDroite.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex, 'right');
    updateDots(currentIndex, dots);
    console.log('Flèche de droite cliquée');
});

flecheDeGauche.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex, 'left');
    updateDots(currentIndex, dots);
    console.log('Flèche de gauche cliquée');
});

updateCarousel(currentIndex, 'démarrage');
updateDots(currentIndex, dots, 'démarrage');
