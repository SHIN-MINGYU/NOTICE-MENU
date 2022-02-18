module.exports = function () {
    return `
            const poped_up = function(){
            let bg = document.createElement('div');
            let discriminate = document.createElement('div');
            let div = document.createElement('div');
            let loginForm = document.createElement('form');
            let passwordDiv = document.createElement('div');
            let password = document.createElement('p');
            let passwordInput = document.createElement('input');
            let idDiv = document.createElement('div');
            let id = document.createElement('p');
            let idInput = document.createElement('input');
            let ok = document.createElement('button');
            let cancle =document.createElement('button');
            let br = document.createElement('br');
            let idString = document.createTextNode('아이디 : ');
            let passString = document.createTextNode('패스워드 : ');
            loginForm.action = '/auth/login_process';
            idInput.name = 'username';
            passwordInput.name = 'password';
            loginForm.method = 'post';
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
                borderRadius : '15px',
                transform : 'translate(-50%,-50%)',
                textAlign : 'center'
            })
            div.setStyle({
                width : 'auto',
                height: 'auto',
                marginTop : '15vh',
            })
            password.setStyle({
                fontFamily : 'SF_IceLemon',
                display : 'inline-block',
                marginRight : '1vw', 
            })
            id.setStyle({
                fontFamily : 'SF_IceLemon',
                display : 'inline-block',
                marginRight : '1vw', 
            })
            passwordInput.setStyle({
                borderRadius : '15px',
                marginRight : '1vw',
            })
            idInput.setStyle({
                borderRadius : '15px',
            })
            ok.style.margin = '1%';
            cancle.style.margin = '1%';
            ok.style.fontFamily = 'SF_IceLemon';
            cancle.style.fontFamily = 'SF_IceLemon'; 
            document.body.append(bg);
            document.body.append(discriminate);
            discriminate.appendChild(div);
            div.appendChild(loginForm);
            loginForm.appendChild(idDiv);
            idDiv.appendChild(id);
            idDiv.appendChild(idInput);
            loginForm.appendChild(passwordDiv);
            passwordDiv.appendChild(password);
            passwordDiv.appendChild(passwordInput);
            loginForm.appendChild(ok);
            loginForm.appendChild(cancle);
            id.appendChild(idString);
            password.appendChild(passString);
            ok.innerText = '확인';
            cancle.innerText = '취소';
            ok.addEventListener('click',()=>{
                event.preventDefault();
            })
            passwordInput.addEventListener('keyup',(e) =>{
                if(e.keyCode === 13){
                    loginForm.submit();
                }
            })
            cancle.addEventListener('click',()=>{
                bg.remove();
                discriminate.remove();
                event.preventDefault();
            })
            
        }
        Element.prototype.setStyle = function(style){
            for(var k in style){
                this.style[k] = style[k];
            }
            return this;
        }
        poped_up();`;
}

