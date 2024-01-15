
function getElement(id=undefined,className=undefined,tag=undefined) {
    if(className===undefined && tag === undefined){
      return document.getElementById(id);
    }else if(tag===undefined){
      return document.getElementsByClassName(className);
    } else{
      return document.querySelectorAll(tag);
    }
}

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
IOBS = getElement('iobs'),
ICLIENTENAME = getElement('iclienteName'),
IIMAGES = getElement('iimages');

