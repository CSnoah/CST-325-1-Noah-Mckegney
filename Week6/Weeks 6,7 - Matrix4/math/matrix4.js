/*
 * An "object" representing a 4x4 matrix to simplify and encapsulate matrix operations.
 *
 * This class allows us to work with matrices as distinct entities, enabling operations 
 * like multiplication, scaling, and transformations to be expressed concisely and 
 * consistently. 
 * 
 * The class assumes row-major order, meaning the elements are stored row by row in a 
 * one-dimensional array. For example:
 * 
 * Row 1: e[0], e[1], e[2], e[3]
 * Row 2: e[4], e[5], e[6], e[7]
 * Row 3: e[8], e[9], e[10], e[11]
 * Row 4: e[12], e[13], e[14], e[15]
 */

class Matrix4 {
  constructor() {
    this.elements = new Float32Array(16);
    this.makeIdentity();
  }

  // -------------------------------------------------------------------------
  clone() {
    const newMatrix = new Matrix4();
    for (let i = 0; i < 16; ++i) {
      newMatrix.elements[i] = this.elements[i];
    }
    return newMatrix;
  }

  // -------------------------------------------------------------------------
  copy(m) {
    for (let i = 0; i < 16; ++i) {
      this.elements[i] = m.elements[i];
    }

    return this;
  }

  // -------------------------------------------------------------------------
  getElement(row, col) {
    return this.elements[row * 4 + col];
  }

  // -------------------------------------------------------------------------
  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const e = this.elements;

    e[0] = n11; e[1] = n12; e[2] = n13; e[3] = n14;
    e[4] = n21; e[5] = n22; e[6] = n23; e[7] = n24;
    e[8] = n31; e[9] = n32; e[10] = n33; e[11] = n34;
    e[12] = n41; e[13] = n42; e[14] = n43; e[15] = n44;

