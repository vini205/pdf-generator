console.log("Working");

/*
  Functions
*/
function c(txt) {
      console.log(txt);
} 
function addLines(t) {
  t.style.fontSize='13px';
  if(t.offsetHeight< t.scrollHeight){
  let h =Number(t.style.fontSize.slice(0,2));//tamanho do Textarea
  let newRow = Math.floor(t.scrollHeight/h)
  t.rows = newRow;
  }
}
function getElement(id=undefined,className=undefined,tag=undefined) {
  if(className===undefined && tag === undefined){
    return document.getElementById(id);
  }else if(tag===undefined){
    return document.getElementsByClassName(className);
  } else{
    return document.querySelectorAll(tag);
  }
}
function putInInput(data,input) {
  for (const i of input) {
    i.value=data; 
  }
}

function addInObj([data,name=data], obj) {
  obj[name]=data;
}
function fixDate(date) {
  let ano = date.slice(0,4);
  let mes = date.slice(5,7);
  let dia = date.slice(8);
  return `${dia}/${mes}/${ano}`;
}
  function add() {
    let keep = ICHAMADO.value;
    ICHAMADO.type='text';
    ICHAMADO.value=`CH${keep}23`;
    c(keep);
    let i = 0;//Passing ranges
    if (ITIPO[i].checked) {
      TTABLETYPE[i].checked= true;
    }else if(ITIPO[i+1].checked){
      TTABLETYPE[i+1].checked=true;
    }else if(ITIPOoUTRO.value != ''){
      TTABLETYPE[2].checked=true;
      TTIPOOUTRO.innerHTML= ITIPOoUTRO.value;
    }   
    THORATOTAL.innerHTML = subTime(IHORAIN.value,IHORAOUT.value);  
    
    for (let i = 0; i < topass.length; i+=2) {
      addTOTable(topass[i],topass[i+1]);
      if(topass[i+1].tagName=='TEXTAREA'){
      addLines(topass[i+1])  
    }
    tableDefault.push([THORATOTAL,THORATOTAL.innerHTML]);
    let a =document.getElementsByClassName('table')[0];
    a.style.display='block';
    getElement('btn-holder').append(printBtn,resetBtn);
  }
  ICHAMADO.type='number'
  ICHAMADO.value=keep;
}
function subTime(time01,time02) {
  let t1 = Number(time01.slice(0,2)),
  m2 = Number(time02.slice(3,5)),
  m1=Number(time01.slice(3,5)),
  t2 = Number(time02.slice(0,2));
  let newTime1 = t1 + (m1/60);
  let newTime2 = t2 + (m2/60);
  let x = newTime2 - newTime1;
  x = x.toFixed(2);
  return x;
  /* let y = x%1;//fica só decimal
  x -=y;//Inteiro
  x = String(x).padStart(2,'0');
  if(y%1>0){
    y =String( Math.ceil(y*60)).padEnd(2,'0');
  } else{
    y =String(y*60).padEnd(2,'0');
  }
    return `${x}:${y}`; */
}
function addTOTable(data,where) {  
  if (where.value == data.value || where.innerHTML == data.value) {//Caso add +1 vezes não duplicar valores
    return
  }
  if(data.tagName=='TEXTAREA'){
    tableDefault.push([where,where.value]);
    //Keep the defult so I can reset the table
    where.value=`${data.value}`;  
  } else if(data.type=='date'){
    
    tableDefault.push([where,where.innerHTML]);
    let date = fixDate(data.value);
    
    if(where.innerHTML=='/2023'){

      where.innerHTML =`${date}`; 
      
    }else{
      
      where.innerHTML +=`: ${date}`; 
    }
  }else if(data.type=='time'){
    tableDefault.push([where,where.innerHTML]); 
    where.innerHTML =`${data.value}`;
  } else if(data.id=='iespaco') {
    tableDefault.push([where,where.innerHTML]); 
    where.innerHTML = data.value+ ' Km';
  } else if(data.id=="inametec") {
    tableDefault.push([where,where.innerHTML]); 
    where.innerHTML = data.value;
  }  else{
    tableDefault.push([where,where.innerHTML]);
    where.innerHTML+=`: ${data.value}`;

  }    
}
function resetTable(x) {
    for (let i = 0; i < x.length; i++) {
      const e = x[i];
      if (e.tagNAme=="TEXTAREA") {
        e[0].value = e[1];    
        
      } else {
        e[0].innerHTML = e[1];    
    }
  }
  TTABLETYPE[0].checked = false;
  TTABLETYPE[1].checked = false;
  TTABLETYPE[2].checked = false;
  ICHAMADO.type='number';
}
/*
  Variables
*/
const ICHAMADO = getElement('ichamado'),
INAMETEC = getElement('inametec'),
ICLIENTE = getElement('icliente'),
IDATA = getElement('idata'),
IENDERECO = getElement('iendereco'),
ICIDADE = getElement('icidade'),
IESTADO = getElement('iestado'),
ITIPO = document.getElementsByName('itipo'),
ITIPOoUTRO = getElement('itipoOutro'),
IMOTIVO = getElement('imotivo'),
IHORAIN = getElement('iHoraIn'),
IHORAOUT = getElement('iHoraOut'),
IDATAOUT = getElement('idataOut'),
IESPACO =  getElement('iespaco'),
IDEFEITO = getElement('idefeito'),
ICAUSA = getElement('icausa'),
ISERVICO = getElement('iservico'),
IMATERIALNUMBER = getElement('imaterialNumber'),
IOBS = getElement('iobs');

