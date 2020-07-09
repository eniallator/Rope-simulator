class Rope {
  constructor(start, end, numParticles, elasticity, friction, spacingDist) {
    const offset = end.copy().sub(start).divide(numParticles);

    this.particles = new Array(numParticles)
      .fill()
      .map(
        (e, i) =>
          new RopeParticle(
            start.copy().add(offset.copy().multiply(i)),
            i === 0,
            elasticity,
            friction,
            spacingDist
          )
      );
  }

  update(forces = []) {
    this.particles.forEach((curr, i) =>
      curr.update(
        this.particles[i - 1] && this.particles[i - 1].oldPos,
        this.particles[i + 1] && this.particles[i + 1].pos,
        forces
      )
    );
  }

  draw(ctx) {
    this.particles.forEach((curr, i) => curr.draw(ctx));
  }
}
