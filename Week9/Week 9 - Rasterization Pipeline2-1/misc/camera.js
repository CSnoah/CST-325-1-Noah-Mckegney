/*
 * An object representing a Camera with position and orientation.
 */

class Camera {
  constructor(input) {
    // The following two parameters will be used to create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new Matrix4();

    this.input = input;
  }

  // -------------------------------------------------------------------------
  getViewMatrix() {
    return this.cameraWorldMatrix.clone().inverse();
  }

  // -------------------------------------------------------------------------
  getForward() {
    // todo #6 - pull out the forward direction from the world matrix and return as a vector
    //         - recall that the camera looks in the "backwards" direction
    let forwardVec = new Vector3();
    forwardVec.set(
      -this.cameraWorldMatrix.getElement(0, 2),
      -this.cameraWorldMatrix.getElement(1, 2),
      -this.cameraWorldMatrix.getElement(2, 2));
    return forwardVec;
    // return new Vector3();
  }

  // -------------------------------------------------------------------------
  update(dt) {
    const currentForward = this.getForward();

    if (this.input.up) {
      // todo #7 - move the camera position a little bit in its forward direction
      this.cameraPosition.add(currentForward.clone().multiplyScalar(0.1));
    }

    if (this.input.down) {
      // todo #7 - move the camera position a little bit in its backward direction
      this.cameraPosition.add(currentForward.clone().multiplyScalar(-0.1));
    }

    if (this.input.left) {
      // todo #8 - add a little bit to the current camera yaw
      this.cameraYaw += 1;
    }

    if (this.input.right) {
      // todo #8 - subtract a little bit from the current camera yaw
      this.cameraYaw -= 1;
    }

    // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition
    let move = new Matrix4().makeTranslation(this.cameraPosition);

    // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
    // (order matters!)
    let yaw = this.cameraWorldMatrix.clone().makeRotationY(this.cameraYaw);

    this.cameraWorldMatrix = move.multiply(yaw)
  }
}
