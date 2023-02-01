console.log("Working");

/*
  Functions
*/
function c(txt) {
  console.log(txt);
} 
function getElement(id,className) {
  if(className===undefined){
    return document.getElementById(id);
  }
  return document.getElementsByClassName(className);
}
function putInInput(data,input) {
  for (const i of input) {
    i.value=data; 
  }
}
function addInObj([data,name=data], obj) {
  obj[name]=data;
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
ITIPO = getElement('itipo'),
ITIPOoUTRO = getElement('itipoOutro'),
IMOTIVO = getElement('imotivo'),
IHORAIN = getElement('iHoraIn'),
IHORAOUT = getElement('iHoraOut'),
IDATAOUT = getElement('idataOut'),
IESPACO =  getElement('iespaco'),
IDEFEITO = getElement('idefeito'),
ICAUSA = getElement('icausa'),
ISERVICO = getElement('iservico'),
IMATERIALNUMBER = getElement('imaterialNumber');




const info = [INAMETEC,ICHAMADO,ICLIENTE,IDATA,IENDERECO,ICIDADE,IESTADO,ITIPO,ITIPOoUTRO,IMOTIVO,
IHORAIN,IHORAOUT,IDATAOUT,IESPACO,IDEFEITO,ICAUSA,ISERVICO,IMATERIALNUMBER]

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();

putInInput(`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]);
putInInput('SP',IESTADO);

class Relatorio {
  constructor(test){
    this.test=test;
  }
}
const relatorio = new Relatorio('Criado');

for (const i of info) {
  addInObj([i,i.id],relatorio);
}
