export function
    /**
     * Generrates numbers with a statistically normal distribution
     *
     * @param mean Statistical mean
     * @param sigma Standard Deviation
     */
    generateNormalNumbers(mean: number = 0, sigma: number = 1): number {
    if (!Number.isFinite(mean) || !Number.isFinite(sigma) || sigma < 0) {
        throw new Error("Mean, σ must be finite, σ > 0");
    }

    let u = 0;
    let v = 0;
    // [0,1) -> (0,1) to prevent exception for log(0)
    while (u === 0) { u = Math.random(); }
    while (v === 0) { v = Math.random(); }

    const w = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return w * sigma + mean;

}
