import { useRef, useEffect } from 'react';

interface DotGlobeProps {
    /** Dots per ring of latitude */
    dotDensity?: number;
    /** Rotation speed (radians per frame) */
    rotationSpeed?: number;
    /** CSS color for dots */
    dotColor?: string;
    /** Max dot radius in px */
    dotRadius?: number;
    className?: string;
}

/**
 * Dotted globe using Canvas 2D — no WebGL required.
 * Projects 3D sphere points onto a 2D canvas with depth-based sizing and opacity.
 */
export default function DotGlobe({
    dotDensity = 18,
    rotationSpeed = 0.003,
    dotColor = '180, 120, 60',
    dotRadius = 1.6,
    className = '',
}: DotGlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Generate sphere points (latitude/longitude grid)
        const points: [number, number, number][] = [];
        const latCount = dotDensity;
        for (let lat = 0; lat < latCount; lat++) {
            const theta = (Math.PI * (lat + 0.5)) / latCount;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            const lonCount = Math.max(4, Math.round(dotDensity * 2 * sinTheta));
            for (let lon = 0; lon < lonCount; lon++) {
                const phi = (2 * Math.PI * lon) / lonCount;
                const x = sinTheta * Math.cos(phi);
                const y = cosTheta;
                const z = sinTheta * Math.sin(phi);
                points.push([x, y, z]);
            }
        }

        let rotation = 0;
        let animationId: number;

        const render = () => {
            // Use CSS pixel dimensions (clientWidth/clientHeight) rather than the
            // physical canvas.width/height, because ctx.setTransform(dpr,…) already
            // maps drawing coordinates to CSS-pixel space.  Using canvas.width on a
            // retina display (dpr=2) would compute a center twice as far from the
            // origin as the visible canvas, shifting the globe to the bottom-right.
            const cssW = canvas.clientWidth  || canvas.width;
            const cssH = canvas.clientHeight || canvas.height;
            const cx = cssW / 2;
            const cy = cssH / 2;
            // 0.48 ≈ 96% of the shorter edge — fills the container fully
            const radius = Math.min(cssW, cssH) * 0.48;

            ctx.clearRect(0, 0, cssW, cssH);

            rotation += rotationSpeed;

            const cosR = Math.cos(rotation);
            const sinR = Math.sin(rotation);

            // Tilt the globe ~15° on X
            const tiltX = -0.26; // ~15 degrees
            const cosT = Math.cos(tiltX);
            const sinT = Math.sin(tiltX);

            // Sort by depth for proper layering
            const projected = points.map(([x, y, z]) => {
                // Rotate around Y axis
                const rx = x * cosR + z * sinR;
                const rz = -x * sinR + z * cosR;
                // Rotate around X axis (tilt)
                const ry = y * cosT - rz * sinT;
                const rz2 = y * sinT + rz * cosT;

                return {
                    screenX: cx + rx * radius,
                    screenY: cy + ry * radius,
                    depth: rz2, // -1 (back) to 1 (front)
                };
            });

            // Draw back-facing dots first, front-facing last
            projected.sort((a, b) => a.depth - b.depth);

            for (const { screenX, screenY, depth } of projected) {
                // Map depth (-1 to 1) to opacity and size
                const t = (depth + 1) / 2; // 0 (back) to 1 (front)
                const opacity = 0.12 + t * 0.46;
                const size = dotRadius * (0.4 + t * 0.6);

                ctx.beginPath();
                ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${dotColor}, ${opacity})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(render);
        };

        // Handle resize — match canvas resolution to container
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                const dpr = Math.min(window.devicePixelRatio, 2);
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }
        });
        resizeObserver.observe(canvas.parentElement || canvas);

        animationId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
        };
    }, [dotDensity, rotationSpeed, dotColor, dotRadius]);

    return (
        <div className={className} style={{ width: '100%', height: '100%' }}>
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block' }}
            />
        </div>
    );
}