    return this;
  }

  // -------------------------------------------------------------------------
  makeIdentity() {
    // todo make this matrix be the identity matrix

    // | 1000 | 
    // | 0100 | 
    // | 0010 | 
    // | 0001 | 

    this.set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
    return this;
  }

  // -------------------------------------------------------------------------
  multiplyScalar(s) {
    for (let i = 0; i < 16; ++i) {
      this.elements[i] = this.elements[i] * s;
    }
  }

  // -------------------------------------------------------------------------
  multiplyVector(v) {
    // safety check
    if (!(v instanceof Vector4)) {
      console.error("Trying to multiply a 4x4 matrix with an invalid vector value");
    }
    
    const result = new Vector4();
    // todo
    // set the result vector values to be the result of multiplying the
    // vector v by 'this' matrix

    let row = 0;
    let col = 0;
    let vToArray = [v.x, v.y, v.z, v.w];
    let popResult = [0,0,0,0];
    for(let i=0; i < this.elements.length; i++)
    {
      popResult[col] += this.elements[i] * vToArray[row];
      row = (row + 1) % 4;
      if(row === 0)
        col++;
    }
    result.set(popResult[0],popResult[1],popResult[2],popResult[3]);

    return result;
  }

  multiply(rightSideMatrix) {
    // safety check
    if (!(rightSideMatrix instanceof Matrix4)) {
      console.error("Trying to multiply a 4x4 matrix with an invalid matrix value");
    }

    // todo - multiply 'this' * rightSideMatrix

    let lsM_row = 0;
    let rsM_col = 0;
    let count = 0;  
    let result = this.clone();

    for(let i=0; i<this.elements.length;i++)
    {
      count += 1;
      let sum = 0;
      for(let k=0; k<4;k++)
      {
        sum += this.getElement(lsM_row, k)*rightSideMatrix.getElement(k, rsM_col);
      }
      result.elements[i] = sum;
      if(count >= 4) {
        count = 0;    
        lsM_row += 1;
      }

      rsM_col = (rsM_col + 1) % 4;
    }
    this.elements = result.elements;

    return this;
  }

  // -------------------------------------------------------------------------
  premultiply(leftSideMatrix) {
    // ignore this, the implementation will be distributed with the solution
    return this;
  }

  // -------------------------------------------------------------------------
  makeScale(x, y, z) {
    // todo make this matrix into a pure scale matrix based on (x, y, z)
    let diagonalIndex = 0;
    let diagonalArray = [x, y, z, 1];
    let nextDiagonal = 0;
    for(let i=0; i < this.elements.length;i++)
    {
      if(i == diagonalIndex)
      {
        this.elements[i] = diagonalArray[nextDiagonal];
        nextDiagonal++;
        diagonalIndex += 5
      } 
      else 
      {
        this.elements[i] = 0;
      }
      
    }
    return this;
  }

  // -------------------------------------------------------------------------
  makeRotationX(degrees) {
    // todo - convert to radians
    // var radians = ...
    let r = degrees*(Math.PI/180);

    // shortcut - use in place of this.elements
    //const e = this.elements;

    // todo - set every element of this matrix to be a rotation around the x-axis
    let xrMatrix = new Matrix4();
    xrMatrix.elements = Float32Array.from([
      1, 0, 0, 0,
      0, Math.cos(r), -Math.sin(r), 0,
      0, Math.sin(r), Math.cos(r), 0,
      0, 0, 0, 1
    ]);

    this.multiply(xrMatrix);

    return this;
  }

  // -------------------------------------------------------------------------
  makeRotationY(degrees) {
    // todo - convert to radians
    // var radians = ...
    let r = degrees*(Math.PI/180);

    // shortcut - use in place of this.elements
    //const e = this.elements;

    // todo - set every element of this matrix to be a rotation around the y-axis
    let yrMatrix = new Matrix4();
    yrMatrix.elements = Float32Array.from([
      Math.cos(r), 0, Math.sin(r), 0,
      0, 1, 0, 0,
      -Math.sin(r), 0, Math.cos(r), 0,
      0, 0, 0, 1
    ]);

    this.multiply(yrMatrix);

    return this;
  }

  // -------------------------------------------------------------------------
  makeRotationZ(degrees) {
    // todo - convert to radians
    // var radians = ...
    let r = degrees*(Math.PI/180);

    // shortcut - use in place of this.elements
    const e = this.elements;

    // todo - set every element of this matrix to be a rotation around the z-axis
    let zrMatrix = new Matrix4();
    zrMatrix.elements = Float32Array.from([
      Math.cos(r), -Math.sin(r), 0, 0,
      Math.sin(r), Math.cos(r), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    this.multiply(zrMatrix);

    return this;
  }

  // -------------------------------------------------------------------------
  makeTranslation(arg1, arg2, arg3) {
    // todo - wipe out the existing matrix and make it a pure translation
    //      - If arg1 is a Vector3 or Vector4, use its components and ignore
    //        arg2 and arg3. O.W., treat arg1 as x, arg2 as y, and arg3 as z

    if (arg1 instanceof Vector4) {
      this.elements = Float32Array.from([
        1, 0, 0, arg1.x,
        0, 1, 0, arg1.y,
        0, 0, 1, arg1.z,
        0, 0, 0, arg1.w
      ]);
    } else if (arg1 instanceof Vector3) {
      this.elements = Float32Array.from([
        1, 0, 0, arg1.x,
        0, 1, 0, arg1.y,
        0, 0, 1, arg1.z,
        0, 0, 0, 1
      ]);
    } else {
      this.elements = Float32Array.from([
        1, 0, 0, arg1,
        0, 1, 0, arg2,
        0, 0, 1, arg3,
        0, 0, 0, 1
      ]);
    }

    return this;
  }

  // -------------------------------------------------------------------------
  makePerspective(fovy, aspect, near, far) {
    // todo - convert fovy to radians
    // var fovyRads = ...
    let fov = fovy*(Math.PI/180);

    // todo -compute t (top) and r (right)
    let t = near*(Math.tan(fov/2));
    let r = t*aspect;
    let makePerspective = new Matrix4();

    makePerspective.elements = Float32Array.from([
      (1/r), 0, 0, 0,
      0, (1/t), 0, 0,
      0, 0, (-(far+near)/(far-near)), (-(2*far*near)/(far-near)),
      0, 0, -1, 0
    ]);

    // shortcut - use in place of this.elements
    //const e = this.elements;

    // todo - set every element to the appropriate value
    this.multiply(makePerspective);

    return this;
  }

  // -------------------------------------------------------------------------
  makeOrthographic(left, right, top, bottom, near, far) {
    // shortcut - use in place of this.elements
    //const e = this.elements;

    let makePerspective = new Matrix4();
    makePerspective.elements = Float32Array.from([
      (2/(right-left)), 0, 0, -((right+left)/(right-left)),
      0, (2/(top-bottom)), 0, -((top+bottom)/(top-bottom)),
      0, 0, -(2/(far-near)), -((far+near)/(far-near)),
      0, 0, 0, 1
    ]);
    // todo - set every element to the appropriate value
    this.multiply(makePerspective);

    return this;
  }

  // -------------------------------------------------------------------------
  // @translation - a Matrix4 translation matrix
  // @rotation - a Matrix4 rotation Matrix
  // @scale - a Matrix4 scale matrix
  createTRSMatrix(translation, rotation, scale) {
    // todo - create a matrix that combines translation, rotation, and scale such
    //        that TRANSFORMATIONS take place in the following order: 1) scale,
    //        2) rotation, and 3) translation. The values of translation, rotation,
    //        and scale should NOT be modified.

    const trsMatrix = new Matrix4();

    trsMatrix.multiply(translation);
    trsMatrix.multiply(rotation);
    trsMatrix.multiply(scale);
    
    return trsMatrix;
  }

  // -------------------------------------------------------------------------
  // @currentRotationAngle - the angle of rotation around the earth
  // @offsetFromEarth - the relative displacement from the earth
  // @earthTransform - the transformation used to apply to the earth
  createMoonMatrix(currentRotationAngle, offsetFromEarth, earthTransform) {

    // todo - create a matrix that combines translation and rotation such that when
    //        it is applied to a sphere starting at the origin, moves the sphere to 
    //        orbit the earth.  The displacement from the earth is given by  
    //        "offsetFromEarth" and the current rotation around the earth (z-axis)
    //        is given by "currentRotationAngle" degrees.

    // Note: Do NOT change earthTransform but do use it, it already has the rotation and translation for the earth

    const translate = new Matrix4();
    translate.makeTranslation(offsetFromEarth);

    const rotate = new Matrix4;
    rotate.makeRotationZ(currentRotationAngle);

    // todo - combine all necessary matrices necessary to achieve the desired effect
        const moonMatrix = new Matrix4();
    moonMatrix.copy(earthTransform)
    moonMatrix.multiply(rotate);
    moonMatrix.multiply(translate)

    return moonMatrix;
  }

  // -------------------------------------------------------------------------
  determinant() {
    const e = this.elements;

    // laid out for clarity, not performance
    const m11 = e[0]; const m12 = e[1]; const m13 = e[2]; const m14 = e[3];
    const m21 = e[4]; const m22 = e[5]; const m23 = e[6]; const m24 = e[7];
    const m31 = e[8]; const m32 = e[9]; const m33 = e[10]; const m34 = e[11];
    const m41 = e[12]; const m42 = e[13]; const m43 = e[14]; const m44 = e[15];

    const det11 = m11 * (m22 * (m33 * m44 - m34 * m43) +
      m23 * (m34 * m42 - m32 * m44) +
      m24 * (m32 * m43 - m33 * m42));

    const det12 = -m12 * (m21 * (m33 * m44 - m34 * m43) +
      m23 * (m34 * m41 - m31 * m44) +
      m24 * (m31 * m43 - m33 * m41));

    const det13 = m13 * (m21 * (m32 * m44 - m34 * m42) +
      m22 * (m34 * m41 - m31 * m44) +
      m24 * (m31 * m42 - m32 * m41));

    const det14 = -m14 * (m21 * (m32 * m43 - m33 * m42) +
      m22 * (m33 * m41 - m31 * m43) +
      m23 * (m31 * m42 - m32 * m41));

    return det11 + det12 + det13 + det14;
  }

  // -------------------------------------------------------------------------
  transpose() {
    const te = this.elements;
    let tmp;

    tmp = te[1]; te[1] = te[4]; te[4] = tmp;
    tmp = te[2]; te[2] = te[8]; te[8] = tmp;
    tmp = te[6]; te[6] = te[9]; te[9] = tmp;

    tmp = te[3]; te[3] = te[12]; te[12] = tmp;
    tmp = te[7]; te[7] = te[13]; te[13] = tmp;
    tmp = te[11]; te[11] = te[14]; te[14] = tmp;

    return this;
  }


  // -------------------------------------------------------------------------
  inverse() {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    const te = this.elements,
      me = this.clone().elements,

      n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3],
      n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7],
      n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11],
      n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15],

      t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
      t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
      t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
      t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (det === 0) {
      const msg = "can't invert matrix, determinant is 0";
      console.warn(msg);
      return this.makeIdentity();
    }

    const detInv = 1 / det;

    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

    return this;
  }

  // -------------------------------------------------------------------------
  log() {
    const te = this.elements;
    console.log('[ ' +
      '\n ' + te[0] + ', ' + te[1] + ', ' + te[2] + ', ' + te[3] +
      '\n ' + te[4] + ', ' + te[5] + ', ' + te[6] + ', ' + te[7] +
      '\n ' + te[8] + ', ' + te[9] + ', ' + te[10] + ', ' + te[11] +
      '\n ' + te[12] + ', ' + te[13] + ', ' + te[14] + ', ' + te[15] +
      '\n]'
    );

    return this;
  }
}
