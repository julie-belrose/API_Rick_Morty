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
    // 3. Extraire dynamiquement les clés (ex: Object.keys()) depuis un des objets pour construire les <th>
    // 4. Boucler sur "characters" (le tableau) pour créer les <tr> + <td>
    // 5. Ajouter la table dans le DOM (par ex. dans un <div id="result">)

    addCaptation(element);


    for (const el in element ){
        console.log(el);
        //thead
        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");


        //const headers = ["id", "name", "status", "species", "gender", "origin", "location"];
       // el.forEach(key => {
            const th = document.createElement("th");
            th.textContent = `${el}`;
            headRow.appendChild(th);
       // });
        thead.appendChild(headRow);
        content.appendChild(thead);
    }
};

const addCaptation =(element)=>{
    // Caption
    const caption = document.createElement("caption");
    caption.textContent = `Infos of ${element.name}`;
    content.appendChild(caption);
};