import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

// Network Nodes (Static Constellation)
function NetworkParticles({ count = 200 }) {
    const pointsRef = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Wider spread for a more immersive background
            temp[i * 3] = (Math.random() - 0.5) * 15;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 15;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return temp;
    }, [count]);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.x -= delta / 20;
            pointsRef.current.rotation.y -= delta / 30;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#268bd2" // Kali Blue
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

// Data Packets (Moving Cubes representing Traffic)
// Protocol Text Packets (Moving Text representing Traffic)
function ProtocolTextPackets({ count = 25 }) {
    const groupRef = useRef<THREE.Group>(null!);

    const protocols = ['TCP', 'UDP', 'BGP', 'OSPF', 'ICMP', 'SSH', 'DNS', 'HTTP', 'SYN', 'ACK', 'HANDSHAKE', 'SSL', 'ARP'];

    const packetData = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * 100,
            vector: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize(),
            text: protocols[Math.floor(Math.random() * protocols.length)]
        }));
    }, [count]);

    return (
        <group ref={groupRef}>
            {packetData.map((data, i) => (
                <SingleTextPacket key={i} speed={data.speed} offset={data.offset} vector={data.vector} text={data.text} />
            ))}
        </group>
    )
}

function SingleTextPacket({ speed, offset, vector, text }: { speed: number, offset: number, vector: THREE.Vector3, text: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Move along the vector, loop back
        const dist = (time * speed * 10 + offset) % 20 - 10;

        meshRef.current.position.set(
            vector.x * dist,
            vector.y * dist,
            vector.z * dist
        );
        meshRef.current.lookAt(state.camera.position); // Billboard effect: always face camera
    });

    return (
        <Text
            ref={meshRef}
            color="#dc322f" // Kali Red
            fontSize={0.2}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#1f2229"
        >
            {text}
        </Text>
    );
}

export default function Background3D() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <fog attach="fog" args={['#1f2229', 5, 20]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <NetworkParticles count={400} />
                <ProtocolTextPackets count={30} />
            </Canvas>
        </div>
    );
}
