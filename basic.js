module.exports = BasicCard;

function BasicCard(front, back){
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard(front, back);
    }

    this.displayCard = function(){
        console.log(`Front: ${this.front}\nBack: ${this.back}`);
    }
}