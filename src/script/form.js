let tipoManutencao = getElement('itipo');
campoPreventiva()
tipoManutencao.addEventListener('change',()=>{
  if (tipoManutencao.value=='preventiva') {
    campoPreventiva()
  }else{
    campoCorretiva()
  }
})

function fillTable(){
 let form = getElement('form');
 for (let i = 0; i < form.elements.length-1 ; i++) {
  const e = form.elements[i];
  let value 
  switch (e.id) {
    case 'iimages':
      value = 'imagens'
      continue;
      break;
    case 'preventivaForm':
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
manutencaoPreventiva()//Coloca as funções nos botões

function manutencaoPreventiva(){
  //Adiciona função nos botões para adicionar no textarea
  let p = document.getElementById('preventivaForm').children
  for (const button of p) {
    if(button.nodeName=='BUTTON'){
      if(button.classList.contains('btn__prev--value')){
        //Botões com parâmetros
        button.addEventListener('click', ()=>{
          let final
          let txt = {
            value: button.innerHTML,
            classes:['']
          }
          let input ={
            type:'number',
            placeholder:'Digite o valor desejado ',
            classes:['input__PopOut'],
            initial:0
          }
          let btn = document.createElement('button')
          btn.textContent ='Salvar'
          btn.addEventListener('click', ()=>{
            button.classList.add('used')
            let v= document.querySelector("body > div.popOut > input").value
            console.log(v)
            final = button.innerHTML.replace('___', v)
            
            addToTextarea('imanutencao',final+'\n')
            
          })
          popOut(txt,input,'',btn)
          // Mostra o popout

      })
    } else{

      button.addEventListener('click',()=>{
        addToTextarea('imanutencao',button.textContent+'\n')
        button.classList.add('used')
      })
    }
    }
  }
}


/*FUNÇÔES DE Auxiliares*/ 

function addToTextarea(element,info) {
  getElement(element).innerHTML +=info;
  addLines(getElement(element),30)  
}

function popOut(text='',input='',image='',...other) {
  /*
    Recebe:
    text{
      value: '',
      classes:[]
    }
    input{
      type: '',
      classes:[],
      placeholder: '',
      initial:any
    }
    image{
      name: '',
      url:'',
      classes:['']
    }
    
  */
 let toAppend =[other]//Coloca os itens na div
 let p, inputf, img,btn
 const sair = document.createElement('span');

  sair.classList.add('material-symbols-outlined')
  sair.style.cursor = 'pointer'
  sair.innerHTML = 'close'
  sair.addEventListener('click',()=>{
    div.remove();
  });

 const div = document.createElement('div');
 div.appendChild(sair)

  if (text !='') {
    p = document.createElement('p');
    p.innerHTML = text.value
    try {
      p.classList.add(classes)
    } catch (error) {
      
    }
    div.append(p)
  }
  if(input !== '') {
    inputf = document.createElement('input')
    inputf.type = input.type;
    inputf.value = input.initial
    inputf.placeholder = input.placeholder
    try {
      inputf.classList.add(input.classes)
    } catch (error) {
      
    }
    div.append(inputf)
  }
  if(image != ''){

    img = document.createElement('img')
    img.title = image.name;
    img.alt = image.name;
    //img.src = URL.createObjectURL(image.image)
    
    try {
      img.classList.add(image.classes)
    } catch (error) {
    }
    div.append(image)
  }
  
  
  div.classList.add('popOut');
  
  for (let i = 0; i < toAppend.length; i++) {
    const element = other[i];
    div.append(element)
  }
  
  document.body.appendChild(div)
  
}
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
function addLines(t,height) {
  t.style.fontSize=height+'px';
  if(t.offsetHeight < t.scrollHeight){
  let h =Number(t.style.fontSize.slice(0,2));//tamanho do Textarea
  let newRow = Math.floor(t.scrollHeight/h)
  t.rows = newRow;
  }
}
document.querySelector('#preventivaForm').removeChild(document.querySelector("#preventivaForm > button:nth-child(6)"))