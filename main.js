var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}


window.addEventListener('mousemove', function (event) {

    mouse.x = event.x;
    mouse.y = event.y;

});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.lifes = 3;
    this.waves = 1;
    console.log(this.x, this.dx, this.y, this.dy, this.radius);

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'red'
        c.fill();
    }

    this.update = function () {
        if (this.lifes <= 0) {
            document.querySelector(".modal__gameover").style.display = "flex";
        } else {
            document.querySelector(".modal__gameover").style.display = "none";
            if (mouse.x - this.x < 30 && mouse.x - this.x > -30 &&
                mouse.y - this.y < 30 && mouse.y - this.y > -30) {
                alert("You lose 1 life!");
                this.lifes--;
            }
        }

        document.querySelector(".life").innerHTML = this.lifes;
        document.querySelector(".wave").innerHTML = this.waves;

        if (this.lifes == 3) {
            document.querySelector(".life").style.color = "lightgreen";
        } else if (this.lifes == 2) {
            document.querySelector(".life").style.color = "orange";
        } else if (this.lifes == 1) {
            document.querySelector(".life").style.color = "red";
        } else {

        }

        if (this.x + this.radius > innerWidth - 10 || this.x - this.radius < 10) {
            this.dx = -this.dx;
        } else if (this.y + this.radius > innerHeight - 10 || this.y - this.radius < 68) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        console.log(this.x, this.y, this.dx, this.dy);

        this.draw();
    }
}

var circleArray = [];

function pushPopOnArray(stop) {

    if (stop == true) {
        for (let i = 0; i < circleArray.length; i++) {
            circleArray.pop();
        }
        animate(true);
    } else {
        for (let i = 0; i < 1; i++) {
            let radius = 30;
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let dx = 5;
            let y = Math.random() * (innerHeight - radius * 2) + radius;
            let dy = 10;
            circleArray.push(new Circle(x, y, dx, dy, radius));
            console.log(x, dx, y, dy, radius);
        }
        animate(false);
    }


}

function animate(stop) {
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    if (stop == true) {
        cancelAnimationFrame(animate);
        pushPopOnArray(false);
    } else {
        requestAnimationFrame(animate);
    }
}
