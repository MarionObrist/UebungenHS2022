function clock() {
    var d = new Date();
    var ds = d.toDateString();
    var ts = d.toTimeString();

    const today = document.querySelector('#date');
    const time = document.querySelector('#time');

    today.innerHTML = ds;
    time.innerHTML = ts;


    setInterval(clock, 500);

}
