window.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Text Splitting for Title (Alternative to GSAP SplitText paid plugin)
    const title = document.querySelector('.content h1');
    if (title) {
        const words = title.textContent.trim().split(/\s+/);
        title.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.classList.add('word');
            span.textContent = word;
            title.appendChild(span);
            // Append a space between words
            if (index < words.length - 1) {
                title.appendChild(document.createTextNode(' '));
            }
        });
    }

    // 2. Initialize GSAP Entrance Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Logo slides in from the left
    tl.from(".logo-wrapper", {
        x: '-150%',
        opacity: 0,
        duration: 1.2
    })

    // Navigation bar fades and slides up
    .from("nav", {
        opacity: 0,
        y: '50px',
        duration: 1.0
    }, "-=0.8")

    // Button: always starts visible, just slides from right
    gsap.set(".btn", { opacity: 1 });
    tl.from(".btn", {
        x: '120%',
        duration: 1.2,
        clearProps: "x"
    }, "-=1.0")

    // Social Wrapper box fades and slides up
    .from(".social-wrapper", {
        opacity: 0,
        y: '50px',
        duration: 1.0
    }, "-=0.8")

    // Tagline fades in with a delay
    .from(".tagline", {
        opacity: 0,
        y: '20px',
        duration: 1.0
    }, "-=0.5")

    // Staggered Title words drop down with random rotation offsets for maximum premium feel
    .from(".word", {
        y: -120,
        opacity: 0,
        rotation: "random(-60, 60)",
        duration: 1.3,
        ease: "back.out(1.5)",
        stagger: 0.22
    }, "-=1.2");


    // 3. Smooth Interactive Mouse Parallax Effect
    document.addEventListener("mousemove", (e) => {
        // Calculate normalized coordinates (-0.5 to 0.5) relative to screen center
        const xNorm = (e.clientX / window.innerWidth) - 0.5;
        const yNorm = (e.clientY / window.innerHeight) - 0.5;

        // Shift the background video in the opposite direction (inverted parallax)
        // Scale is slightly increased to avoid showing borders during translation
        gsap.to(".bg-video", {
            x: -xNorm * 30,
            y: -yNorm * 30,
            scale: 1.06,
            duration: 1.2,
            ease: "power2.out"
        });

        // Shift the left ambient gradient shape
        gsap.to(".gradient-shape", {
            x: xNorm * 40,
            y: yNorm * 40,
            duration: 1.5,
            ease: "power2.out"
        });

        // Shift the text content wrapper in the direction of the cursor (direct parallax)
        gsap.to(".content-wrapper", {
            x: xNorm * 18,
            y: yNorm * 18,
            duration: 1.2,
            ease: "power2.out"
        });
    });

});