export function parallaxTransform(offset, depth = 1, options = {}) {
  const {
    translateMul = 32,
    rotateMul = 12,
    zMul = 40,
  } = options;

  const tx = offset.x * depth * translateMul;
  const ty = offset.y * depth * translateMul;
  const rz = offset.x * depth * rotateMul;
  const ry = offset.y * depth * -rotateMul;
  const tz = depth * zMul;

  return `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${ry}deg) rotateY(${rz}deg)`;
}

export function parallaxTransformFlat(offset, depth = 1) {
  const tx = offset.x * depth * 24;
  const ty = offset.y * depth * 24;
  return `translate3d(${tx}px, ${ty}px, 0)`;
}
