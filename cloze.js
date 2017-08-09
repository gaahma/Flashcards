module.exports = ClozeCard;

function ClozeCard(full, deletion){
    this.makePartial = function(){
        deletion = deletion.split(" ");
        full = full.split(" ");
        for(var i = 0; i < deletion.length; i++){
            for(var j = 0; j < full.length; j++){
                if(deletion[i] === full[j]){
                    full[j] = "______";
                }
            }
        }
        this.partial = full.join(" ");  
    }

    this.displayCard = function(){
        console.log(`Deletion: ${this.deletion}\nFull: ${this.full}\nPartial: ${this.partial}`);
    }

    if(this instanceof ClozeCard){
        this.deletion = deletion;
        this.full = full;
        this.makePartial();
    } else {
        return new ClozeCard(full, deletion);
    }
}