/* Settings*/
let tipoManutencao = getElement('itipo');
campoCorretiva()
tipoManutencao.addEventListener('change',()=>{
  if (tipoManutencao.value=='preventiva') {
    campoPreventiva()
  }else{
    campoCorretiva()
  }
})

document.querySelector('#preventivaForm').removeChild(document.querySelector("#preventivaForm > button:nth-child(6)"))
// Um botão invisível no campo preventiva

manutencaoPreventiva()
//Coloca as funções nos botões no campo preventiva

const pMaterial = document.getElementById('materialConfirm');
var materialCounter = 0; //serve como etiqueta para os materiais

const pCorfim = document.getElementById('materialConfirm');
pCorfim.addEventListener('click',()=>addMaterial())
const materialHolder = document.getElementById('div__material');

getElement('iimages').addEventListener('change', updateImages);
const imageText = {}//Chave:imgName valor= [img,legenda]

const btn = getElement('btn');
btn.addEventListener('click',fillTable);

// getElement('assinatura-btn').addEventListener('click',assinatura)

//colocar data atual
document.querySelectorAll('[type=date]').forEach((e)=>{
  let date = new Date()
  e.value =
  `${date.getFullYear()}-${date.getMonth().toString().padStart(2,'0') }-${date.getDate().toString().padStart(2,'0')}`
})



 
/* ---Funções Principais--- 
 Funções acionadas pelo usuário
*/ 
function assinatura() {
//Criando quadro canvas e dando popOut
  let canvas = document.createElement('canvas')
  canvas.id = 'quadro'
  popOut({value:'Assinatura'},'','',canvas)
  desenharCanvas()
}
function addMaterial() {
  // Adiciona o campo de material no formulário
  let quantidade = document.createElement('input')
  quantidade.id = 'imqtd'+ materialCounter;
  quantidade.placeholder = 'Quantidade';
  quantidade.type = 'number';
  quantidade.title = quantidade.placeholder

  let valorUniatario = document.createElement('input')
  valorUniatario.id= 'imvalorUnit' + materialCounter
  valorUniatario.placeholder = 'Valor Unitário'
  valorUniatario.title = valorUniatario.placeholder
  valorUniatario.type = 'number';
  valorUniatario.pattern = /d{2}(,|.)\d{2}/

  let descricao = document.createElement('input');
  descricao.id= 'imdescricao' + materialCounter
  descricao.placeholder = 'Decrição'
  descricao.title = descricao.placeholder

  
  let unidade = document.createElement('input');
  unidade.id= 'imunidade' + materialCounter
  unidade.placeholder = 'Unidade de Medida '
  unidade.title = unidade.placeholder
  unidade.list = 'unidadesMedida'
  //Usar o dataset com valores 


  const div = document.createElement('div');
  div.id= 'div'+ materialCounter;
  
  const p = document.createElement('p');
  p.id='resetMaterialBtn'+ materialCounter;
  p.innerText='Excluir material';
  p.classList.add('material__p','btn--form');
  div.classList.add('material__div');

  p.addEventListener('click',()=>{
    div.remove();
    materialCounter--
  });

  materialCounter++;
  div.append(descricao,quantidade,unidade,valorUniatario,p);
  materialHolder.append(div)
}
function fillTable(){
  //Primeiro apaga os conteudos
  resetTable()
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
    case 'ichamado':
      let date = new Date()
      value = e.value +`A${String(date.getUTCFullYear()).substring(2)}`;
      break;
    case 'idataSaida':
    case 'idataChegada':
      value = fixDate(e.value)
      break
    default:
      value = e.value == undefined ? '' : e.value;
      break;
    }
  let tag = (e.id.slice(1))
  if(tag == 'dataChegada'){
    //Adicionando a data no campo data
    
    addToTable(value,'data')
  }
  addToTable(value,tag)
}
let totalTime = subTime(getElement('ihoraChegada').value,getElement('ihoraSaida').value)
addToTable(totalTime,'tempoTotal')
addMaterials()

