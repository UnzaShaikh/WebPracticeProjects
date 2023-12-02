var timeOut;

const scroll = new LocomotiveScroll({
    //el mtln first element of html page
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnie(){
    var tl = gsap.timeline();

    tl.from("nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    tl.to(".boundingelem",{
        y: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })

    tl.from("#herofooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

function circleSqueeze(){
    //define default scale value 
    var xscale = 1;  // normal circle size
    var yscale = 1;  // normal circle size

    var xprev = 0; // mouse move hone se phly ki value x-axis mein initially it is zero because mouse is not moving
    var yprev = 0; //mouse move hone se phly ki value x-axis mein initially it is zero because mouse is not moving
    window.addEventListener("mousemove",function(dets){
        this.clearTimeout(timeOut); // prev timeOut ki jo values hain woh clear hoti rahengi
        xdiff = dets.clientX - xprev; // dets.clients new location mouse ki jab woh move hoga to uski value - previous location of mouse se minus krdo 
        ydiff = dets.clientY - yprev; // same for y
        
        
        xprev = dets.clientX; // mouse screen pr kahan hai uski location 
        yprev = dets.clientY; // same for y

        //ek range set krengy jis s x aur y ki values us range mein convert hojaengi 
        xscale = gsap.utils.clamp(.8,1.2,xdiff);
        yscale = gsap.utils.clamp(.8,1.2,ydiff);

        circleMouseFollower(xscale,yscale);
        // jab mouse band hojae tab yeh circle ko apni original shape mein krdega
        timeOut=setTimeout(() => {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1,1)`;
        }, 100);
    })
}

//fuction for minicircle
function circleMouseFollower(xscale,yscale){
    //dets used to provide mouse moving details
    window.addEventListener("mousemove", function(dets){
        // mouse ki x aur y values ko lene k lie translate ka use kiya hai
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleSqueeze();
circleMouseFollower();
firstPageAnie();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata 
//karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, 
//ab mouse ki x y position ke badle us image ko show karo and us image ko move karo,
// move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye.

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });