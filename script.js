//declare variables
const $time = document.getElementById('time')
const $container =document.getElementById('container')
const $button = document.querySelector('button')
const $more = document.querySelector('.more')
const $greeting = document.querySelector('.greeting')
const $icon = document.querySelector('.fa')
const $setting = document.getElementById('setting')
const $color =  document.getElementById('color')
const $display = document.getElementById('display')
const $change = document.querySelector('.change')
const $choose = document.querySelector('.choose')
const $A = document.getElementById('A')
const $B = document.getElementById('B')
const $bB = document.getElementById('bB')
const $C = document.getElementById('C')
let $picker = document.getElementById('picker')
const DateTime = luxon.DateTime
let now = DateTime.local()
let h = now.toFormat('HH')
let D = now.toISODate()
let currentFormat = '3'
console.log(currentFormat)
// console.log(D)
// console.log(now.toHTTP())
// console.log(now.toISOWeekDate())
// console.log(now.toFormat('DDDD'))
// console.log(now.toFormat('W'))
// console.log(now.toFormat('o'))
// console.log(now.toFormat('HH'))

//connect to AOS library
AOS.init();



//display time 
//update center time every minute using setInterval function 
//add four types of time format in the settings
//change "time format" according to the setting
setInterval(
    (function t() {
    let now = DateTime.local()
    //console.log(now.toFormat('tt'))
    //$time.textContent = now.toFormat('tt')  
    let hourMinute= now.toFormat('T')
    let second = now.toFormat('ss')
    let displayA = now.toFormat('t')
    let displayB = now.toFormat('tt')
    let displayC = now.toFormat('TT')
    let hour=now.toFormat('h')
    let minute=now.toFormat('mm')
    let meridiem = now.toFormat('a')
    h = now.toFormat('HH')

    $A.innerHTML=displayA
    $B.innerHTML=displayB
    $bB.innerHTML=hourMinute
    $C.innerHTML=displayC

    switch(currentFormat){
        case '0':  
            $time.innerHTML='<span class="big">'+displayA+'</span>'
            break
        case '1': 
            $time.innerHTML='<span class="big">'+hour +' '+':'+ minute+'</span>'+' '+':'+'<span>'+second+' '+meridiem +'</span>'
            break
        case '2': 
            $time.innerHTML='<span class="big">'+hourMinute+'</span>'
            break
        case '3': 
            $time.innerHTML='<span class="big">'+hourMinute+'</span>'+' '+':'+'<span>'+second+'</span>'
            break
        default:
            $time.innerHTML='<span class="big">'+ hourMinute+ '</span>'+' '+':'+'<span>'+second+'</span>'

    }

    function addContent(format){
        console.log('test')
        currentFormat = format
    }

    $A.addEventListener('click', function(){addContent('0')})
    $B.addEventListener('click', function(){addContent('1')})
    $bB.addEventListener('click', function(){addContent('2')})
    $C.addEventListener('click', function(){addContent('3')})
   
    return t
    })
(), 500)



//click the button to reveal more date information
let a = now.toFormat('DDDD')
let b = now.toFormat('o')
let c = now.toFormat('W')
let d = now.toFormat('y')
$more.innerHTML= '<p>' + a + '</p>' + '<p> Day' + ' ' + b + ' ' + 'of' +' ' + d + '</p>' + '<p> Week' + ' ' + c +  ' '+ 'of' +' ' + d + '</p>'

$button.addEventListener('click',function(){   
    $more.classList.toggle('show')    
})



//add greetings according to the time 
switch (true){
    case (h>=18): 
        $greeting.textContent = 'Good Evening!';
        break
    case (h>=12):
        $greeting.textContent = 'Good Afternoon!';
        break
    case (h>=5): 
        $greeting.textContent = 'Good Morning!';
        break
    case (h>=0): 
        $greeting.textContent = 'Good Night!';
        break
    default:
        console.log('That is not a valid answer');
}
// learned swicth(true) https://stackoverflow.com/questions/2765981/javascript-switchtrue



//display the customize options in settings 
$icon.addEventListener('click',function(){
    $setting.classList.toggle('show')
})

// $display.addEventListener('click',function(){    
//     $change.classList.toggle('show')
// })

// $color.addEventListener('click',function(){
//     $choose.classList.toggle('show')
// })



//change color according to the setting
$picker.addEventListener('input',function(){
    let colorInput = $picker.value
    console.log($picker.value)
    document.body.style.color=colorInput
    $button.style.color=colorInput
    $A.style.color=colorInput
    $B.style.color=colorInput
    $bB.style.color=colorInput
    $C.style.color=colorInput
})



// add background apod img 
fetch(`https://api.nasa.gov/planetary/apod?api_key=PiwYsGeAh0it8JO47wAsvP49H6YHzTPl7fbpnc6g&date=${D}`)
    .then(response=>response.json())
    .then(data =>{
        console.log(data)
        console.log(data.title)
        console.log(data.url)
        $container.style.backgroundImage = `url(${data.url})`
    })
    .catch(error=>{
        console.log(error.name, error.message)
    })








