module.exports ={
    modal : function(){
        return `Element.prototype.setStyle = function(style){
            for(var k in style){
                this.style[k] = style[k];
            }
            return this;
        }
        let poped_up = function(){
            let bg = document.createElement('div');
            let discriminate = document.createElement('div');
            let p = document.createElement('p');
            p.innerText = "패스워드를 입력해주세요";
            let zIndex = 9999;
            bg.setStyle({
                position : 'fixed',
                width : '100vw',
                height : '100vh',
                backgroundColor : 'gray',
                opacity : 0.5,
                zIndex : zIndex,
                top : 0,
                left : 0
            })
            discriminate.setStyle({
                position:'fixed',
                width:'50vw',
                height :'50vh',
                backgroundColor : 'white',
                zIndex : zIndex +1,
                top: '50vh',
                left : '50vw',
                transform : 'translate(-50%,-50%)'
            })
            document.body.append(bg);
            document.body.append(discriminate);
        }
        poped_up();`;
    }
}
