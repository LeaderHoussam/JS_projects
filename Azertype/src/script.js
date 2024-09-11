/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}


/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }
    
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}


/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    let inputEcriture = document.getElementById("inputEcriture")


    afficherProposition(listeProposition[i])

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            // On désactive le bouton valider
            btnValiderMot.disabled = true
            // On désactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                listeBtnRadio[indexBtnRadio].disabled = true
            }

        } else {
            afficherProposition(listeProposition[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios. 
    
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }

    afficherResultat(score, i)
}