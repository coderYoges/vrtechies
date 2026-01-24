import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Brain = ({ color, isFlashing }) => {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  const { mouse, viewport } = useThree();

  // Responsive Scaling: Adjust base size for mobile
  const isMobile = viewport.width < 5;
  const responsiveScale = isMobile ? 0.8 : 1.1;

  // 1. Generate the Neural Web Geometry
  const { positions, linePositions } = useMemo(() => {
    const count = isMobile ? 400 : 650; // Optimized for performance
    const positions = new Float32Array(count * 3);
    const linePairs = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.sin(phi) * Math.sin(theta);
      let z = Math.cos(phi);

      // Anatomical Shape: Creates the two hemispheres (cleft) and cortical folds
      const cleft = 1.0 - 0.3 * Math.exp(-12 * Math.pow(x, 2));
      const folds = 0.12 * Math.sin(10 * x) * Math.sin(10 * y) * Math.sin(10 * z);
      const r = (1.4 * cleft) + folds;

      // Map to Brain proportions (Length > Height > Width)
      const px = x * r * 1.3;
      const py = y * r * 1.5;
      const pz = z * r * 1.8;

      positions.set([px, py, pz], i * 3);
    }

    // Connect nodes that are close to create a 'Plexus' web
    const maxDistance = isMobile ? 1.1 : 0.9;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePairs.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    return { 
      positions, 
      linePositions: new Float32Array(linePairs) 
    };
  }, [isMobile]);

  // 2. Animation Logic (360 + Parallax + Pulse + Flash)
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Auto-rotation (The 360 effect)
    const autoRotationY = time * 0.15;
    
    // Mouse/Touch Parallax (Wiggle effect)
    const reactionStrength = isMobile ? 0.6 : 0.4;
    const targetRotationX = (mouse.y * reactionStrength);
    const targetRotationY = autoRotationY + (mouse.x * reactionStrength);

    // Smooth movement (Lerping)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);

    // Dynamic Pulsing and Flash Scale
    const flashScale = isFlashing ? 1.15 : 1.0;
    const s = (responsiveScale * flashScale) + Math.sin(time * 1.5) * 0.02;
    groupRef.current.scale.setScalar(s);

    // Update Materials for the "Neural Flash"
    if (pointsRef.current && linesRef.current) {
      // Points get brighter and larger
      pointsRef.current.material.opacity = THREE.MathUtils.lerp(
        pointsRef.current.material.opacity, 
        isFlashing ? 1.0 : 0.6, 
        0.1
      );
      pointsRef.current.material.size = THREE.MathUtils.lerp(
        pointsRef.current.material.size, 
        isFlashing ? 0.12 : (isMobile ? 0.08 : 0.05), 
        0.1
      );
      // Lines get slightly more visible during flash
      linesRef.current.material.opacity = THREE.MathUtils.lerp(
        linesRef.current.material.opacity, 
        isFlashing ? 0.4 : 0.15, 
        0.1
      );
    }
  });

return (
  <group ref={groupRef}>
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      {/* Three.js color updates are reactive to the color prop */}
      <pointsMaterial
        color={color} 
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>

    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  </group>
);
};

export default Brain;