addImages()
if(getElement('btnId') === null){
  const printBtn = document.createElement('button')
  printBtn.classList.add('printBtn');
  printBtn.id = 'btnId';
  printBtn.addEventListener('click',()=>print());
  printBtn.innerText='Imprimir pdf';
  getElement('btn-holder').append(printBtn);
}
 
}
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
            initial:''
          }
          let btn = document.createElement('button')
          btn.textContent ='Salvar'
          btn.addEventListener('click', savetxt)
          function savetxt() {
            button.classList.add('used')
            let v= document.querySelector("body > div.popOut > input").value
            final = button.innerHTML.replace('___', v)
            addToTextarea('imanutencao',final+'\n')
            btn.removeEventListener('click',savetxt)
            btn.textContent = 'Salvo';
            
          }
          popOut(txt,input,'',btn)
          // Mostra o popout

      })
    } else{

      button.addEventListener('click',addtxt)
      function addtxt() {
          addToTextarea('imanutencao',button.textContent+'\n')
          button.classList.add('used')
          button.removeEventListener('click',addtxt)
      }
    }
    }
  }
}
function updateImages() {
  const holder = document.querySelector('.preview__img')
  let images = getElement('iimages').files;
  if(images.length >0){
    for (const image of images) {
    const imgHolder = document.createElement('div');
    const img = document.createElement('img');
    imgHolder.classList.add('image__holder');
    img.classList.add('img');
    holder.classList.add('preview__img--visible');
    img.src = URL.createObjectURL(image);
    imgHolder.appendChild(img);
    holder.append(imgHolder);

    const imgName =  image.name.slice(0, (image.name).lastIndexOf('.')) ;
    img.alt = imgName;
    img.title = imgName;
    imgHolder.id= imgName;
    imgHolder.addEventListener('dblclick',(e)=>{
      e.target.remove();
      
    },true);
    imgHolder.addEventListener('click',(event)=>{
      popOutImg(event.target)
    });
    imageText[imgName]=[img,''];
    //Guarda a imagem sem legenda
    }
    return `${images.length} imagens adicionadas`
  }else{
    return 'Sem Imagens'
  }
}

/*FUNÇÔES DE Auxiliares */ 

