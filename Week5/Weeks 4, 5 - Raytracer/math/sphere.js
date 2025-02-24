/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 */

class Sphere {
  constructor(center, radius, color= new Vector3(1,1,1)) {
    if (!(this instanceof Sphere)) {
      console.error("Sphere constructor must be called with the new operator");
    }

    this.center = center;
    this.radius = radius;
    this.color = color

    if (center === undefined || radius === undefined) {
      this.center = new Vector3();
      this.radius = 1;
    }

    if (!(this.center instanceof Vector3)) {
      console.error("The sphere center must be a Vector3");
    }

    if (typeof this.radius !== 'number') {
      console.error("The radius must be a Number");
    }
  }

  //-----------------------------------------------------------------------------
  raycast(ray) {
    const sphereOriginToRayOrigin = ray.origin.clone().subtract(this.center);

    const a = ray.direction.dot(ray.direction);
    const b = ray.direction.clone().multiplyScalar(2).dot(sphereOriginToRayOrigin);
    const c = sphereOriginToRayOrigin.dot(sphereOriginToRayOrigin) - this.radius * this.radius;

    const result = { hit: false };

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return result;
    }

    const discriminantRoot = Math.sqrt(discriminant);
    const t1 = (-b - discriminantRoot) / (2 * a);
    const t2 = (-b + discriminantRoot) / (2 * a);

    if (t1 > 0 && t2 > 0) {
      const t = (t1 < t2) ? t1 : t2;
      const originOffset = ray.direction.clone().multiplyScalar(t);

      result.hit = true;
      result.point = ray.origin.clone().add(originOffset);
      result.normal = result.point.clone().subtract(this.center).normalize();
      result.distance = originOffset.length();
    }

    return result;
  }
}
