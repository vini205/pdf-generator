console.log("Working");var addCount=0;function c(e){console.log(e)}function addLines(e){if(e.style.fontSize="13px",e.offsetHeight<e.scrollHeight){let t=Number(e.style.fontSize.slice(0,2)),n=Math.floor(e.scrollHeight/t);e.rows=n}}function getElement(e,t,n){return void 0===t&&void 0===n?document.getElementById(e):void 0===n?document.getElementsByClassName(t):document.querySelectorAll(n)}function putInInput(e,t){for(const n of t)n.value=e}function addInObj([e,t=e],n){n[t]=e}function fixDate(e){let t=e.slice(0,4),n=e.slice(5,7);return`${e.slice(8)}/${n}/${t}`}function add(){if(0!==addCount)return void alert("Resete a tabela primeiro");addCount++;let e=ICHAMADO.value;ICHAMADO.type="text",ICHAMADO.value=`CH${e}23`;ITIPO[0].checked?TTABLETYPE[0].checked=!0:ITIPO[1].checked?TTABLETYPE[1].checked=!0:""!=ITIPOoUTRO.value&&(TTABLETYPE[2].checked=!0,TTIPOOUTRO.innerHTML=ITIPOoUTRO.value),THORATOTAL.innerHTML=subTime(IHORAIN.value,IHORAOUT.value),THORATOTAL.innerHTML=subTime(IHORAIN.value,IHORAOUT.value),THORATOTAL.innerHTML=subTime(IHORAIN.value,IHORAOUT.value);for(let e=0;e<topass.length;e+=2){addTOTable(topass[e],topass[e+1]),"TEXTAREA"==topass[e+1].tagName&&addLines(topass[e+1]),tableDefault.push([THORATOTAL,THORATOTAL.innerHTML]),document.getElementsByClassName("table")[0].style.display="block",getElement("btn-holder").append(printBtn,resetBtn)}if(ICHAMADO.type="number",ICHAMADO.value=e,holder.children[0]!==IMATERIALNUMBER)addMaterialTable(holder.children.length),addMaterialToTable();else{document.querySelectorAll(".material__td").forEach((e=>{e.style.display="none"}))}}function subTime(e,t){let n=Number(e.slice(0,2)),l=Number(t.slice(3,5)),a=Number(e.slice(3,5)),i=Number(t.slice(0,2))+l/60-(n+a/60);return i=i.toFixed(2),i}function addTOTable(e,t){if("TEXTAREA"==e.tagName)tableDefault.push([t,t.value]),t.value=`${e.value}`;else if("date"==e.type){tableDefault.push([t,t.innerHTML]);let n=fixDate(e.value);"/2023"==t.innerHTML?t.innerHTML=`${n}`:t.innerHTML+=`: ${n}`}else"time"==e.type?(tableDefault.push([t,t.innerHTML]),t.innerHTML=`${e.value}`):"iespaco"==e.id?(tableDefault.push([t,t.innerHTML]),t.innerHTML=e.value+" Km"):"inametec"==e.id||"iclienteName"===e.id?(tableDefault.push([t,t.innerHTML]),t.innerHTML=e.value):(tableDefault.push([t,t.innerHTML]),t.innerHTML+=`: ${e.value}`)}function resetTable(e){for(let t=0;t<e.length;t++){const n=e[t];"TEXTAREA"==n.tagNAme?n[0].value=n[1]:n[0].innerHTML=n[1]}TTABLETYPE[0].checked=!1,TTABLETYPE[1].checked=!1,TTABLETYPE[2].checked=!1,ICHAMADO.type="number",addCount--;document.querySelectorAll(".material__td").forEach((e=>{e.style.display="revert"}))}function createMaterialBtns(e){const t=[];for(let e=0;e<5;e++)t.push(document.createElement("input"));const n=document.createElement("div");n.id="div"+e,t[0].id="imqtd"+e,t[1].id="imvalorTotal"+e,t[2].id="imvalorUnit"+e,t[3].id="imdescricao"+e,t[4].id="imunidade"+e,t[0].placeholder="Quantidade",t[1].placeholder="Valor Total",t[2].placeholder="Valor unitário",t[3].placeholder="Descrição",t[4].placeholder="Unidade",t[0].type="number",t[1].type="number",t[2].type="number";const l=document.createElement("p");return l.id="resetMaterialBtn"+e,l.innerText="Tirar materiais",l.classList.add("material__p"),n.classList.add("material__div"),l.addEventListener("click",(()=>{void 0===holder.children[1]&&holder.append(IMATERIALNUMBER,pCorfim),n.remove()})),n.append(t[0],t[1],t[2],t[3],t[4],l),n}function addMaterialTable(e){const t=[document.querySelector("#materiais")];e-=1;for(let n=0;n<e;n++)t.push(t[n].cloneNode(!0)),t[n].after(t[n+1])}function addMaterialToTable(){const e=document.querySelectorAll("#materiais"),t=getElement("tvalorTotal");let n=0;for(let t=0;t<e.length;t++){const l=e[t];let a="0"+t;const i=[document.getElementById("imdescricao"+a),document.getElementById("imqtd"+a),document.getElementById("imunidade"+a),document.getElementById("imvalorUnit"+a),document.getElementById("imvalorTotal"+a)];i[4].value=Number(i[1].value)*Number(i[3].value),n+=Number(i[4].value);for(let e=0;e<l.cells.length;e++){const t=l.cells[e];let n=i[e].value;"number"==i[e].type?""===i[e].value?t.innerHTML="R$ 0":t.innerHTML=`R$ ${n}`:t.innerHTML=n}}t.innerHTML=`R$ ${n}`}const holder=document.getElementById("div__material"),pCorfim=document.getElementById("materialConfirm"),ICHAMADO=getElement("ichamado"),INAMETEC=getElement("inametec"),ICLIENTE=getElement("icliente"),IDATA=getElement("idata"),IENDERECO=getElement("iendereco"),ICIDADE=getElement("icidade"),IESTADO=getElement("iestado"),ITIPO=document.getElementsByName("itipo"),ITIPOoUTRO=getElement("itipoOutro"),IMOTIVO=getElement("imotivo"),IHORAIN=getElement("iHoraIn"),IHORAOUT=getElement("iHoraOut"),IDATAOUT=getElement("idataOut"),IESPACO=getElement("iespaco"),IDEFEITO=getElement("idefeito"),ICAUSA=getElement("icausa"),ISERVICO=getElement("iservico"),IMATERIALNUMBER=getElement("imaterialNumber"),IOBS=getElement("iobs"),ICLIENTENAME=getElement("iclienteName"),TCHAMADO=getElement("tchamado"),TCLIENTE=getElement("tcliente"),TDATA=getElement("tdata"),TENDERECO=getElement("tendereco"),TCIDADE=getElement("tcidade"),TESTADO=getElement("testado"),TTABLETYPE=document.getElementsByName("iTableType"),TTIPOOUTRO=getElement("ttipoOutro"),TMOTIVO=getElement("tmotivo"),TDATAIN=getElement("tdataIn"),TDATAOUT=getElement("tdataOut"),ThoraIN=getElement("thoraIn"),THORAOUT=getElement("thoraOut"),THORATOTAL=getElement("thoraTotal"),TESPACO=getElement("tespaco"),TDEFEITO=getElement("tdefeito"),TCAUSA=getElement("tcausa"),TSERVICO=getElement("tservico"),TOBS=getElement("tobs"),TCLI=getElement("tcli"),TTEC=getElement("ttec"),btn=getElement("btn"),data=new Date,year=data.getFullYear(),month=data.getMonth(),day=data.getDate(),tableDefault=[],topass=[INAMETEC,TTEC,ICHAMADO,TCHAMADO,ICLIENTE,TCLIENTE,IDATA,TDATA,IDATA,TDATAIN,IDATAOUT,TDATAOUT,IENDERECO,TENDERECO,ICIDADE,TCIDADE,IESTADO,TESTADO,IOBS,TOBS,ICAUSA,TCAUSA,IDEFEITO,TDEFEITO,ISERVICO,TSERVICO,IHORAIN,ThoraIN,IHORAOUT,THORAOUT,IMOTIVO,TMOTIVO,IESPACO,TESPACO,ICLIENTENAME,TCLI];putInInput(month>9&&day>9?`${year}-${month}-${day}`:day>9?`${year}-0${month}-${day}`:month>9?`${year}-${month}-0${day}`:`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]),putInInput(["SP"],[IESTADO]),btn.addEventListener("click",add);const printBtn=document.createElement("button"),resetBtn=document.createElement("button");function verifyMaterial(){let e=Number(IMATERIALNUMBER.value),t=0;if(e>=1){holder.removeChild(IMATERIALNUMBER),holder.removeChild(pCorfim);let n=[];for(;e>t;){let e=createMaterialBtns(`0${t}`);n.push(e),t++}for(const e of n)holder.appendChild(e)}}printBtn.classList.add("printBtn"),resetBtn.classList.add("resetBtn"),printBtn.addEventListener("click",(()=>{print()})),resetBtn.addEventListener("click",(()=>{resetTable(tableDefault)})),printBtn.innerText="Baixar PDF ou Imprimir",resetBtn.innerText="Resetar Tabela";
//# sourceMappingURL=index.97885a10.js.map
