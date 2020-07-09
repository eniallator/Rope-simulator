class RopeParticle {
  constructor(pos, ignoreForce, elasticity, friction, spacingDist) {
    this.pos = pos.copy();
    this.ignoreForce = ignoreForce;
    this.vel = Vector.ZERO.copy();
    this.oldPos = this.pos.copy();

    this.elasticity = elasticity;
    this.friction = friction;
    this.spacingDist = spacingDist;
  }

  addParticleForce(pos) {
    if (!pos) {
      return;
    }
    const diff = pos.copy().sub(this.pos);

    this.vel.add(
      diff
        .copy()
        .setMagnitude(diff.getMagnitude() - this.spacingDist)
        .multiply(this.elasticity)
    );
  }

  update(prevParticlePos, nextParticlePos, forces) {
    if (this.ignoreForce) {
      return;
    }
    this.oldPos = this.pos.copy();
    this.addParticleForce(prevParticlePos);
    this.addParticleForce(nextParticlePos);
    this.vel.add(...forces).multiply(this.friction);
    this.pos.add(this.vel.copy());
  }

  draw(ctx, prevParticlePos, nextParticlePos) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
