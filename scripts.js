let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let zaidimas = document.querySelector(".game");
let zaidejai = document.querySelector(".names");
let kieno_eile1 = document.getElementById("eile1");
let kieno_eile2 = document.getElementById("eile2");

let rezultatasX = 0;
let rezultatasO = 0;
//Laimejimų masyvas
let Laimejimai = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//1 žaidėjas X
let xTurn = true;
let count = 0;

//išjungti visus mygtukus
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //įjungti popup
  popupRef.classList.remove("hide");
};

//įjungti mygtukus naujam žaidimui ir restartui
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //išjungti popup
  popupRef.classList.add("hide");
};

//Kai žaidėjas laimi funkcija
const laimejo_funckija = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' laimėjo";
    rezultatasX++;
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' laimėjo";
    rezultatasO++;
  }
  Vardai();
};

//Funkcija lygiosioms
const lygiosios_funkcija = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> Lygiosios";
};

//Naujas žaidimas, kartojami žaidimo seansai
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Restartuoti žaidimą ir jo rezultatus
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  new_results();
});

//Kada laimima
const winChecker = () => {
  //pereinama per visus laimejimų masyvus
  for (let i of Laimejimai) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //žiūrima ar elementai užpildyti
    //kad 3 tušti elementai nebūtų daroma sąlyga, kitaip būtų skaitoma kaip laimėjimas
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //jei visi 3 mygtukai turi tas pačias reikšmes kreipiamasi į laimejo_funkcija
        laimejo_funckija(element1);
      }
    }
  }
};




//Pamygus rodomas X/O x arba o
btnRef.forEach((element) => {

  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Rodyk X
      element.innerText = "X";
      element.disabled = true;
      kieno_eile1.innerText = "'O' eilė";
    } else {
      xTurn = true;
      //Rodyk O
      element.innerText = "O";
      element.disabled = true;
      kieno_eile1.innerText = "'X' eilė";
    }
    
    // kieno_eile1.classList.remove('show');
    // kieno_eile1.classList.add('hide');
    // kieno_eile2.classList.remove('hide');
    // kieno_eile2.classList.add('show');

    //Padidinamas count kiekvienu žaidėjo paspaudimu
    count += 1;
    if (count == 9) {
      lygiosios_funkcija();
    }
    // kiekviena paspaudima patikrinti ar laimejo
    winChecker();
  });

});

//Aktyvuoti mygtukus ir išjungti popup kai užkraunamas puslapis
window.onload = enableButtons;

// function onLoad() {
//     //method for button times
//     var group1 = document.getElementById("group1");
//     group1.classList.remove('hide');
//     group1.classList.add('show');
    
//     var group2 = document.getElementById("group2");
//     group2.classList.remove('show');
//     group2.classList.add('hide');
//   }

function rodyk(){
     
    // zaidejai.classList.add("hide");

    var group1 = document.getElementById("group1");
    group1.classList.remove('show');
    group1.classList.add('hide');

    zaidimas.classList.remove("hide");

    Vardai();

}

 function Vardai(){
    sessionStorage.setItem("player_key1", document.getElementById("player1_id").value);
    sessionStorage.setItem("player_key2", document.getElementById("player2_id").value);
    sessionStorage.setItem("rezultatasX_key", rezultatasX);
    sessionStorage.setItem("rezultatasO_key", rezultatasO);
    let player1 = sessionStorage.getItem("player_key1");
    let player2 = sessionStorage.getItem("player_key2");
    let x = sessionStorage.getItem("rezultatasX_key");
    let o = sessionStorage.getItem("rezultatasO_key");
    document.getElementById("tekstas").innerHTML =   player1 +" X" + " : " + "O " + player2;
    document.getElementById("tekste").innerHTML = x + " : " + o;
    sessionStorage.clear();
    // alert(player1 + " " + x + " : " + o + " " + player2);
 }

 function new_results(){
    rezultatasX = 0;
    rezultatasO = 0;
    Vardai();
    // sessionStorage.clear();
 }

 /* 

 #1. Būklės, eigos matomumas (Visibility of system status)
Naudotojo informavimas apie dabartinę naudojamos 
sistemos būseną, būklę, naudojimosi proceso eigą.
o Svarbi grįžtamojo ryšio dalis.
o Įgalina naudotoją priimti sprendimus apie tolimesnius 
veiksmus, planuoti juos.
o Atkreipia dėmesį į svarbius dalykus.

REZULTATAS

#3. Veiksmų laisvė (User control and freedom)
Bet kuriuo atveju naudotojas turi turėti pasirinkimą (tęsti, 
sustabdyti, atšaukti procesą).
o Galimybė atšaukti pakeitimus ar visą procesą sudaro 
galimybes aktyviau, drąsiau dirbti.
o Leidžia sumažinti klaidų skaičių.

PASIRINKIMAS

#5. Klaidų išvengimas (Error prevention)
Valdymo klaidų galima išvengti:
o Kruopščiau modeliuojant naudotojus ir jų elgesį.

PAMYGUS DAR KART ANT ŽAIDIMŲ LENTELĖS NEPSASIMYGA KITAS REZULTATAS LENTELĖJE
 
 #6. Atpažinimas, o ne prisiminimas (Recognition rather
than recall)
Šio principo esmė – naudotojas turėtų atpažinti procesą ir 
jo valdymą, o ne (bandyti) prisiminti.
o Paspartinama informacijos paieška, sprendimo 
priėmimas.
o Neapkraunama atmintis.

ŽAIDIMAS ATPAŽĮSTAMAS KRYŽIUKAIS NULIUKAIS, NEREIKIA ĮSIMINTI DAUG DALYKŲ

#8. Estetika ir minimalizmas (Aesthetic and minimalist
design)
Sąsajoje turi būti pateikiama tik reikalinga informacija. 
Papildoma informacija ir vaizdai užgožia esmę ir sumažina 
matomumą.
o Užtikrinamas esminės informacijos, funkcionalumo 
matomumas.
o Sukuriama teigiama naudotojo patirtis.

MATOMA DAŽNIAUSIAI TIK REIKALINGA INFORMACIJA
 
 */