const TCHAMADO = getElement('tchamado'),
TCLIENTE = getElement('tcliente'),
TDATA = getElement('tdata'),
TENDERECO = getElement('tendereco'),
TCIDADE = getElement('tcidade'),
TESTADO = getElement('testado'),
TTABLETYPE = document.getElementsByName('iTableType'),
TTIPOOUTRO = getElement('ttipoOutro'),
TMOTIVO = getElement('tmotivo'),
TDATAIN = getElement('tdataIn'),
TDATAOUT = getElement('tdataOut'),
ThoraIN = getElement('thoraIn'),
THORAOUT = getElement('thoraOut'),
THORATOTAL = getElement('thoraTotal'),
TESPACO = getElement('tespaco'),
TDEFEITO = getElement('tdefeito'),
TCAUSA = getElement('tcausa'),
TSERVICO = getElement('tservico'),
TOBS = getElement('tobs'),
TCLI = getElement('tcli'),
TTEC = getElement('ttec');

const btn = getElement('btn');

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();

const tableDefault=[];

putInInput(`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]);
putInInput(['SP'],[IESTADO]);


const topass = [INAMETEC,TTEC,ICHAMADO,TCHAMADO,ICLIENTE,TCLIENTE,IDATA,TDATA,IDATA,TDATAIN,IDATAOUT,TDATAOUT,
IENDERECO,TENDERECO,ICIDADE,TCIDADE,IESTADO,TESTADO,IOBS,TOBS,ICAUSA,TCAUSA,IDEFEITO,TDEFEITO,ISERVICO,TSERVICO,
IHORAIN,ThoraIN,IHORAOUT,THORAOUT,IMOTIVO,TMOTIVO,IESPACO,TESPACO];

btn.addEventListener('click',add);
/* 
Add funciona porque é como se fosse um atributo que é atribuido ao evento, e dps roda como uma função
para mais shorturl.at/bdi39. 
Se colocar add() ele roda a função que retorna undefined.

*/ 

const printBtn = document.createElement('button'),resetBtn = document.createElement('button');
printBtn.classList.add('printBtn');
resetBtn.classList.add('resetBtn');
printBtn.addEventListener('click',()=>{
 print();
});
resetBtn.addEventListener('click',()=>{
  resetTable(tableDefault);
})
printBtn.innerText='Baixar PDF ou Imprimir';
resetBtn.innerText='Resetar formulário';
