// * Permettre de chercher un personnage via son **nom**
//  * Permettre de chercher un personnage via son **identifiant**
//  * Permettre de visualiser les **informations principales** du personnage (son **nom**, son **espèce**, son **genre**, son **statut**, son **origine**, sa **dernière localisation connue**, et l'**image** du personnage)
// * Il devra être possible de passer directement au personnage **suivant ou précédent** dans la base de données (aller du #27 au #28 par exemple). Cette fonctionnalité devra vérifier si l'on est déjà au **premier ou au dernier personnage** afin d’éviter les erreurs

const BASE_URL = "https://rickandmortyapi.com/api/";
const content = document.getElementById("content")


const apiCall = async ({ url, method ="GET", body =null, headers = {}})=> {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Error in apiCall :", err);
        throw err;
    }
};

const getCharacterById = async (id) => {
    try {
        const data = await apiCall({
            url: `${BASE_URL}character/${id}`,
            method: "GET",
        });
        console.log("data:", data);
        createElementHtml(data);
    } catch (error) {
        console.error("Error in call API GET by ID :", error);
    }
};

getCharacterById(2).then(r =>r );

const createElementHtml = (element) =>{
    addCaptation(element);

    for (const el in element ){
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