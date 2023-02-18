console.log("Working");
var addCount =0;
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
    if (addCount!==0) {
      alert('Resete a tabela primeiro')
      return
    }
    addCount++;
    let keep = ICHAMADO.value;
    ICHAMADO.type='text';
    ICHAMADO.value=`CH${keep}23`;
    if (ITIPO[0].checked) {
      TTABLETYPE[1].checked= true;
    }else if(ITIPO[1].checked){
      TTABLETYPE[0].checked=true;
    }else if(ITIPOoUTRO.value != ''){
      TTABLETYPE[2].checked=true;
      TTIPOOUTRO.innerHTML= ITIPOoUTRO.value;
    }   
    THORATOTAL.innerHTML = subTime(IHORAIN.value,IHORAOUT.value);  
    THORATOTAL.innerHTML = subTime(IHORAIN.value,IHORAOUT.value);  
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
  ICHAMADO.type='number';
  ICHAMADO.value=keep;
  if(Object.keys(imageText).length>0){
    addImgsTable();
    getElement('imgTable').style.display='block'
  }
  if(holder.children[0]!== IMATERIALNUMBER){
    addMaterialTable(holder.children.length);
    addMaterialToTable();
  }else{
    let a =document.querySelectorAll('.material__td');
    a.forEach((e)=>{
      e.style.display='none';
    })    
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
  } else if(data.id=="inametec" || data.id ==='iclienteName') {
    tableDefault.push([where,where.innerHTML]); 
    where.innerHTML = data.value;
  }else if(where.id === 'tmotivo'){
    tableDefault.push([where,where.innerHTML]);
    where.innerHTML=`${data.value}`;
  } 
  else{
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
  addCount--;
  getElement('imgTable').style.display='none';
  let i = TIMGHOLDER.children.length;
  while (TIMGHOLDER.children.length>0) {
    const child = TIMGHOLDER.children[i-1];
    child.remove();  
    i--;
  }
  
  const a = document.querySelectorAll('.material__td');
  a.forEach((e)=>{
    e.style.display='revert';
  });    
}
function createMaterialBtns(n){
  const inputs =[];
  for (let i = 0; i < 5; i++) {
    inputs.push(document.createElement('input'))    
  }
  const div = document.createElement('div');
  div.id= 'div'+n;
  inputs[0].id= 'imqtd' + n;
  inputs[1].id= 'imvalorTotal' +n;
  inputs[2].id= 'imvalorUnit' +n;
  inputs[3].id= 'imdescricao' +n;
  inputs[4].id= 'imunidade' +n;
  inputs[0].placeholder='Quantidade';
  inputs[1].placeholder='Valor Total';
  inputs[2].placeholder='Valor unitário';
  inputs[3].placeholder='Descrição';
  inputs[4].placeholder='Unidade';
  inputs[0].type='number';
  inputs[1].type='number';
  inputs[2].type='number';
  
  const p = document.createElement('p');
  p.id='resetMaterialBtn'+n;
  p.innerText='Tirar materiais';
  p.classList.add('material__p');
  div.classList.add('material__div');

  p.addEventListener('click',()=>{
    if(holder.children[1] === undefined){
      holder.append(IMATERIALNUMBER,pCorfim)
    }
    div.remove();
  });
  div.append(inputs[0],inputs[1],inputs[2],inputs[3],inputs[4],p);
  return div
}
function addMaterialTable(n) {
  const materialTR = [document.querySelector('#materiais')];
  n = n-1;
  for (let i =0;i<n;i++){
    materialTR.push(materialTR[i].cloneNode(true));
    materialTR[i].after(materialTR[i+1]);
  }
}
function addMaterialToTable() {
  const materiais = document.querySelectorAll('#materiais');
  const totalInput =  getElement('tvalorTotal');
  let sum = 0;
  for (let i = 0; i < materiais.length; i++) {
    const element = materiais[i];//Acessing TR
    let tag = '0'+i;
    const values = [document.getElementById('imdescricao'+tag),
    document.getElementById('imqtd'+tag),document.getElementById('imunidade'+tag),
    document.getElementById('imvalorUnit'+tag),
    document.getElementById('imvalorTotal'+tag)];
    values[4].value = Number(values[1].value) * Number(values[3].value);
    sum += Number(values[4].value)
    for (let td = 0; td < element.cells.length; td++) {
      const e = element.cells[td];//Acessing TD
      let value = values[td].value;
      let m = values[td].id.slice(0,5);
      c(m);
      if(values[td].type == 'number' && m !=='imqtd'){
        if(values[td].value===''){
          e.innerHTML = 'R$ 0';
        }else{
          e.innerHTML = `R$ ${value}`;
        }
      }else{
        
        e.innerHTML = value;

      }
    }
  }
    totalInput.innerHTML = `R$ ${sum}`;
  
}
function updateImgPreview() {
  const holder = document.querySelector('.preview__img');
  images = IIMAGES.files;
  if(images.length ===0){
    return 'Sem imagens'

  }else if(images.length===0 && holder.hasChildNodes()){
    holder.classList.remove('preview__img--visible');
    return 'Holder de img deletado'
  } else{
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
      c(delete imageText[a.alt]);

    },true);
    imgHolder.addEventListener('click',(event)=>{
      popOutImg(event.target)
    });
    
    imageText[imgName]=[img,''];//Guarda o elemento para apagá-lo dps
    }
    return `${images.length} imagens adicionadas`
  }
}
function popOutImg(e) {//Aparece 2 opções, Deletar ou adicionar texto
  const div = document.createElement('div');
  const p = document.createElement('p');
  const input = document.createElement('input');
  const sair = document.createElement('button');
  const saveBtn = document.createElement('button');
  const image = e.cloneNode();

  saveBtn.classList.add('saveBtn');
  saveBtn.textContent = 'salvar';
  sair.textContent ='X';
  input.placeholder = 'Legenda da Imagem';
  div.classList.add('popOut');
  p.textContent='Escreva uma legenda para a imagem selecionada';
  
  sair.addEventListener('click',()=>{
    div.remove();
  });
  saveBtn.addEventListener('click',()=>{
    imageText[image.alt][1]=input.value;
    input.style.backgroundColor='#1eff3396';
    saveBtn.textContent='Salvo';
    input.style.color='green';
  })
  div.append(sair,p,image,input,saveBtn);

  document.body.appendChild(div);

}
function addImgsTable() {
  /* const tr = document.querySelector('.tr__img');
  tr.style.display='revert'; */
  for (const k in imageText) {
    const element = imageText[k];
    const p = document.createElement('p');
    const div = document.createElement('div');
    const img = element[0].cloneNode();
    div.append(img,p);
    p.textContent= element[1];
    p.classList.add('legendImg');
    TIMGHOLDER.append(div);
  }
}
/*
  Variables
*/
const holder = document.getElementById('div__material');
const pCorfim = document.getElementById('materialConfirm');

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
TTEC = getElement('ttec'),
TIMGHOLDER = getElement('holder__img');

