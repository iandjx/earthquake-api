function* chunkArray<T>(arr: T[], stride: number = 1) {
  for (let i = 0; i < arr.length; i += stride) {
    yield arr.slice(i, Math.min(i + stride, arr.length))
  }
}
export default chunkArray
