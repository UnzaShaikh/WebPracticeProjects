const scroll = new LocomotiveScroll({
    //el mtln first element of html page
    el: document.querySelector('#main'),
    smooth: true
});

//fuction for minicircle
function circleMouseFollower(){
    //dets used to provide mouse moving details
    window.addEventListener("mousemove", function(dets){
        // mouse ki x aur y values ko lene k lie translate ka use kiya hai
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)`;
    })
}

circleMouseFollower();