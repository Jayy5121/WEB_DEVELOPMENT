const p1 ={
    score:0 ,
    button:document.querySelector('#p1button'),
    display:document.querySelector('#p1display')
}
const p2 ={
    score:0 ,
    button:document.querySelector('#p2button'),
    display:document.querySelector('#p2display')
}
const reset = document.querySelector('#reset')
let select =document.querySelector('#playtoSelect')
let winningscore=2;
let gameover =false

function updateScores(player, opponent) {
    if(!gameover){
        player.score+=1;
        if(player.score===winningscore){
            gameover=true
            player.display.classList.add('has-text-success')
            opponent.display.classList.add('has-text-danger')
            player.button.disabled =true;
            opponent.button.disabled=true;
        }
    } 
        player.display.innerText=player.score
}
p1.button.addEventListener('click',function(){
    updateScores(p1,p2)
})
p2.button.addEventListener('click',function(){
    updateScores(p2,p1)
})
select.addEventListener('change',function(){
    winningscore=parseInt(this.value);
    resetbutton();
})
reset.addEventListener('click',resetbutton)

function resetbutton(){
    gameover=false;
    for ( let p of[p1,p2]){
        p.score=0;
        p.display.innerText=0;
        p.display.classList.remove('has-text-success','has-text-danger')
        p.button.disabled=false;
    }
}
