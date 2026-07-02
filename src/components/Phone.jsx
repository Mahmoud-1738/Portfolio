import { useGLTF } from "@react-three/drei";
// draco-compressed version (1.1MB instead of 10MB) — useGLTF decodes it
import phoneUrl from "../assets/iphone_15_pro_max_black.opt.glb?url";

export function Phone(props) {
  const { scene } = useGLTF(phoneUrl);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload(phoneUrl);
