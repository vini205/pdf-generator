let tipoManutencao=getElement("itipo");campoCorretiva(),tipoManutencao.addEventListener("change",(()=>{"preventiva"==tipoManutencao.value?campoPreventiva():campoCorretiva()})),document.querySelector("#preventivaForm").removeChild(document.querySelector("#preventivaForm > button:nth-child(6)")),manutencaoPreventiva();const pMaterial=document.getElementById("materialConfirm");var materialCounter=0;const pCorfim=document.getElementById("materialConfirm");pCorfim.addEventListener("click",(()=>addMaterial()));const materialHolder=document.getElementById("div__material");getElement("iimages").addEventListener("change",updateImages);const imageText={},btn=getElement("btn");function assinatura(){let e=document.createElement("canvas");e.id="quadro",popOut({value:"Assinatura"},"","",e),desenharCanvas()}function addMaterial(){let e=document.createElement("input");e.id="imqtd"+materialCounter,e.placeholder="Quantidade",e.type="number",e.title=e.placeholder;let t=document.createElement("input");t.id="imvalorUnit"+materialCounter,t.placeholder="Valor Unitário",t.title=t.placeholder,t.type="number",t.pattern=/d{2}(,|.)\d{2}/;let n=document.createElement("input");n.id="imdescricao"+materialCounter,n.placeholder="Decrição",n.title=n.placeholder;let a=document.createElement("input");a.id="imunidade"+materialCounter,a.placeholder="Unidade de Medida ",a.title=a.placeholder,a.list="unidadesMedida";const l=document.createElement("div");l.id="div"+materialCounter;const i=document.createElement("p");i.id="resetMaterialBtn"+materialCounter,i.innerText="Excluir material",i.classList.add("material__p","btn--form"),l.classList.add("material__div"),i.addEventListener("click",(()=>{l.remove(),materialCounter--})),materialCounter++,l.append(n,e,a,t,i),materialHolder.append(l)}function fillTable(){resetTable();let e=getElement("form");for(let t=0;t<e.elements.length-1;t++){const n=e.elements[t];let a;switch(n.id){case"iimages":a="imagens";continue;case"preventivaForm":continue;case"ichamado":let e=new Date;a=n.value+`A${String(e.getUTCFullYear()).substring(2)}`;break;case"idataSaida":case"idataChegada":a=fixDate(n.value);break;default:a=null==n.value?"":n.value}let l=n.id.slice(1);"dataChegada"==l&&addToTable(a,"data"),addToTable(a,l)}if(addToTable(subTime(getElement("ihoraChegada").value,getElement("ihoraSaida").value),"tempoTotal"),addMaterials(),addImages(),null===getElement("btnId")){const e=document.createElement("button");e.classList.add("printBtn"),e.id="btnId",e.addEventListener("click",(()=>print())),e.innerText="Imprimir pdf",getElement("btn-holder").append(e)}}function manutencaoPreventiva(){let e=document.getElementById("preventivaForm").children;for(const n of e)if("BUTTON"==n.nodeName)if(n.classList.contains("btn__prev--value"))n.addEventListener("click",(()=>{let e,t={value:n.innerHTML,classes:[""]},a=document.createElement("button");a.textContent="Salvar",a.addEventListener("click",(function t(){n.classList.add("used");let l=document.querySelector("body > div.popOut > input").value;e=n.innerHTML.replace("___",l),addToTextarea("imanutencao",e+"\n"),a.removeEventListener("click",t),a.textContent="Salvo"})),popOut(t,{type:"number",placeholder:"Digite o valor desejado ",classes:["input__PopOut"],initial:""},"",a)}));else{function t(){addToTextarea("imanutencao",n.textContent+"\n"),n.classList.add("used"),n.removeEventListener("click",t)}n.addEventListener("click",t)}}function updateImages(){const e=document.querySelector(".preview__img");let t=getElement("iimages").files;if(t.length>0){for(const n of t){const t=document.createElement("div"),a=document.createElement("img");t.classList.add("image__holder"),a.classList.add("img"),e.classList.add("preview__img--visible"),a.src=URL.createObjectURL(n),t.appendChild(a),e.append(t);const l=n.name.slice(0,n.name.lastIndexOf("."));a.alt=l,a.title=l,t.id=l,t.addEventListener("dblclick",(e=>{e.target.remove()}),!0),t.addEventListener("click",(e=>{popOutImg(e.target)})),imageText[l]=[a,""]}return`${t.length} imagens adicionadas`}return"Sem Imagens"}function desenharCanvas(){let e=document.getElementById("quadro"),t=e.getContext("2d"),n=!1;e.onmousedown=function(a){console.log(a),console.log(e),t.beginPath(),t.moveTo(a.clientX-e.offsetWidth,a.clientY-e.offsetHeight),n=!0},e.onmouseup=function(){n=!1},e.onmousemove=function(a){n&&(t.lineTo(a.clientX-e.offsetWidth,a.clientY-e.offsetHeight),t.strokeStyle="black",t.stroke())}}function subTime(e,t){let n=Number(e.slice(0,2)),a=Number(t.slice(3,5)),l=Number(e.slice(3,5)),i=Number(t.slice(0,2))+a/60-(n+l/60);return i=i.toFixed(2),i}function addImages(){for(const e in imageText){const t=imageText[e],n=document.createElement("p"),a=document.createElement("div"),l=t[0].cloneNode();l.classList.add("img__table"),n.classList.add("p__table"),a.append(l,n),n.textContent=t[1],n.classList.add("legendImg"),offToggle([],[document.querySelector(".imagens")]),getElement("imagens").appendChild(a)}}function addMaterials(){if(materialHolder.children.length>0){offToggle([],[document.querySelector(".materiais")]);let e=materialHolder.children.length,t=0;for(let n=0;n<e;n++){const e=materialHolder.children[n];console.log(e.children);let a=e.children[0].value,l=e.children[1].value,i=e.children[2].value,o=e.children[3].value,r=o*l;t+=Number(r),r=r.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),o=o.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),createMaterialField(a,l,i,o,r)}t=t.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),getElement("total").innerHTML=t}else offToggle([document.querySelector(".materiais")],[])}function resetTable(){for(;getElement("imagens").firstChild;)getElement("imagens").removeChild(getElement("imagens").firstChild),offToggle([document.querySelector("#imagens")],[]);try{let e=document.querySelector(".materiais").children.length;for(let t=e;0<e-1;t--){const e=document.querySelector(".materiais").children[t-1];e.classList.contains("titulo")||"total"==e.id||e.remove()}}catch(e){}}function createMaterialField(e="descrição",t="0",n="0",a="0",l){let i=document.createElement("div"),o=document.createElement("div"),r=document.createElement("div"),c=document.createElement("div"),d=document.createElement("div");i.innerHTML=e,o.innerHTML=t,r.innerHTML=n,c.innerHTML=a,d.innerHTML=l,document.querySelector("#materialTotal").before(i,o,r,c,d)}function addToTextarea(e,t){getElement(e).value+=t,addLines(getElement(e),30)}function popOut(e="",t="",n="",...a){let l,i,o,r=[a];const c=document.createElement("span");c.classList.add("material-symbols-outlined"),c.style.cursor="pointer",c.innerHTML="close",c.addEventListener("click",(()=>{d.remove()}));const d=document.createElement("div");if(d.appendChild(c),""!=e){l=document.createElement("p"),l.innerHTML=e.value;try{l.classList.add(classes)}catch(e){}d.append(l)}if(""!==t){i=document.createElement("input"),i.type=t.type,i.value=t.initial,i.placeholder=t.placeholder;try{i.classList.add(t.classes)}catch(e){}d.append(i)}if(""!=n){o=document.createElement("img"),o.title=n.name,o.alt=n.name;try{o.classList.add(n.classes)}catch(e){}d.append(n)}d.classList.add("popOut");for(let e=0;e<r.length;e++){const t=a[e];d.append(t)}document.body.appendChild(d)}function popOutImg(e){const t=document.createElement("div"),n=document.createElement("p"),a=document.createElement("input"),l=document.createElement("span"),i=document.createElement("button"),o=document.createElement("button"),r=e.cloneNode();i.classList.add("saveBtn"),i.textContent="salvar",l.textContent="close",o.textContent="Deletar Imagem",a.placeholder="Legenda da Imagem",t.classList.add("popOut"),l.classList.add(["material-symbols-outlined"]),o.classList.add("deleteImgBtn"),n.textContent="Escreva uma legenda para a imagem selecionada",l.style.cursor="pointer",l.addEventListener("click",(()=>{t.remove()})),i.addEventListener("click",(()=>{imageText[r.alt]=[r,a.value],a.style.backgroundColor="#1eff3396",i.textContent="Salvo",a.style.color="green"})),o.addEventListener("click",(()=>{e.remove()})),t.append(l,n,r,a,i,o),document.body.appendChild(t)}function addToTable(e,t){try{getElement(t).innerText=e}catch(e){}}function getElement(e,t,n){return void 0===t&&void 0===n?document.getElementById(e):void 0===n?document.getElementsByClassName(t):document.querySelectorAll(n)}function campoPreventiva(){offToggle([getElement(void 0,"corretivaTable")[0],getElement("corretivaForm")],[getElement(void 0,"preventivaTable")[0],getElement("preventivaForm")])}function offToggle(e,t){for(const t of e)t.classList.add("off");for(const e of t)e.classList.remove("off")}function campoCorretiva(){offToggle([getElement(void 0,"preventivaTable")[0],getElement("preventivaForm")],[getElement(void 0,"corretivaTable")[0],getElement("corretivaForm")])}function addLines(e,t){if(e.style.fontSize=t+"px",e.offsetHeight<e.scrollHeight){let t=Number(e.style.fontSize.slice(0,2)),n=Math.floor(e.scrollHeight/t);e.rows=n}}function fixDate(e){e=e.replace(/-/g,"/"),console.log(e);let t=String(e).substring(0,4),n=String(e).substring(5,7);return`${String(e).substring(8,10)}/${n}/${t}`}btn.addEventListener("click",fillTable),document.querySelectorAll("[type=date]").forEach((e=>{let t=new Date;e.value=`${t.getFullYear()}-${t.getMonth().toString().padStart(2,"0")}-${t.getDate().toString().padStart(2,"0")}`}));
//# sourceMappingURL=formulario.c0a0cccc.js.map
