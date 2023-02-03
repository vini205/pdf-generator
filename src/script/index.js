console.log("Working");

/*
  Functions
*/
function c(txt) {
      console.log(txt);
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
function subTime(time01,time02) {
  let t1 = Number(time01.slice(0,2)),
  m2 = Number(time02.slice(3,5)),
  m1=Number(time01.slice(3,5)),
  t2 = Number(time02.slice(0,2));
  let newTime1 = t1 + (m1/60);
  let newTime2 = t2 + (m2/60);
  let x = newTime2 - newTime1;
  let y = x%1;//fica só decimal
  x -=y;//Inteiro
  x = String(x).padStart(2,'0');
  if(y%1>0){
    y =String( Math.ceil(y*60)).padEnd(2,'0');
  } else{
    y =String(y*60).padEnd(2,'0');
  }
    return `${x}:${y}`;
}
function addTOTable(data,where) {  
  if(data.tagNAme=='TEXTAREA'){

    where.value=`${data.value}`;  

  } else if(data.type=='date'){

    let date = fixDate(data.value);

    if(where.innerHTML=='/2023'){

      where.innerHTML =`${date}`; 

    }else{

      where.innerHTML +=`: ${date}`; 
    }
  }else if(data.type=='time'){
    where.innerHTML =`${data.value}`; 
  }
   else{
    where.innerHTML+=`: ${data.value}`;
  }    
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

putInInput(`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]);
putInInput(['SP'],[IESTADO]);

IDATAOUT.oninput=c(IDATAOUT.value);


const pass1 = [INAMETEC,TTEC,ICHAMADO,TCHAMADO,ICLIENTE,TCLIENTE,IDATA,TDATA,IDATA,TDATAIN,IDATAOUT,TDATAOUT,
IENDERECO,TENDERECO,ICIDADE,TCIDADE,IESTADO,TESTADO,IOBS,TOBS,ICAUSA,TCAUSA,IDEFEITO,TDEFEITO,ISERVICO,TSERVICO,
IHORAIN,ThoraIN,IHORAOUT,THORAOUT,IMOTIVO,TMOTIVO];

btn.addEventListener('click',add);
/* 
Add funciona porque é como se fosse um atributo que é atribuido ao evento, e dps roda como uma função
para mais shorturl.at/bdi39. 
Se colocar add() ele roda a função que retorna undefined.

*/ 
function add() {
  for (let i = 0; i < pass1.length; i+=2) {
    addTOTable(pass1[i],pass1[i+1]);
  }
  TESPACO.innerHTML = IESPACO.value+ ' Km';
  let i = 0;
    if (ITIPO[i].checked) {
      TTABLETYPE[i].checked= true;
    }else if(ITIPO[i+1].checked){
      TTABLETYPE[i+1].checked=true;
    }else{
      TTABLETYPE[2].checked=true;
      TTIPOOUTRO.innerHTML= ITIPOoUTRO.value;
    }
  THORATOTAL.innerHTML = subTime(IHORAIN.value,IHORAOUT.value)  
  document.querySelector('.table').style.display='block';
  document.querySelector('.form').style.display='none';
}


 