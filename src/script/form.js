let tipoManutencao = getElement('itipo');
campoCorretiva()
tipoManutencao.addEventListener('change',()=>{
  if (tipoManutencao.value=='preventiva') {
    campoPreventiva()
  }else{
    campoCorretiva()
  }
})

function fillHeader(){
 let form = getElement('form');
 for (let i = 0; i < 22 ; i++) {
  const e = form.elements[i];
  let value 
  switch (e.id) {
    case 'images':
      value = 'imagens'
      continue;
      break;
    case 'ipreventivaForm':
      continue;
    default:
      value = e.value == undefined ? '' : e.value;
      break;
    }
  let tag = (e.id)
  tag = tag.slice(1)
  console.log(tag)
  if(tag == 'dataChegada'){//Adicionando a data no campo data
    addToTable(value,'data')
  }
  addToTable(value,tag)
  
  
 }

}


/*FUNÇÔES DE SECUNDARIAS*/ 
function addToTable(data, where) {
  try {
    let element = getElement(where)
    console.log(element)
    element.innerText = data
  } catch (error) {
    console.log(' DATA: '+data +', WHERE '+ where+'\n'+error  )    
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
function campoPreventiva(){
  offToggle(
    [getElement(undefined,'corretivaTable')[0],
    getElement('corretivaForm')],
    [getElement(undefined,'preventivaTable')[0],
    getElement('preventivaForm')])
}
function offToggle(off,on){
  for (const i of off) {
    i.classList.add('off')
  }
  for (const i of on) {
    i.classList.remove('off')
  }
}
function campoCorretiva() {
  offToggle(
    [getElement(undefined,'preventivaTable')[0],
    getElement('preventivaForm')],
    [getElement(undefined,'corretivaTable')[0],
    getElement('corretivaForm')]
    )
 
}