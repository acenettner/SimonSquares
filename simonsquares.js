var ca = document.getElementById('c');
var c = ca.getContext('2d');
var p = 0, t = 0, lt = 0, pt = false, k = true, j = 0, o = [1, 2, 3], go = false, s = 0;
function ic() {
    if (p != o[j]) {
        go = true;
        alert('Final Score: ' + s + '\nTo play again, press the enter key after closing this.');
        k = true;
        return;
    }
    s++;
}
function gl(ts) {
    var dt = ts - lt;
    lt = ts;
    c.clearRect(0, 0, 256, 256);
    c.fillStyle = 'azure';
    c.fillRect(0, 0, 256, 256);
    c.fillStyle = 'tan';
    if (p != 0) {
        t += dt;
        if ((pt && t > 150) || (!pt && t > 750)) {
            p = 0; t = 0; j++;
            if (pt && j >= o.length) {
                pt = false; j = 0; t = 0; p = 0; o.push(0);
                for (var i = 0; i < o.length; i++) {
                    var r = Math.floor(Math.random() * 3) + 1;
                    o[i] = r;
                }
            }
        }
    }
    if (p != 1) {c.fillRect(96 - 16 / 2, 128 - 16 / 2, 16, 16);}
    if (p != 2) {c.fillRect(128 - 16 / 2, 96 - 16 / 2, 16, 16);}
    if (p != 3) {c.fillRect(160 - 16 / 2, 128 - 16 / 2, 16, 16);}
    if (!pt && !go)
    {
        p = o[j];
        if (j >= o.length) {
            pt = true; j = 0; t = 0; p = 0;
        }
    }
    document.addEventListener("keydown", (event)=> {
        if (pt && k && !go) {
            if (event.key == 'ArrowLeft') {
                p = 1;
                k = false;
            }
            if (event.key == 'Enter') {
                p = 2;
                k = false;
            }
            if (event.key == 'ArrowRight') {
                p = 3;
                k = false;
            }
            ic();
        }
        if (k && go && event.key == 'Enter') {
                o = [1, 2, 3]; pt = false; j = 0; t = 0; p = 0; s = 0; go = false;
            }
    })
    document.addEventListener("keyup", (event)=> { k = true;})
    requestAnimationFrame(gl);
}
requestAnimationFrame(gl);