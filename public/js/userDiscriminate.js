module.exports = {
    modal: function (password, id, mode) {
        return `
        const poped_up = function(){
            let bg = document.createElement('div');
            let discriminate = document.createElement('div');
            let div = document.createElement('div');
            let p = document.createElement('p');
            let input = document.createElement('input');
            let ok = document.createElement('button');
            let cancle =document.createElement('button');
            let br = document.createElement('br');
            let string = document.createTextNode('패스워드를 입력해주십시오.');
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
                marginTop:'20vh'
            })
            p.style.fontFamily = 'SF_IceLemon';
            input.setStyle({
                borderRadius : '15px',
            })
            ok.style.margin = '1%';
            cancle.style.margin = '1%';
            ok.style.fontFamily = 'SF_IceLemon';
            cancle.style.fontFamily = 'SF_IceLemon'; 
            document.body.append(bg);
            document.body.append(discriminate);
            discriminate.appendChild(div);
            div.appendChild(p);
            div.appendChild(input);
            div.appendChild(br);
            div.appendChild(ok);
            div.appendChild(cancle);
            p.appendChild(string);
            ok.innerText = '확인';
            cancle.innerText = '취소';
            let modeSearch = function(mode){
                if(mode === 'update_notice'){
                    if(input.value === '${password}'){
                        location.href = '/notice/page/${id}/update';
                        }
                    else{
                        alert('패스워드를 다시 입력해주세요');
                    }
                } else if(mode === 'delete_notice'){
                    if(input.value === '${password}'){
                            document.getElementById('form_delete_notice').submit();
                        }
                    else{
                        alert('패스워드를 다시 입력해주세요');
                    }

                } else if(mode === 'delete_comment'){
                    if(input.value === '${password}'){
                        document.getElementById('form_delete_comment').submit();
                        }
                    else{
                        alert('패스워드를 다시 입력해주세요');
                    }
                }
            }
            ok.addEventListener('click',()=>{
                event.preventDefault();
                modeSearch('${mode}');
            })
            input.addEventListener('keyup',(e) =>{
                if(e.keyCode === 13){
                    modeSearch('${mode}');
                }
            })
            cancle.addEventListener('click',()=>{
                bg.remove();
                discriminate.remove();
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
}
