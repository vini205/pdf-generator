let tipoManutencao = getElement("itipo");
tipoManutencao.addEventListener("change", ()=>{
    if (tipoManutencao.value == "preventiva") campoPreventiva();
});
function fillHeader() {
    let form = getElement("form");
    for(let i = 0; i < 22; i++){
        const e = form.elements[i];
        let value;
        switch(e.id){
            case "images":
                value = "imagens";
                continue;
            case "tipo":
            default:
                value = e.value == undefined ? "" : e.value;
                break;
        }
        let tag = e.id;
        tag = tag.slice(1);
        console.log(tag);
        if (tag == "dataChegada") addToTable(value, "data");
        addToTable(value, tag);
    }
}
function addToTable(data, where) {
    try {
        let element = getElement(where);
        console.log(element);
        element.innerText = data;
    } catch (error) {
        console.log(" DATA: " + data + ", WHERE " + where + "\n" + error);
    }
}
function getElement(id, className, tag) {
    if (className === undefined && tag === undefined) return document.getElementById(id);
    else if (tag === undefined) return document.getElementsByClassName(className);
    else return document.querySelectorAll(tag);
}
function campoPreventiva() {
    offToggle([
        getElement(undefined, "corretivaTable"),
        getElement("corretivaForm")
    ], [
        getElement(undefined, "preventivaTable"),
        getElement("preventivaForm")
    ]);
}
function offToggle(off, on) {
    for (const i of off)i.classList.add("off");
    for (const i of on)i.classList.remove("off");
}
function campoCorretiva() {
    offToggle([
        getElement(undefined, "preventivaTable"),
        getElement("preventivaForm")
    ][getElement(undefined, "corretivaTable"), getElement("corretivaForm")]);
}

//# sourceMappingURL=formulario.e8e97434.js.map