function desenharCanvas() {
  let canvas = document.getElementById('quadro')
  let ctx = canvas.getContext("2d")
  let desenhando = false
  // O offset representam a distância
  // entre a borda do elemento e as bordas da tela
  canvas.onmousedown = function (e){
    console.log(e)
    console.log(canvas)
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetWidth, e.clientY - canvas.offsetHeight);
    //calculando a distancia real
    desenhando = true
  }
  canvas.onmouseup = function (){
    desenhando = false
  }
  canvas.onmousemove = function (e){
    if (desenhando){
      ctx.lineTo(e.clientX - canvas.offsetWidth, e.clientY - canvas.offsetHeight);
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }
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

}
function addImages() {
  for (const k in imageText) {
    const element = imageText[k];
    const p = document.createElement('p');
    const div = document.createElement('div');
    const img = element[0].cloneNode();
    img.classList.add('img__table')
    p.classList.add('p__table')
    div.append(img,p);
    p.textContent= element[1];
    p.classList.add('legendImg');
    offToggle([],[document.querySelector('.imagens')])
    getElement('imagens').appendChild(div)
  }
}
function addMaterials() {
 if(materialHolder.children.length >0){
  //Adiciona os materiais na tabela
  offToggle([],[document.querySelector('.materiais')])
  let materialsNumber = materialHolder.children.length;
  let sum = 0;// Soma total
  for (let i = 0; i < materialsNumber; i++) {
    // pega os valores dos campos e adiciona na tabela
    const material = materialHolder.children[i];
    console.log(material.children)
    let descricao = material.children[0].value,
    quantidade = material.children[1].value,
    unidade = material.children[2].value,
    valorUnitario = material.children[3].value

    let total = valorUnitario *quantidade;
    sum+= Number(total)
    total = total.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});
    valorUnitario = valorUnitario.toLocaleString('pt-BR',{style:'currency', currency:"BRL"});

    createMaterialField(descricao,quantidade,unidade,
      valorUnitario,total)
    
  }
  sum = sum.toLocaleString('pt-BR',{style:"currency", currency:'BRL'})
  getElement('total').innerHTML = sum 
 }else{
  offToggle([document.querySelector('.materiais')],[])
 }  
}
function resetTable() {
//Imagem e material da table, caso tenha
while (getElement('imagens').firstChild) {
  getElement('imagens').removeChild(getElement('imagens').firstChild);
  offToggle([document.querySelector('#imagens')],[])
}
try {
  //Apaga os campso de materiais
  let c =document.querySelector('.materiais').children.length
  for (let i = c; 0 < c-1; i--) {
    //para evitar erro ao apagar os indices o loop é descrecente
    const e = document.querySelector('.materiais').children[i-1];
    if(e.classList.contains('titulo')|| e.id == 'total' ){
      continue;
    }  
    e.remove()
    }
} catch (error) {}
//Para evitar mostrar erro no index 
}
function createMaterialField(descricao='descrição',quantidade='0',
unidade='0',valorUnitario='0',sum) {
  // Cria os campos para armazenar os dados, 
  // e os adiciona na tabela

  let desc = document.createElement('div'),
  quant = document.createElement('div'),
  uni = document.createElement('div'),
  valorUni = document.createElement('div'),
  total = document.createElement('div')

  desc.innerHTML = descricao
  quant.innerHTML = quantidade
  uni.innerHTML = unidade
  valorUni.innerHTML = valorUnitario
  total.innerHTML = sum
  document.querySelector('#materialTotal').before(desc,quant,
    uni,valorUni,total);


}
function addToTextarea(element,info) {
  getElement(element).value +=info;
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
function popOutImg(e) {
  //Aparece 2 opções, Deletar ou adicionar texto
  const div = document.createElement('div');
  const p = document.createElement('p');
  const input = document.createElement('input');
  const sair = document.createElement('span');
  const saveBtn = document.createElement('button');
  const deleteBtn = document.createElement('button')
  const image = e.cloneNode();
  
  saveBtn.classList.add('saveBtn');
  saveBtn.textContent = 'salvar';
  sair.textContent ='close';
  deleteBtn.textContent = 'Deletar Imagem'
  input.placeholder = 'Legenda da Imagem';
  div.classList.add('popOut');
  sair.classList.add(['material-symbols-outlined'])
  deleteBtn.classList.add('deleteImgBtn')
  p.textContent='Escreva uma legenda para a imagem selecionada';
  sair.style.cursor = 'pointer'
  sair.addEventListener('click',()=>{
    div.remove();
  });
  saveBtn.addEventListener('click',()=>{
    imageText[image.alt]=[image,input.value];
    // Salva a imagem com uma legenda
    input.style.backgroundColor='#1eff3396';
    saveBtn.textContent='Salvo';
    input.style.color='green';
  })
  deleteBtn.addEventListener('click',()=>{
    e.remove()
  })
  div.append(sair,p,image,input,saveBtn,deleteBtn);

  document.body.appendChild(div);

}
function addToTable(data, where) {
  //Pega os valores e coloca na tabela
  try {
    let element = getElement(where)
    element.innerText = data
  } catch (error) {
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
  //Faz o toggle entre o campo preventiva e corretiva
  offToggle(
    [getElement(undefined,'corretivaTable')[0],
    getElement('corretivaForm')],
    [getElement(undefined,'preventivaTable')[0],
    getElement('preventivaForm')])
}
function offToggle(hide,show){
  //Toggle no campo corretiva e preventiva
  for (const i of hide) {
    i.classList.add('off')
  }
  for (const i of show) {
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
  let h =Number(t.style.fontSize.slice(0,2));
  //tamanho do Textarea
  let newRow = Math.floor(t.scrollHeight/h)
  t.rows = newRow;
  }
}
function fixDate(date) {
  // 2024/02/08
  date = date.replace(/-/g,'/')
  console.log(date)
  let year = String(date).substring(0,4)
  let month = String(date).substring(5,7)
  let day = String(date).substring(8,10)
  return `${day}/${month}/${year}`;
}