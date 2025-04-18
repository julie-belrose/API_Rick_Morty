// * Permettre de chercher un personnage via son **nom**
//  * Permettre de chercher un personnage via son **identifiant**
//  * Permettre de visualiser les **informations principales** du personnage (son **nom**, son **espèce**, son **genre**, son **statut**, son **origine**, sa **dernière localisation connue**, et l'**image** du personnage)
// * Il devra être possible de passer directement au personnage **suivant ou précédent** dans la base de données (aller du #27 au #28 par exemple). Cette fonctionnalité devra vérifier si l'on est déjà au **premier ou au dernier personnage** afin d’éviter les erreurs

const BASE_URL = "https://rickandmortyapi.com/api/";
const content = document.getElementById("content")


const getCharacterById = async (id) => {
    console.log(`url : ${BASE_URL}character/${id}`);
    await fetch(`${BASE_URL}character/${id}`, {
        headers:{
            "Content-type":"application/json"
        },
        method: "GET",
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Erreur : ${res.status}`);
        }
        const tab = Object.entries(res);
        console.log(`response : ${res}`);
        console.log(`response tab : ${tab}`);
        return res.json();
    })
        .then(data => {
            console.log("data:", data);
            createElementHtml(data);
        })
        .catch(error => {
            console.error("Erreur lors de l'appel API :", error);
        });

};

getCharacterById(2).then(r =>r );

const createElementHtml = (element) =>{
    addCaptation(element);

    for (const el in element ){
        // console.log(el);
         addThead(el);
         addTbody(`${el}`,  element[el]);
    }
};

const addCaptation =(element)=>{
    // Caption
    const caption = document.createElement("caption");
    caption.textContent = `Infos of ${element.name}`;
    content.appendChild(caption);
};

const addThead =(element)=>{
    //thead
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = `${element}`;
    headRow.appendChild(th);
    thead.appendChild(headRow);
    content.appendChild(thead);
};

const addTbody = (key, value) =>{
    // tbody
    const tbody = document.createElement("tbody");
    const bodyRow = document.createElement("tr");
    const td = document.createElement("td");

    if (Array.isArray(value) && key === "episode") {
        td.textContent = value[0];
    }
    else if (typeof value === "object" && value !== null) {
        td.textContent = value.name || JSON.stringify(value);
    }
    else {
        td.textContent = value;
    }
    bodyRow.appendChild(td);

    tbody.appendChild(bodyRow);
    content.appendChild(tbody);
}