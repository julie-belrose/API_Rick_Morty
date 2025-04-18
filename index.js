// * Permettre de chercher un personnage via son **nom**
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

// * Search for a character using its **identifier**.
const getCharacterById = async (id) => {
    try {
        const data = await apiCall({
            url: `${BASE_URL}character/${id}`,
            method: "GET",
        });
        addCaptation(data && data.name);
        createElementHtml(data);
    } catch (error) {
        console.error("Error in call API GET by ID :", error);
    }
};

const getCharacterByName = async (name) => {
    try {
        const data = await apiCall({
            url: `${BASE_URL}character/?name=${name}`,
            method: "GET",
        });
        console.log("data by name", data);

        addCaptation(data?.results?.[0]?.name);
        createElementHtml(data?.results?.[0]);
        //todo table for all ricky
    } catch (error) {
        console.error("Error in call API GET by ID :", error);
    }
};

getCharacterById(2).then(res =>res);

getCharacterByName('Rick Sanchez').then(res =>res);

const createElementHtml = (element) =>{
    for (const el in element ){
        if (el !== 'info' && el !== 'results' && el !== 'image') {
             // console.log(el);
             addThead(el);
             addTbody(`${el}`,  element[el]);
         }
    }
    addImg(element, element?.image);
};

const addCaptation =(name)=>{
    // Caption
    const caption = document.createElement("caption");
    caption.textContent = `Infos of ${name}`;
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

const addImg =(element, imgUrl)=> {
    const container = document.getElementById('container_img');

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = element.name;
    container.appendChild(img);
}