const btn = getElement('btn');

const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();
IIMAGES.addEventListener('change',updateImgPreview);
const tableDefault=[];//Recebe array com [elemento:HTMLCOLLECTION,valor padrão:string]
const imageText = {}//Chave:imgName valor= [img,legenda]

const topass = [INAMETEC,TTEC,ICHAMADO,TCHAMADO,ICLIENTE,TCLIENTE,IDATA,TDATA,IDATA,TDATAIN,IDATAOUT,TDATAOUT,
  IENDERECO,TENDERECO,ICIDADE,TCIDADE,IESTADO,TESTADO,IOBS,TOBS,ICAUSA,TCAUSA,IDEFEITO,TDEFEITO,ISERVICO,TSERVICO,
  IHORAIN,ThoraIN,IHORAOUT,THORAOUT,IMOTIVO,TMOTIVO,IESPACO,TESPACO,ICLIENTENAME,TCLI];
  
if(month>9 && day>9){
  putInInput(`${year}-${month}-${day}`,[IDATA,IDATAOUT]);

}else if(day>9){
  putInInput(`${year}-0${month}-${day}`,[IDATA,IDATAOUT]);
}else if(month>9){
  putInInput(`${year}-${month}-0${day}`,[IDATA,IDATAOUT]);
}else{
  putInInput(`${year}-0${month}-0${day}`,[IDATA,IDATAOUT]);
}
putInInput(['SP'],[IESTADO]);

/*
  Run script
*/

btn.addEventListener('click',add);
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
resetBtn.innerText='Resetar Tabela';

function verifyMaterial() {
  let n =Number(IMATERIALNUMBER.value);
  let _i = 0;
  if (n>=1){
    holder.removeChild(IMATERIALNUMBER);
    holder.removeChild(pCorfim);
    let i = [];
    while (n>_i) {
      let d = createMaterialBtns(`0${_i}`);
      i.push(d)
      _i++;
    }
    for (const input of i) {
      holder.appendChild(input)
    }
    
  }
}
