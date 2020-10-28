Rive({
    locateFile: (file) => 'https://unpkg.com/rive-canvas@0.6.4/' + file,
}).then((rive) => {
    console.log("Successfully loaded Rive runtime.");
    playInfitapLoad(rive);
    playYCT(rive);
});

function playInfitapLoad(rive) {
    const req = new Request('https://jaredgonzales.me/animations/infitap-logo-animation.riv');
    fetch(req).then((res) => {
        return res.arrayBuffer();
    }).then((buf) => {
        const file = rive.load(new Uint8Array(buf));
        const artboard = file.defaultArtboard();
        const infitapAnim = artboard.animation('Rainbow Outline');
        const infitapAnimInstance = new rive.LinearAnimationInstance(infitapAnim);

        // Render animation
        const canvas = document.getElementById('infitapAnimation');
        const ctx = canvas.getContext('2d');
        const renderer = new rive.CanvasRenderer(ctx);
        artboard.advance(0);

        // Renderer alignmnet
        ctx.save();
        renderer.align(rive.Fit.contain, rive.Alignment.center, {
            minX: 0,
            minY: 0,
            maxX: canvas.width,
            maxY: canvas.height
        }, artboard.bounds);
        artboard.draw(renderer);
    ctx.restore();

    let lastTime = 0;

    function draw(time) {
        if (!lastTime) {
            lastTime = time;
        }
        const elapsedTime = (time - lastTime) / 1000;
        lastTime = time;

        infitapAnimInstance.advance(elapsedTime);
        infitapAnimInstance.apply(artboard, 1.0);
        artboard.advance(elapsedTime);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        renderer.align(rive.Fit.contain, rive.Alignment.center, {
            minX: 0,
            minY: 0,
            maxX: canvas.width,
            maxY: canvas.height
        }, artboard.bounds);
        artboard.draw(renderer);
        ctx.restore();

        requestAnimationFrame(draw);
    }
        requestAnimationFrame(draw);
    });
    
}

function playYCT(rive) {
    const req = new Request('https://jaredgonzales.me/animations/you-can-too-logo.riv');
    fetch(req).then((res) => {
        return res.arrayBuffer();
    }).then((buf) => {
        const file = rive.load(new Uint8Array(buf));
        const artboard = file.defaultArtboard();
        const yctAnim = artboard.animation('Reveal');
        const yctAnimInstance = new rive.LinearAnimationInstance(yctAnim);

        // Render animation
        const canvas = document.getElementById('infitapAnimation');
        const ctx = canvas.getContext('2d');
        const renderer = new rive.CanvasRenderer(ctx);
        artboard.advance(0);

        // Renderer alignmnet
        ctx.save();
        renderer.align(rive.Fit.contain, rive.Alignment.center, {
            minX: 0,
            minY: 0,
            maxX: canvas.width,
            maxY: canvas.height
        }, artboard.bounds);
        artboard.draw(renderer);
    ctx.restore();

    let lastTime = 0;

    function draw(time) {
        if (!lastTime) {
            lastTime = time;
        }
        const elapsedTime = (time - lastTime) / 1000;
        lastTime = time;

        yctAnimInstance.advance(elapsedTime);
        yctAnimInstance.apply(artboard, 1.0);
        artboard.advance(elapsedTime);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        renderer.align(rive.Fit.contain, rive.Alignment.center, {
            minX: 0,
            minY: 0,
            maxX: canvas.width,
            maxY: canvas.height
        }, artboard.bounds);
        artboard.draw(renderer);
        ctx.restore();

        requestAnimationFrame(draw);
    }
        requestAnimationFrame(draw);
    });
    
}
