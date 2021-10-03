const toggleButton = document.querySelectorAll('#toggle-button')
const content = document.querySelectorAll('#toggle');
console.log(content, toggleButton)

function Toggle(content){
  if(content.classList.contains('hidden')){
    content.classList.remove('hidden')
  }else{
    content.classList.add('hidden')
  }
  
}


toggleButton.forEach((button, index)=>{
  button.addEventListener('click',()=>{
    Toggle(content[index])
  })
})