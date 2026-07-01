import { useGLTF } from "@react-three/drei";
import phoneUrl from "../assets/iphone_15_pro_max_black.glb?url";

export function Phone(props) {
  const { scene } = useGLTF(phoneUrl);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload(phoneUrl);
