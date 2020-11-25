Rive({
    locateFile: (file) => 'https://unpkg.com/rive-canvas@0.6.5/' + file,
}).then((rive) => {
    console.log("Successfully loaded Rive runtime.");
    playAnimation(rive, 'https://jaredgonzales.me/animations/infitap-logo-animation.riv', 'Rainbow Outline', 'infitapAnimation');
    playAnimation(rive, 'https://jaredgonzales.me/animations/yct-logo.riv', 'Reveal', 'yctAnimation');
});

function playAnimation (rive, filePath, animationName, canvasID) {
    const req = new Request(filePath);
    fetch(req).then((res) => {
        return res.arrayBuffer();
    }).then((buf) => {
        const file = rive.load(new Uint8Array(buf));
        const artboard = file.defaultArtboard();
        const animation = artboard.animation(animationName);
        const animationInstance = new rive.LinearAnimationInstance(animation);

        // Render animation
        const canvas = document.getElementById(canvasID);
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

        // Draw to canvas
        artboard.draw(renderer);
        ctx.restore();

        let lastTime = 0;

        function draw(time) {
            if (!lastTime) {
                lastTime = time;
            }
            const elapsedTime = (time - lastTime) / 1000;
            lastTime = time;

            animationInstance.advance(elapsedTime);
            animationInstance.apply(artboard, 1.0);
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